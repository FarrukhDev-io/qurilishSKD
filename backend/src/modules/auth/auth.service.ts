import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity, UserRole } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  // In-memory fallback for local dev/testing if DB connection is deferred
  private readonly inMemoryUsers: Map<string, UserEntity> = new Map();

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Yangi foydalanuvchini ro'yxatdan o'tkazish
   */
  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const emailLower = dto.email.toLowerCase().trim();

    // 1. Email mavjudligini tekshirish
    const existingUser = await this.findUserByEmail(emailLower);
    if (existingUser) {
      throw new ConflictException(`'${emailLower}' elektron pochta manzili bilan allaqachon ro'yxatdan o'tilgan`);
    }

    // 2. Parolni bcrypt bilan xeshlashtirish (salt rounds: 10)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    // 3. User yaratish
    const userRole = dto.role || UserRole.FUQARO;
    let savedUser: UserEntity;

    try {
      const newUser = this.userRepository.create({
        email: emailLower,
        passwordHash,
        fullName: dto.fullName,
        role: userRole,
        phoneNumber: dto.phoneNumber || undefined,
        isVerified: userRole === UserRole.FUQARO, // Fuqaro auto-verified
      });
      savedUser = await this.userRepository.save(newUser);
    } catch (err) {
      this.logger.warn(`TypeORM Repository save failed, using fallback memory store: ${err.message}`);
      const mockId = `uuid-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      savedUser = {
        id: mockId,
        email: emailLower,
        passwordHash,
        fullName: dto.fullName,
        role: userRole,
        phoneNumber: dto.phoneNumber,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as UserEntity;
      this.inMemoryUsers.set(savedUser.id, savedUser);
      this.inMemoryUsers.set(emailLower, savedUser);
    }

    // 4. JWT token va foydalanuvchi ma'lumotlarini qaytarish
    const accessToken = this.generateToken(savedUser);
    const { passwordHash: _, ...sanitizedUser } = savedUser;

    return {
      accessToken,
      user: sanitizedUser,
    };
  }

  /**
   * Foydalanuvchi tizimga kirishi (Login)
   */
  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const emailLower = dto.email.toLowerCase().trim();

    // 1. Foydalanuvchini email bo'yicha izlash (passwordHash bilan)
    let user: UserEntity | null = null;
    try {
      user = await this.userRepository.findOne({
        where: { email: emailLower },
        select: ['id', 'email', 'passwordHash', 'fullName', 'role', 'phoneNumber', 'isVerified', 'createdAt', 'updatedAt'],
      });
    } catch (err) {
      user = this.inMemoryUsers.get(emailLower) || null;
    }

    if (!user) {
      throw new UnauthorizedException('Elektron pochta yoki parol noto\'g\'ri');
    }

    // 2. Parolni solishtirish
    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Elektron pochta yoki parol noto\'g\'ri');
    }

    // 3. JWT token yaratish
    const accessToken = this.generateToken(user);
    const { passwordHash: _, ...sanitizedUser } = user;

    return {
      accessToken,
      user: sanitizedUser,
    };
  }

  /**
   * Foydalanuvchi profilini olish
   */
  async getProfile(userId: string): Promise<Omit<UserEntity, 'passwordHash'>> {
    const user = await this.validateUserById(userId);
    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }
    const { passwordHash: _, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  /**
   * JWT payload bo'yicha foydalanuvchini tekshirish
   */
  async validateUserById(userId: string): Promise<UserEntity | null> {
    try {
      return await this.userRepository.findOne({ where: { id: userId } });
    } catch (err) {
      for (const u of this.inMemoryUsers.values()) {
        if (u.id === userId) return u;
      }
      return null;
    }
  }

  /**
   * Email bo me'zonda foydalanuvchi izlash
   */
  private async findUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (err) {
      return this.inMemoryUsers.get(email) || null;
    }
  }

  /**
   * JWT Access Token generatsiyasi
   */
  private generateToken(user: UserEntity): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}

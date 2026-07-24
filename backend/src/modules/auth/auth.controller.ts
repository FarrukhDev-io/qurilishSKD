import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserEntity, UserRole } from './entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('Autentifikatsiya va Foydalanuvchilar (Auth)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Yangi foydalanuvchini ro\'yxatdan o\'tkazish',
    description: 'SKDqurilish platformasida yangi foydalanuvchi hisobini yaratadi va JWT access_token beradi.',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Noto\'g\'ri kiritilgan ma\'lumotlar (DTO validation error)',
  })
  @ApiResponse({
    status: 409,
    description: 'Elektron pochta allaqachon mavjud',
  })
  async register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Tizimga kirish (Login)',
    description: 'Email va parol orqali autentifikatsiyadan o\'tish va JWT token olish.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Muvaffaqiyatli autentifikatsiya',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Noto\'g\'ri email yoki parol',
  })
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Joriy foydalanuvchi profilini olish',
    description: 'JWT Auth token yordamida tizimga kirgan foydalanuvchining ma\'lumotlarini qaytaradi.',
  })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi profili',
    type: UserEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Avtorizatsiyadan o\'tilmagan',
  })
  async getProfile(@CurrentUser() user: UserEntity): Promise<Omit<UserEntity, 'passwordHash'>> {
    return this.authService.getProfile(user.id);
  }

  @Get('admin-panel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.HOKIMIYAT, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Hokimiyat va Admin uchun himoyalangan resurs (RBAC Demo)',
    description: 'Faqat HOKIMIYAT va ADMIN rollariga ega foydalanuvchilar kira oladigan RBAC misol endpoint.',
  })
  @ApiResponse({
    status: 200,
    description: 'Hokimiyat dashboard kirish ruxsati tasdiqlandi',
  })
  @ApiResponse({
    status: 403,
    description: 'Yetarli huquqlar mavjud emas (Forbidden)',
  })
  async getAdminDashboard(@CurrentUser() user: UserEntity) {
    return {
      message: `Xush kelibsiz, ${user.fullName}! Siz ${user.role} huquqi bilan kirgansiz.`,
      accessGranted: true,
      timestamp: new Date().toISOString(),
    };
  }
}

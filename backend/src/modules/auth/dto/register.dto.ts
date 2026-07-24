import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class RegisterDto {
  @ApiProperty({
    description: 'Foydalanuvchi elektron pochta manzili',
    example: 'inspektor@samarqand.uz',
  })
  @IsEmail({}, { message: 'Elektron pochta manzili to\'g\'ri formatda bo\'lishi kerak' })
  @IsNotEmpty({ message: 'Email maydoni bo\'sh bo\'lmasligi kerak' })
  email: string;

  @ApiProperty({
    description: 'Parol (kamida 8 ta belgi)',
    example: 'SecurePass123!',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty({ message: 'Parol maydoni bo\'sh bo\'lmasligi kerak' })
  @MinLength(8, { message: 'Parol uzunligi kamida 8 ta belgidan iborat bo\'lishi kerak' })
  password: string;

  @ApiProperty({
    description: 'Foydalanuvchi to\'liq ismi',
    example: 'Jahongir Olimov',
  })
  @IsString()
  @IsNotEmpty({ message: 'To\'liq ism maydoni bo\'sh bo\'lmasligi kerak' })
  fullName: string;

  @ApiPropertyOptional({
    description: 'Tizimdagi rol (default: FUQARO)',
    enum: UserRole,
    default: UserRole.FUQARO,
  })
  @IsEnum(UserRole, { message: 'Noto\'g\'ri rol tanlandi' })
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Telefon raqami',
    example: '+998901234567',
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
}

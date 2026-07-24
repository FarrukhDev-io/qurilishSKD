import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Foydalanuvchi elektron pochta manzili',
    example: 'inspektor@samarqand.uz',
  })
  @IsEmail({}, { message: 'Elektron pochta manzili to\'g\'ri formatda bo\'lishi kerak' })
  @IsNotEmpty({ message: 'Email maydoni bo\'sh bo\'lmasligi kerak' })
  email: string;

  @ApiProperty({
    description: 'Foydalanuvchi paroli',
    example: 'SecurePass123!',
  })
  @IsString()
  @IsNotEmpty({ message: 'Parol maydoni bo\'sh bo\'lmasligi kerak' })
  password: string;
}

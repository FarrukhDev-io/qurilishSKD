import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT Auth Access Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Foydalanuvchi ma\'lumotlari obyekti',
    type: () => UserEntity,
  })
  user: Omit<UserEntity, 'passwordHash'>;
}

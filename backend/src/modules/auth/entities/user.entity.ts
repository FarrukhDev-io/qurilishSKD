import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  HOKIMIYAT = 'HOKIMIYAT',
  INSPEKTOR = 'INSPEKTOR',
  FUQARO = 'FUQARO',
  PUDRATCHI = 'PUDRATCHI',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class UserEntity {
  @ApiProperty({
    description: 'Foydalanuvchi unikal identifikatori (UUID)',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Foydalanuvchi elektron pochta manzili',
    example: 'inspektor@samarqand.uz',
  })
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  passwordHash: string;

  @ApiProperty({
    description: 'Foydalanuvchining to\'liq ismi (F.I.Sh)',
    example: 'Alisher Navoiy',
  })
  @Column()
  fullName: string;

  @ApiProperty({
    description: 'Foydalanuvchi roli (RBAC)',
    enum: UserRole,
    default: UserRole.FUQARO,
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.FUQARO,
  })
  role: UserRole;

  @ApiProperty({
    description: 'Telefon raqami',
    example: '+998901234567',
    nullable: true,
  })
  @Column({ nullable: true })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Foydalanuvchi tasdiqlanganlik holati',
    default: false,
  })
  @Column({ default: false })
  isVerified: boolean;

  @ApiProperty({
    description: 'Yaratilgan sana',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'So\'nggi yangilangan sana',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户邮箱', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '登录用户名', example: 'zhangsan' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '登录密码', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ description: '用户昵称', example: '张三' })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiPropertyOptional({ description: '手机号', example: '13800138000' })
  @IsString()
  @IsOptional()
  phone?: string;
}

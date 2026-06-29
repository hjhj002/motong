import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: '用户名', example: 'zhangsan' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '邮箱', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '密码（至少6位）', example: '123456' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PageRequestDto } from '../../page/page-request.dto';

export class QueryUserDto extends PageRequestDto {
  @ApiPropertyOptional({ description: '用户名搜索' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ description: '邮箱搜索' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: '手机号搜索' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: '昵称搜索' })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiPropertyOptional({ description: '角色筛选', enum: ['ADMIN', 'EDITOR', 'USER'] })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional({ description: '状态筛选', enum: ['NORMAL', 'DISABLED', 'LOCKED'] })
  @IsOptional()
  @IsString()
  status?: string;
}

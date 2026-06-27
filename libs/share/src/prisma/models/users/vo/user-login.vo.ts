import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserLoginVo {
    @ApiProperty({ description: '用户唯一标识ID', example: 1 })
    id: number;

    @ApiProperty({ description: '邮箱地址', example: 'user@example.com' })
    email: string;

    @ApiPropertyOptional({ description: '手机号', example: '13800138000' })
    phone: string | null;

    @ApiProperty({ description: '登录用户名', example: 'zhangsan' })
    username: string;

    @ApiPropertyOptional({ description: '密码', example: 'password' })
    password: string | null;

    @ApiPropertyOptional({ description: '展示昵称', example: '张三' })
    nickname: string | null;

    @ApiPropertyOptional({ description: '头像URL', example: 'https://example.com/avatar.png' })
    avatar: string | null;

    @ApiPropertyOptional({ description: '性别', enum: ['MALE', 'FEMALE', 'UNKNOWN'], example: 'MALE' })
    gender: string | null;

    @ApiPropertyOptional({ description: '出生日期', example: '2000-01-01T00:00:00.000Z' })
    birthday: Date | null;

    @ApiProperty({ description: '账号状态', enum: ['NORMAL', 'DISABLED', 'LOCKED'], example: 'NORMAL' })
    status: string;

    @ApiProperty({ description: '用户角色', enum: ['ADMIN', 'EDITOR', 'USER'], example: 'USER' })
    role: string;

    @ApiPropertyOptional({ description: '地址信息', example: '北京市海淀区' })
    address: string | null;

    @ApiPropertyOptional({ description: '最后登录时间' })
    lastLoginAt: Date | null;

    @ApiProperty({ description: '注册时间' })
    createdAt: Date;

    @ApiProperty({ description: '信息最后更新时间' })
    updatedAt: Date;
}

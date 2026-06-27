import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, QueryUserDto, UserVo } from '@app/share';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('用户管理')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  @ApiResponse({ status: 201, description: '用户创建成功', type: UserVo })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('page')
  @Roles('admin')
  @ApiOperation({ summary: '分页查询用户' })
  @ApiResponse({ status: 200, description: '返回分页用户列表' })
  findPageByQuery(@Query() query: QueryUserDto) {
    return this.usersService.findPageByQuery(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个用户' })
  @ApiResponse({ status: 200, description: '返回用户详情', type: UserVo })
  @ApiResponse({ status: 404, description: '用户不存在' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiResponse({ status: 200, description: '用户更新成功', type: UserVo })
  @ApiResponse({ status: 404, description: '用户不存在' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 200, description: '用户删除成功', type: UserVo })
  @ApiResponse({ status: 404, description: '用户不存在' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}

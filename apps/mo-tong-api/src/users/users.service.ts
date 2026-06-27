import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService, QueryUserDto, CreateUserDto, UpdateUserDto } from '@app/share';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
      omit: { password: true },
    });
  }

  async findPageByQuery(queryUserDto: QueryUserDto)  {
    const { pageNum = 1, pageSize = 10, username, email, phone, nickname, role, status } = queryUserDto;

    const where: any = { 
      ...(username && { username: { contains: username, mode: 'insensitive' } }),
      ...(email && { email: { contains: email, mode: 'insensitive' } }),
      ...(phone && { phone: { contains: phone } }),
      ...(nickname && { nickname: { contains: nickname, mode: 'insensitive' } }),
      ...(role && { role }),
      ...(status && { status }) 
    };

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        omit: { password: true },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      list: data,
      total,
      pageNum,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
    if (!user) {
      throw new NotFoundException(`用户不存在`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      omit: { password: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user.delete({
      where: { id },
      omit: { password: true },
    });
  }
}

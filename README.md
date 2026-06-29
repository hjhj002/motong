# 墨同--学习规划应用

> 一个基于 NestJS 的学习搭子匹配与学习规划平台，帮助用户找到志同道合的学习伙伴，互相监督、共同进步。

## 项目简介

墨同是一款面向学生和自学者的学习社交应用后端服务。核心功能包括：

- **学习搭子匹配**：发布学习需求、申请搭子、建立学习伙伴关系
- **社区文章系统**：经验分享、打卡记录、学习心得发布
- **用户管理系统**：注册登录、角色权限、个人资料管理
- **AI 辅助服务**：独立微服务，提供智能学习建议

## 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | NestJS v11 |
| 语言 | TypeScript 5.x |
| ORM | Prisma 7 |
| 数据库 | PostgreSQL |
| 认证 | JWT (Passport) |
| 文档 | Swagger (OpenAPI) |
| 包管理 | pnpm |
| 构建 | SWC |

## 项目结构

```
mo-tong/
├── apps/
│   ├── mo-tong-api/          # 主 API 应用（端口 3000）
│   │   └── src/
│   │       ├── auth/         # 认证模块（登录、注册、JWT守卫）
│   │       ├── users/        # 用户管理模块（CRUD、分页查询）
│   │       ├── app.module.ts # 根模块
│   │       └── main.ts       # 应用入口
│   └── ai/                   # AI 微服务（端口 3001）
│       └── src/
│           ├── ai.module.ts
│           ├── ai.service.ts
│           └── main.ts
├── libs/
│   └── share/                # 共享库
│       └── src/
│           ├── filters/      # 全局异常过滤器
│           ├── interceptors/ # 日志拦截器、响应转换拦截器
│           ├── prisma/       # Prisma 服务 & 生成的客户端 & 数据模型
│           └── utils/        # 工具函数
├── prisma/
│   └── schema.prisma         # 数据库模型定义
├── .env                      # 环境变量配置
├── nest-cli.json             # NestJS Monorepo 配置
└── package.json              # 项目依赖和脚本
```

## 环境要求

- **Node.js** >= 18.x
- **pnpm** >= 8.x
- **PostgreSQL** >= 14.x

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

复制 `.env` 文件并填写你的数据库和 JWT 配置：

```bash
cp .env .env.local
```

需要配置的变量参见下方 [环境变量说明](#环境变量说明)。

### 3. 生成 Prisma Client

```bash
pnpm run db:generate
```

### 4. 数据库迁移

```bash
pnpm run db:migrate:dev
```

### 5. 启动项目

```bash
# 同时启动主 API 和 AI 微服务
pnpm run start:dev:all

# 或单独启动主 API
pnpm run start:dev

# 或单独启动 AI 微服务
pnpm run start:dev:ai
```

## 可用脚本

| 命令 | 说明 |
|------|------|
| `pnpm run start:dev` | 启动主 API（热重载） |
| `pnpm run start:dev:ai` | 启动 AI 微服务（热重载） |
| `pnpm run start:dev:all` | 同时启动所有服务 |
| `pnpm run start:prod` | 生产环境启动 |
| `pnpm run build` | 构建项目 |
| `pnpm run lint` | 代码检查并自动修复 |
| `pnpm run format` | Prettier 格式化代码 |
| `pnpm run test` | 运行单元测试 |
| `pnpm run test:e2e` | 运行端到端测试 |
| `pnpm run db:migrate:dev` | 开发环境数据库迁移 |
| `pnpm run db:migrate:deploy` | 生产环境数据库迁移 |
| `pnpm run db:push` | 推送 Schema 到数据库（不生成迁移文件） |
| `pnpm run db:seed` | 执行数据库种子脚本 |
| `pnpm run db:studio` | 打开 Prisma Studio 可视化管理 |
| `pnpm run db:generate` | 生成 Prisma Client |

## API 文档

项目集成了 Swagger，启动后访问：

```
http://localhost:3000/api-docs
```

支持 Bearer Token 认证，登录后可在 Swagger UI 中直接调试接口。

## 环境变量说明

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `APP_PORT` | 主 API 服务端口 | `3000` |
| `AI_PORT` | AI 微服务端口 | `3001` |
| `DB_HOST` | 数据库主机地址 | `localhost` |
| `DB_PORT` | 数据库端口 | `5432` |
| `DB_USER` | 数据库用户名 | `postgres` |
| `DB_PASSWORD` | 数据库密码 | （自行填写） |
| `DB_NAME` | 数据库名称 | `mo_tong` |
| `DATABASE_URL` | 数据库连接字符串（自动拼接） | 由上方变量自动组合 |
| `JWT_SECRET` | JWT 签名密钥 | （自行设置强密码） |
| `JWT_EXPIRES_IN` | JWT 过期时间 | `7d` |

> 注意：`DATABASE_URL` 通过 `dotenv-expand` 自动从 `DB_*` 变量拼接生成，无需手动填写。

## 接口概览

### 认证模块 `/auth`

| 方法 | 路径 | 说明 | 是否公开 |
|------|------|------|----------|
| POST | `/auth/login` | 用户登录，返回 JWT Token | 是 |
| POST | `/auth/register` | 用户注册，返回 JWT Token | 是 |

### 用户管理模块 `/users`（需 Bearer Token）

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| POST | `/users/create` | 创建用户 | 登录用户 |
| GET | `/users/page` | 分页查询用户列表 | 管理员 |
| GET | `/users/:id` | 获取单个用户详情 | 登录用户 |
| PATCH | `/users/:id` | 更新用户信息 | 登录用户 |
| DELETE | `/users/:id` | 删除用户 | 登录用户 |

## 数据库模型

### 用户模块

| 模型 | 说明 |
|------|------|
| `User` | 用户主表，存储账号、密码、角色、状态等核心信息 |
| `Profile` | 用户扩展资料（一对一），含学习目标、标签、阶段等 |

### 社区模块

| 模型 | 说明 |
|------|------|
| `Post` | 社区文章，支持草稿/发布状态，Markdown 内容 |
| `Category` | 文章分类，与文章多对多关系 |

### 学习搭子模块

| 模型 | 说明 |
|------|------|
| `BuddyRequest` | 搭子招募需求，支持标签筛选 |
| `BuddyTag` | 搭子标签，用于多维度筛选匹配 |
| `BuddyApplication` | 搭子申请记录，支持审核流程 |
| `BuddyRelation` | 正式搭子关系，双向关联 |

### 枚举类型

| 枚举 | 说明 | 可选值 |
|------|------|--------|
| `Gender` | 性别 | MALE / FEMALE / UNKNOWN |
| `UserStatus` | 账号状态 | NORMAL / DISABLED / LOCKED |
| `UserRole` | 用户角色 | ADMIN / EDITOR / USER |
| `RequestStatus` | 招募状态 | ACTIVE / MATCHED / CLOSED |
| `ApplyStatus` | 申请状态 | PENDING / APPROVED / REJECTED |
| `RelationStatus` | 搭子关系状态 | ACTIVE / EXPIRED / TERMINATED |

## 项目特性

- **Monorepo 架构**：主 API 和 AI 服务独立部署，共享公共库
- **全局响应转换**：统一的 JSON 响应格式（code / message / data / timestamp）
- **全局异常过滤**：优雅处理所有异常，返回友好错误信息
- **请求日志拦截**：自动记录请求耗时和路径
- **参数校验管道**：基于 class-validator 的 DTO 自动校验
- **JWT 认证守卫**：全局守卫 + `@Public()` 装饰器灵活控制
- **角色权限控制**：`@Roles()` 装饰器实现接口级权限
- **软删除支持**：用户、文章等核心数据支持逻辑删除


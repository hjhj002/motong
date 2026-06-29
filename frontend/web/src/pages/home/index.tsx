import { useState } from 'react'
import {
  SignIn,
  SquaresFour,
  Users,
  ListChecks,
  ChatsCircle,
  User,
  Moon,
  CheckCircle,
  ShieldCheck,
  Plus,
  Gear,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [rememberMe, setRememberMe] = useState(true)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('login', loginForm)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('register', registerForm)
  }

  const navItems = [
    { icon: SignIn, label: '认证', active: true },
    { icon: SquaresFour, label: '社区', active: false },
    { icon: Users, label: '搭子', active: false },
    { icon: ListChecks, label: '计划', active: false },
    { icon: ChatsCircle, label: '消息', active: false },
    { icon: User, label: '我的', active: false },
    { icon: Moon, label: '深色模式', active: false },
  ]

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r border-border p-5 shrink-0 bg-card">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-lg font-semibold">墨</span>
          </div>
          <div>
            <h1 className="text-base font-semibold text-foreground">墨同</h1>
            <p className="text-xs text-muted-foreground">学习搭子 · 计划 · 打卡</p>
          </div>
        </div>

        {/* 今日状态 */}
        <div className="mb-6">
          <p className="text-xs font-medium text-muted-foreground mb-3">今日状态</p>
          <div className="flex gap-3">
            <div className="flex-1 bg-secondary rounded-2xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">连续打卡</p>
              <p className="text-2xl font-semibold text-foreground">7</p>
              <p className="text-xs text-muted-foreground">天</p>
            </div>
            <div className="flex-1 bg-secondary rounded-2xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">今日专注</p>
              <p className="text-2xl font-semibold text-foreground">2.5</p>
              <p className="text-xs text-muted-foreground">小时</p>
            </div>
          </div>
        </div>

        {/* 下一步 */}
        <div className="mb-8">
          <p className="text-xs font-medium text-muted-foreground mb-3">下一步</p>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <p className="text-sm text-foreground">数学二：积分题型训练（30min）</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <p className="text-sm text-foreground">英语：长难句 10 句（20min）</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ease cursor-pointer ${
                item.active
                  ? 'bg-primary/10 text-primary'
                  : 'text-secondary-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" weight="regular" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Top Header */}
        <header className="flex items-center justify-end gap-3 px-6 py-4 shrink-0">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" weight="regular" />
            发布
          </Button>
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors duration-200 ease cursor-pointer">
            <Gear className="w-5 h-5 text-muted-foreground" weight="regular" />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 px-6 pb-8 lg:px-10">
          {/* Center - Feature Description */}
          <div className="flex-1 flex flex-col justify-center max-w-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-foreground">
                认证 · 登录 / 注册
              </h2>
              <div className="hidden md:flex items-center gap-2">
                <Badge variant="outline" className="gap-1.5 text-xs font-medium py-1 px-2.5">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" weight="regular" />
                  JWT 认证
                </Badge>
                <Badge variant="outline" className="gap-1.5 text-xs font-medium py-1 px-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" weight="regular" />
                  安全登录
                </Badge>
              </div>
            </div>

            {/* Feature Card */}
            <Card>
              <CardContent className="p-8">
                <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
                  Mo Tong Auth
                </span>

                <h3 className="text-2xl md:text-3xl font-semibold text-foreground leading-snug mb-4">
                  把学习关系建立在稳定身份与可持续协作之上
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  登录后可使用学习搭子匹配、学习计划、打卡记录与 AI
                  建议。界面延续主站的低干扰原则，让注册和登录过程尽可能清晰、短路径、可预期。
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    '支持邮箱 / 用户名登录',
                    '注册后直接返回 JWT Token',
                    '为后续角色权限与资料完善打底',
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 py-3 border-b border-border last:border-b-0"
                    >
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" weight="regular" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-secondary rounded-2xl p-4">
                    <p className="text-xl font-semibold text-foreground">2 步</p>
                    <p className="text-xs text-muted-foreground mt-1">完成注册</p>
                  </div>
                  <div className="bg-secondary rounded-2xl p-4">
                    <p className="text-xl font-semibold text-foreground">1 分钟</p>
                    <p className="text-xs text-muted-foreground mt-1">进入学习首页</p>
                  </div>
                  <div className="bg-secondary rounded-2xl p-4">
                    <p className="text-xl font-semibold text-foreground">JWT</p>
                    <p className="text-xs text-muted-foreground mt-1">统一认证机制</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Login/Register Form */}
          <div className="w-full lg:w-[400px] xl:w-[420px] shrink-0 flex items-center">
            <Card>
              <CardContent className="p-6">
                {/* Tab Switcher */}
                <div className="flex bg-secondary rounded-xl p-1 mb-6">
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease cursor-pointer ${
                      activeTab === 'login'
                        ? 'bg-card text-foreground border border-border'
                        : 'text-muted-foreground hover:text-foreground border border-transparent'
                    }`}
                  >
                    登录
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease cursor-pointer ${
                      activeTab === 'register'
                        ? 'bg-card text-foreground border border-border'
                        : 'text-muted-foreground hover:text-foreground border border-transparent'
                    }`}
                  >
                    注册
                  </button>
                </div>

                {/* Login Form */}
                {activeTab === 'login' && (
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <h4 className="text-xl font-semibold text-foreground">欢迎回来</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        继续你的学习计划与搭子协作
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="home-login-username" className="text-sm font-medium">
                        邮箱 / 用户名
                      </Label>
                      <Input
                        id="home-login-username"
                        type="text"
                        placeholder="输入邮箱或用户名"
                        value={loginForm.username}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, username: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="home-login-password" className="text-sm font-medium">
                        密码
                      </Label>
                      <Input
                        id="home-login-password"
                        type="password"
                        placeholder="输入密码"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, password: e.target.value })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="home-remember"
                          checked={rememberMe}
                          onCheckedChange={(checked: boolean) => setRememberMe(checked)}
                        />
                        <Label htmlFor="home-remember" className="text-sm font-normal text-muted-foreground cursor-pointer">
                          记住我
                        </Label>
                      </div>
                      <a href="#" className="text-sm text-primary hover:text-[#1D4ED8] font-medium transition-colors duration-200">
                        忘记密码?
                      </a>
                    </div>

                    <Button type="submit" className="w-full">
                      登录
                    </Button>
                  </form>
                )}

                {/* Register Form */}
                {activeTab === 'register' && (
                  <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                      <h4 className="text-xl font-semibold text-foreground">创建账号</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        开始你的学习搭子之旅
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="home-reg-username" className="text-sm font-medium">
                        用户名
                      </Label>
                      <Input
                        id="home-reg-username"
                        type="text"
                        placeholder="输入用户名"
                        value={registerForm.username}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, username: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="home-reg-email" className="text-sm font-medium">
                        邮箱
                      </Label>
                      <Input
                        id="home-reg-email"
                        type="email"
                        placeholder="输入邮箱地址"
                        value={registerForm.email}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="home-reg-password" className="text-sm font-medium">
                        密码
                      </Label>
                      <Input
                        id="home-reg-password"
                        type="password"
                        placeholder="设置密码"
                        value={registerForm.password}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, password: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="home-reg-confirm" className="text-sm font-medium">
                        确认密码
                      </Label>
                      <Input
                        id="home-reg-confirm"
                        type="password"
                        placeholder="再次输入密码"
                        value={registerForm.confirmPassword}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, confirmPassword: e.target.value })
                        }
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      注册
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

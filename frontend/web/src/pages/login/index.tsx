import { useState, type FC, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleNotch } from '@phosphor-icons/react'
import loginBg from '@/assets/login-bg.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

interface LoginForm {
  username: string
  password: string
}

interface FieldErrors {
  [key: string]: string
}

const initialLogin: LoginForm = { username: '', password: '' }

function validate(form: LoginForm): FieldErrors {
  const errs: FieldErrors = {}
  if (!form.username.trim()) errs.username = '请输入用户名或邮箱'
  if (!form.password) errs.password = '请输入密码'
  return errs
}

const LoginPage: FC = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState<LoginForm>(initialLogin)
  const [rememberMe, setRememberMe] = useState(true)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    // TODO: replace with actual API call
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 800)
  }

  const fieldError = (field: string) =>
    errors[field] ? (
      <p className="text-xs text-destructive mt-1.5 leading-relaxed">{errors[field]}</p>
    ) : null

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-[400px]">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#4a7c59] shadow-md mb-5">
            <span className="text-white text-xl font-semibold">墨</span>
          </div>
          <h1 className="text-[26px] font-semibold text-[#2d5016] leading-tight drop-shadow-sm">墨同</h1>
          <p className="text-sm text-[#4a6741] mt-1.5">
            学习搭子 · 计划 · 打卡
          </p>
        </div>

        <Card className="border-none bg-white/30 backdrop-blur-md shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-[#2d5016]">
                  邮箱 / 用户名
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="输入邮箱或用户名"
                  className="bg-white/60 border-[#a8c99a] focus-visible:ring-[#4a7c59]/40"
                  value={form.username}
                  onChange={(e) => {
                    setForm({ ...form, username: e.target.value })
                    if (errors.username) setErrors({ ...errors, username: '' })
                  }}
                  aria-invalid={!!errors.username}
                />
                {fieldError('username')}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-[#2d5016]">
                  密码
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="输入密码"
                  className="bg-white/60 border-[#a8c99a] focus-visible:ring-[#4a7c59]/40"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value })
                    if (errors.password) setErrors({ ...errors, password: '' })
                  }}
                  aria-invalid={!!errors.password}
                />
                {fieldError('password')}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked: boolean) => setRememberMe(checked)}
                    className="border-[#6b9e5a] data-[state=checked]:bg-[#4a7c59] data-[state=checked]:border-[#4a7c59]"
                  />
                  <Label htmlFor="remember" className="text-sm font-normal text-[#4a6741] cursor-pointer">
                    记住我
                  </Label>
                </div>
                <a
                  href="#"
                  className="text-sm text-[#4a7c59] hover:text-[#2d5016] font-medium transition-colors duration-200"
                >
                  忘记密码?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full h-9 bg-[#4a7c59] hover:bg-[#3d6a4b] text-white shadow-sm"
                disabled={loading}
              >
                {loading && (
                  <CircleNotch className="w-4 h-4 animate-spin" weight="regular" />
                )}
                登录
              </Button>

              <p className="text-center text-sm text-[#4a6741]">
                还没有账号？{' '}
                <a href="/register" className="text-[#4a7c59] hover:text-[#2d5016] font-medium transition-colors duration-200">
                  立即注册
                </a>
              </p>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-[#4a6741]/80 mt-6">
          登录即表示你同意{' '}
          <a href="#" className="text-[#4a7c59] hover:text-[#2d5016] transition-colors duration-200">
            服务条款
          </a>{' '}
          和{' '}
          <a href="#" className="text-[#4a7c59] hover:text-[#2d5016] transition-colors duration-200">
            隐私政策
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage

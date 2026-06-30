import { useState, type FC, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleNotch, Eye, EyeSlash } from '@phosphor-icons/react'
import loginBg from '@/assets/login-bg.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/* ───────────── 类型 & 校验 ───────────── */
interface LoginForm { email: string; password: string }
interface RegisterForm { email: string; password: string; confirm: string }
interface FieldErrors { [key: string]: string }

function validateLogin(f: LoginForm): FieldErrors {
  const e: FieldErrors = {}
  if (!f.email.trim()) e.email = '请输入邮箱'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = '邮箱格式不正确'
  if (!f.password) e.password = '请输入密码'
  return e
}
function validateRegister(f: RegisterForm): FieldErrors {
  const e: FieldErrors = {}
  if (!f.email.trim()) e.email = '请输入邮箱'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = '邮箱格式不正确'
  if (!f.password) e.password = '请输入密码'
  else if (f.password.length < 6) e.password = '密码至少 6 位'
  if (f.confirm !== f.password) e.confirm = '两次密码不一致'
  return e
}

const FieldError: FC<{ msg?: string }> = ({ msg }) =>
  msg ? <p className="text-xs text-red-500 mt-1">{msg}</p> : null

/* ───────────── 登录表单 ───────────── */
const LoginFormPanel: FC<{ onSwitch: () => void; navigate: ReturnType<typeof useNavigate> }> = ({ onSwitch, navigate }) => {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validateLogin(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/') }, 800)
  }

  return (
    <div className="w-full max-w-[400px]">
      <h2 className="text-2xl font-semibold text-[#2563EB] mb-8">登录</h2>
      <form onSubmit={submit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <Label htmlFor="l-email" className="text-sm font-medium text-gray-700">邮箱</Label>
          <Input id="l-email" type="email" placeholder="请输入邮箱"
            className="h-11 bg-white border-gray-200 focus-visible:ring-[#2563EB]/30 focus-visible:border-[#2563EB] rounded-lg"
            value={form.email}
            onChange={e => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }) }} />
          <FieldError msg={errors.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="l-pwd" className="text-sm font-medium text-gray-700">密码</Label>
          <div className="relative">
            <Input id="l-pwd" type={showPwd ? 'text' : 'password'} placeholder="请输入密码"
              className="h-11 bg-white border-gray-200 pr-11 focus-visible:ring-[#2563EB]/30 focus-visible:border-[#2563EB] rounded-lg"
              value={form.password}
              onChange={e => { setForm({ ...form, password: e.target.value }); if (errors.password) setErrors({ ...errors, password: '' }) }} />
            <button type="button" onClick={() => setShowPwd(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              {showPwd ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <FieldError msg={errors.password} />
        </div>
        <Button type="submit" disabled={loading}
          className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-base font-medium shadow-none transition-colors">
          {loading && <CircleNotch className="w-4 h-4 animate-spin mr-2" />}
          登录
        </Button>
        <p className="text-center text-sm text-gray-500">
          还没有账号？{' '}
          <button type="button" onClick={onSwitch}
            className="text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors">
            立即注册
          </button>
        </p>
      </form>
    </div>
  )
}

/* ───────────── 注册表单 ───────────── */
const RegisterFormPanel: FC<{ onSwitch: () => void; navigate: ReturnType<typeof useNavigate> }> = ({ onSwitch, navigate }) => {
  const [form, setForm] = useState<RegisterForm>({ email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validateRegister(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/') }, 800)
  }

  return (
    <div className="w-full max-w-[400px]">
      <h2 className="text-2xl font-semibold text-[#2563EB] mb-8">注册</h2>
      <form onSubmit={submit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <Label htmlFor="r-email" className="text-sm font-medium text-gray-700">邮箱</Label>
          <Input id="r-email" type="email" placeholder="请输入邮箱"
            className="h-11 bg-white border-gray-200 focus-visible:ring-[#2563EB]/30 focus-visible:border-[#2563EB] rounded-lg"
            value={form.email}
            onChange={e => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }) }} />
          <FieldError msg={errors.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="r-pwd" className="text-sm font-medium text-gray-700">密码</Label>
          <div className="relative">
            <Input id="r-pwd" type={showPwd ? 'text' : 'password'} placeholder="请输入密码"
              className="h-11 bg-white border-gray-200 pr-11 focus-visible:ring-[#2563EB]/30 focus-visible:border-[#2563EB] rounded-lg"
              value={form.password}
              onChange={e => { setForm({ ...form, password: e.target.value }); if (errors.password) setErrors({ ...errors, password: '' }) }} />
            <button type="button" onClick={() => setShowPwd(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              {showPwd ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <FieldError msg={errors.password} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="r-confirm" className="text-sm font-medium text-gray-700">确认密码</Label>
          <Input id="r-confirm" type="password" placeholder="请再次输入密码"
            className="h-11 bg-white border-gray-200 focus-visible:ring-[#2563EB]/30 focus-visible:border-[#2563EB] rounded-lg"
            value={form.confirm}
            onChange={e => { setForm({ ...form, confirm: e.target.value }); if (errors.confirm) setErrors({ ...errors, confirm: '' }) }} />
          <FieldError msg={errors.confirm} />
        </div>
        <Button type="submit" disabled={loading}
          className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-base font-medium shadow-none transition-colors">
          {loading && <CircleNotch className="w-4 h-4 animate-spin mr-2" />}
          注册
        </Button>
        <p className="text-center text-sm text-gray-500">
          已有账号？{' '}
          <button type="button" onClick={onSwitch}
            className="text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors">
            去登录
          </button>
        </p>
      </form>
    </div>
  )
}

/* ───────────── 主页面 ───────────── */
const LoginPage: FC = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const toggle = () => setMode(m => m === 'login' ? 'register' : 'login')
  const isLogin = mode === 'login'

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* ===== 表单侧 ===== */}
      <div
        className="w-1/2 flex items-center justify-center bg-[#F5F7FA] px-8 py-12 will-change-transform"
        style={{
          transform: isLogin ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)',
        }}
      >
        <div key={mode} className="animate-[fadeIn_0.4s_ease-out_0.15s_both]">
          {isLogin
            ? <LoginFormPanel onSwitch={toggle} navigate={navigate} />
            : <RegisterFormPanel onSwitch={toggle} navigate={navigate} />
          }
        </div>
      </div>

      {/* ===== 蓝色视觉侧 ===== */}
      <div
        className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center bg-[#1E40AF] will-change-transform"
        style={{
          transform: isLogin ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)',
        }}
      >
        {/* 弧形遮罩 — 用 translateX + scaleX 翻转，走 GPU */}
        <div
          className="absolute inset-y-0 left-0 w-32 bg-[#F5F7FA] will-change-transform"
          style={{
            transform: isLogin
              ? 'translateX(0) scaleX(1)'
              : 'translateX(calc(50vw - 8rem)) scaleX(-1)',
            transition: 'transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)',
            borderTopRightRadius: '40%',
            borderBottomRightRadius: '40%',
          }}
        />

        <div className="relative z-10 max-w-md px-12 text-white">
          {isLogin ? (
            <>
              <h3 className="text-2xl font-semibold mb-3">还没有账号？</h3>
              <p className="text-sm/relaxed text-white/90 mb-6">加入我们，开始你的学习搭子之旅，找到最合拍的学习伙伴</p>
              <Button variant="outline" onClick={toggle}
                className="bg-transparent border-white text-white hover:bg-white/10 rounded-lg px-6 h-10">
                立即注册
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold mb-3">已有账号？</h3>
              <p className="text-sm/relaxed text-white/90 mb-6">直接登录，继续你的学习搭子之旅</p>
              <Button variant="outline" onClick={toggle}
                className="bg-transparent border-white text-white hover:bg-white/10 rounded-lg px-6 h-10">
                去登录
              </Button>
            </>
          )}

          {/* 插画 */}
          <div className="mt-8 flex items-center justify-center">
            <img
              src={loginBg}
              alt="插画"
              className="w-72 h-56 object-cover rounded-2xl opacity-90"
            />
          </div>
        </div>

        {/* 右下角装饰圆点 */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="white" strokeWidth="1.5"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="white" strokeWidth="1.5"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="white" strokeWidth="1.5"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="white" strokeWidth="1.5"/></svg>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="white" strokeWidth="1.5"/><path d="M9 5.5V12.5M5.5 9H12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

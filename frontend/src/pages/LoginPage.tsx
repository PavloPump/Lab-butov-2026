import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Input from '../components/Input'
import Button from '../components/Button'

function LoginPage() {
  return (
    <Layout showNav={true} userRole={null}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Вход в систему</h1>
          <form className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              required
            />
            <Input
              label="Пароль"
              type="password"
              placeholder="••••••••"
              required
            />
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage

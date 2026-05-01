import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Input from '../components/Input'
import Button from '../components/Button'

function RegisterPage() {
  return (
    <Layout showNav={true} userRole={null}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Регистрация</h1>
          <form className="space-y-4">
            <Input
              label="Имя"
              type="text"
              placeholder="Ваше имя"
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              required
            />
            <Input
              label="Телефон"
              type="tel"
              placeholder="+7 (999) 123-45-67"
              required
            />
            <Input
              label="Пароль"
              type="password"
              placeholder="••••••••"
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Роль</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option value="CLIENT">Клиент</option>
                <option value="DRIVER">Водитель</option>
              </select>
            </div>
            <Button type="submit" className="w-full">
              Зарегистрироваться
            </Button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default RegisterPage

import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAuthContext } from '../contexts/AuthContext'

function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      role: formData.get('role') as 'CLIENT' | 'DRIVER'
    };

    const result = await register(userData);
    if (result.success && result.user) {
      if (result.user.role === 'CLIENT') {
        navigate('/client/dashboard');
      } else if (result.user.role === 'DRIVER') {
        navigate('/driver/dashboard');
      }
    }
  };

  return (
    <Layout showNav={true} userRole={null}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Регистрация</h1>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Имя"
              type="text"
              name="name"
              placeholder="Ваше имя"
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
            />
            <Input
              label="Телефон"
              type="tel"
              name="phone"
              placeholder="+7 (999) 123-45-67"
              required
            />
            <Input
              label="Пароль"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Роль</label>
              <select 
                name="role"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                <option value="CLIENT">Клиент</option>
                <option value="DRIVER">Водитель</option>
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
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

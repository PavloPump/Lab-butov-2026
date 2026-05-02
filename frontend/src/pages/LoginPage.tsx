import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Input from '../components/Input'
import Button from '../components/Button'
import Alert from '../components/Alert'
import { useAuthContext } from '../contexts/AuthContext'

function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await login(email, password);
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
          <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Вход в систему</h1>
          {error && <Alert type="error" message={error} />}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
            />
            <Input
              label="Пароль"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Вход...' : 'Войти'}
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

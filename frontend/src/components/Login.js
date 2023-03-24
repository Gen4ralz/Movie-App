import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setJwtToken } = useOutletContext()
  const { setAlertClassName } = useOutletContext()
  const { setAlertMessage } = useOutletContext()

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('email/pass', email, password)
    if (email === 'admin@example.com') {
      setJwtToken('abc')
      setAlertClassName('d-none')
      setAlertMessage('')
      navigate('/')
    } else {
      setAlertClassName(
        'alert-danger bg-red-300 p-4 text-red-700 rounded-md mb-4'
      )
      setAlertMessage('Invalid credentials')
    }
  }
  return (
    <>
      <div className="text-center">
        <h2 className="mb-3 text-3xl font-bold">Login</h2>
      </div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            placeholder="user@example.com"
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline justify-center"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            value="Login">
            Login
          </button>
        </div>
        <div className="mb-4">
          Dont have an account ?{' '}
          <Link to="/register">
            <span className="bg-green-300 p-1 rounded-md">Register</span>
          </Link>
        </div>
      </form>
    </>
  )
}

export default Login

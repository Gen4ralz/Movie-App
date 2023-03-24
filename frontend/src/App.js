import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Alert from './components/Alert'

function App() {
  const [jwtToken, setJwtToken] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [alertClassName, setAlertClassName] = useState('d-none')

  const navigate = useNavigate()

  const logOut = () => {
    setJwtToken('')
    navigate('/login')
  }
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <header>
        <nav className="flex h-12 items-center px-4 justify-between shadow-md">
          <a href="/" className="text-lg font-bold ml-10">
            Cinema
          </a>
          <div className="mr-10">
            {jwtToken === '' ? (
              <Link to="/login">Login</Link>
            ) : (
              <a href="#!" onClick={logOut}>
                <span>Logout</span>
              </a>
            )}
          </div>
        </nav>
      </header>
      <main className="container m-auto mt-4">
        <div className="grid md:grid-cols-4 sm:grid-cols-12 gap-4">
          <div className="text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <Link
              to="/"
              aria-current="true"
              className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              Home
            </Link>
            <Link
              to="/movies"
              className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              Movie
            </Link>
            <Link
              to="/genres"
              className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              Genres
            </Link>
            {jwtToken !== '' && (
              <>
                <Link
                  to="/admin/movie/0"
                  className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                  Add Movie
                </Link>
                <Link
                  to="/manage-catalogue"
                  className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                  Manage Catelogue
                </Link>
                <Link
                  to="/graphql"
                  className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                  GraphQL
                </Link>
              </>
            )}
          </div>
          <div className="col-span-3">
            <Alert message={alertMessage} className={alertClassName} />
            <Outlet
              context={{
                jwtToken,
                setJwtToken,
                setAlertMessage,
                setAlertClassName,
              }}
            />
          </div>
        </div>
      </main>
      <footer className="flex h-10 justify-center items-center shadow-inner">
        Copyright © 2023
      </footer>
    </div>
  )
}

export default App

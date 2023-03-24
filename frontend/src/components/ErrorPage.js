import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center">
        <h1 className="mt-3 font-bold text-3xl">Oops!</h1>
        <p>Sorry, an unexpected error has occured</p>
        <p>{error.statusText || error.message}</p>
      </div>
    </div>
  )
}

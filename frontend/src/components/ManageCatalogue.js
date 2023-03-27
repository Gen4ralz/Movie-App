import { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

const ManageCatalogue = () => {
  const [movies, setMovies] = useState([])
  const { jwtToken } = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (jwtToken === '') {
      navigate('/login')
      return
    }
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Bearer ' + jwtToken)

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }
    fetch(`/admin/movies`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [jwtToken, navigate])
  return (
    <>
      <div className="text-center">
        <h2 className="mb-3 text-3xl font-bold">Manage Catalogue</h2>
        <hr />
      </div>
      <div className="grid grid-cols-3 gap-4 p-2">
        {movies.map((m) => (
          <div className="card" key={m.id}>
            <Link to={`/admin/movies/${m.id}`}>
              <div className="rounded shadow flex flex-col items-center justify-center p-5">
                <h2 className="text-lg font-bold">{m.title}</h2>

                <p>{m.release_date}</p>
                <p>{m.mpaa_rating}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default ManageCatalogue

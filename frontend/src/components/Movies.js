import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Movies = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }
    fetch(`http://localhost:8080/movies`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <div className="text-center">
        <h2 className="mb-3 text-3xl font-bold">Movies</h2>
        <hr />
      </div>
      <div className="grid grid-cols-3 gap-4 p-2">
        {movies.map((m) => (
          <div className="card" key={m.id}>
            <Link to={`/movies/${m.id}`}>
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

export default Movies

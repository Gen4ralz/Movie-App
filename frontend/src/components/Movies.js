import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Movies = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    let moviesList = [
      {
        id: 1,
        title: 'Highlander',
        release_date: '1986-03-07',
        runtime: 116,
        mpaa_rating: 'R',
        description: 'Some long description',
      },
      {
        id: 2,
        title: 'Raiders of the Lost Ark',
        release_date: '1981-06-12',
        runtime: 115,
        mpaa_rating: 'PG-13',
        description: 'Some long description',
      },
    ]
    setMovies(moviesList)
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

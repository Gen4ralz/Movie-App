import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Movie = () => {
  const [movie, setMovie] = useState({})
  let { id } = useParams()

  useEffect(() => {
    let myMovie = {
      id: 1,
      title: 'Highlander',
      release_date: '1986-03-07',
      runtime: 116,
      mpaa_rating: 'R',
      description: 'Some long description',
    }
    setMovie(myMovie)
  }, [id])

  return (
    <>
      <div className="text-center mb-10">
        <h2 className="mb-3 text-3xl font-bold">{movie.title}</h2>
        <em>
          {movie.release_date}, {movie.runtime} minutes, Rated{' '}
          {movie.mpaa_rating}
        </em>
      </div>
      <div className="card shadow-md h-48 border rounded-lg border-gray-300">
        <p className="p-4">{movie.description}</p>
      </div>
    </>
  )
}

export default Movie

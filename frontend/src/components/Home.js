import { Link } from 'react-router-dom'
import Ticket from './../images/movie_tickets.jpg'

const Home = () => {
  return (
    <>
      <div className="text-center">
        <h2 className="mb-3 text-3xl font-bold">
          Find a movie to watch tonight
        </h2>
        <hr />
        <div className="flex justify-center mt-3">
          <Link to="/movies">
            <img src={Ticket} alt="movie tickets" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home

import MovieControls from "./MovieControls";
import { Link  } from "react-router-dom";
// Giriş Yapıldıktan Sonra Gelen izlenenler ve İzlenecekler kartı
function MovieCollectionCard({movie,type}) {
console.log(movie.poster_path);
  return (
    <Link to={`../../Movie-Detail/${movie.id}`}>
    <div className="movie-card">
    <div className="overlay"></div>
      <div className="vote-average">{!movie.vote_average?"?":movie.vote_average}</div>
   
   
      <img
        src={!movie.poster_path ?'/filmDefault.jpg': `https://image.tmdb.org/t/p/original/${movie.poster_path}`}     
        alt={`${movie.poster_path}`}
      />
    
    <MovieControls data={movie} type={type} />
  </div>
  </Link>
  )
}
export default MovieCollectionCard
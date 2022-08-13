import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardButton from "../components/movie/cardButton";
import MoviTrailer from "../components/movieTrailer/moviTrailer";
import LoadingSpinner from "../components/spinner/spinner";

function MovieDetail() {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
// Movie  id params olarak alındı ve api çağrıldı
  useEffect(() => {
    loadMovie();
   
  }, []);
  
  const loadMovie = () => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=6a3a57fcf0fbf91cf2ad62011f1e14ba&language=en-US`
    )
      .then((resp) => resp.json())
      .then((resp) => {
        setMovie(resp);
        setLoading(false);
        console.log(resp);
      });
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!movie ? (
            <p>Fİmin Detay Sayfası Bulunamadı </p>
          ) : (
            <div className="movie ">
              <div className="movie__intro ">
                <img
                  className="movie__backdrop"
                  src={
                    movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                      : "/filmDefault.jpg"
                  }
                />
              </div>
              <div className="movie__detail">
                <div className="movie__detailLeft">
                  <div className="movie__posterBox">
                    <img
                      className="movie__poster"
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                          : "/filmDefault.jpg"
                      }
                    />
                  </div>
                </div>
                <div className="movie__detailRight">
                  <div className="movie__detailRightTop">
                    <div className="movie__name">
                      {movie ? movie.original_title : ""}
                    </div>
                    <div className="movie__tagline">
                      {movie ? movie.tagline : ""}
                    </div>
                    <div className="movie__rating">
                      {movie ? movie.vote_average : ""}{" "}
                      <i class="fas fa-star" />
                      <span className="movie__voteCount">
                        {movie ? "(" + movie.vote_count + ") votes" : ""}
                      </span>
                    </div>
                    <div className="movie__runtime">
                      {movie ? movie.runtime + " mins" : ""}
                    </div>
                    <div className="movie__releaseDate">
                      {movie ? "Release date: " + movie.release_date : ""}
                    </div>
                    <div className="movie__genres">
                      {movie && movie.genres
                        ? movie.genres.map((genre) => (
                            <>
                              <span className="movie__genre" id={genre.id}>
                                {genre.name}
                              </span>
                            </>
                          ))
                        : ""}
                    </div>
                  </div>
                  <div className="movie__detailRightBottom">
                    <div className="text-black">
                      {movie ? movie.overview : ""}
                    </div>
                  </div>
                </div>
              </div>
              <MoviTrailer id={id} setLoading={setLoading}/>
              <div className="movie__links">
                <CardButton data={movie}/>
              </div>
              <div className="movie__heading">Production companies</div>
              <div className="movie__production">
                {movie &&
                  movie.production_companies &&
                  movie.production_companies.map((company) => (
                    <>
                      {company.logo_path && (
                        <span className="productionCompanyImage">
                          <img
                            className="movie__productionComapany"
                            src={
                              "https://image.tmdb.org/t/p/original" +
                              company.logo_path
                            }
                          />
                          <span>{company.name}</span>
                        </span>
                      )}
                    </>
                  ))}
              </div>
            </div>
          )}{" "}
        </>
      )}
    </>
  );
}
export default MovieDetail;

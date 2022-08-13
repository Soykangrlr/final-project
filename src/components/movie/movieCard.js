
import CardButton from "./cardButton";
import { Link  } from "react-router-dom";

function MovieCard({ data }) {
  // data property olarak alındı
  // ve card üzerine yazdırıldı
  return (
    <div className="movie-card-container">
    <Link to={`/Movie-Detail/${data.id}`}>
      <div class=" card ">
        <img
        // gelene resmin kontrol edildi yoksa dafault resim yazıldı
          src={!data.poster_path?'/filmDefault.jpg':`https://image.tmdb.org/t/p/original/${data.poster_path}`}
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <div class="card-title">
            <span>{data.title}</span>
          </div>
          <div className="titledate">
            <span class=" text-muted">{!data.release_date?'Bilgi Yok': data.release_date.slice(0, 4)}</span>
            <span>IMDB: {!data.vote_average?'Bilgi Yok':data.vote_average}</span>
          </div>
          <div className="btngruop">
            <CardButton
              data={data}
            />
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
}
export default MovieCard;

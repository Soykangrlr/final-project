import { useSelector } from "react-redux";
import ProfileLayout from "../components/layout/ProfileLayout"
import MovieCollectionCard from "../components/profile/MovieCollectionCard"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDocumentTitle } from "../hooks/use-Document-Title";
function ProfileWatchList() {
    const { watchListRedux } = useSelector((state) => state.watchList);
    const { usercn } = useSelector((state) => state.authCn);
    const navigate=useNavigate()
    useDocumentTitle("İzlenecek")
    useEffect(()=>{
      console.log(usercn);
      if(usercn===false){
          navigate("/login",{replace:true})
      }
    },[usercn])
     // Redux watch Değerleri alınıp Listelendi
  return (
    <ProfileLayout>

    <div className="movie-page">
            <div className="container">
            <div className="header">
              <h1 className="heading">İzlenecek Filmler</h1>
              <div className="count-pill">
                {watchListRedux.length} {watchListRedux.length < 2 ? "Movie" : "Movies"}
              </div>
            </div>
            <div className="movie-grid">
           {  watchListRedux.length<1 &&<p>Liste Filim Yok </p> }
            {watchListRedux!==false && watchListRedux.map(movie=>
          
                <MovieCollectionCard key={movie.id} movie={movie} type="watchlist"/>
           
            )}
            </div>
            </div>
           
          </div>
        </ProfileLayout>
  )
}
export default ProfileWatchList
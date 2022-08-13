import { useSelector } from "react-redux";
import ProfileLayout from "../components/layout/ProfileLayout"
import MovieCollectionCard from "../components/profile/MovieCollectionCard"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDocumentTitle } from "../hooks/use-Document-Title";

function ProfileWatched() {
    const { watch } = useSelector((state) => state.watch);
    const { usercn } = useSelector((state) => state.authCn);
    const navigate=useNavigate()
    useDocumentTitle("İzledim")
    useEffect(()=>{
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
          <h1 className="heading">İzlenen Filmler</h1>
          <div className="count-pill">
            {watch.length} {watch.length < 2 ? "Movie" : "Movies"}
          </div>
        </div>
        <div className="movie-grid">
          
        {  watch.length<1 &&<p>Liste Filim Yok </p> }
        { watch!==false && watch.map(movie=>
      
            <MovieCollectionCard key={movie.id} movie={movie} type="watched"/>
       
        )}
        </div>
        </div>
       
      </div>
    </ProfileLayout>

  )
}


export default ProfileWatched
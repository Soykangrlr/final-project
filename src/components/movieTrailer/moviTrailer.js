import { useEffect, useState } from "react";
//Detay Sayfası  fragman
function MoviTrailer({id}) {
  // id paramaetresi trailer apisine göderildis
    const [trailer,setTrailer]=useState({})
    useEffect(() => {
        loadTrailer();
      }, []);
    const loadTrailer=()=>{
     
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=6a3a57fcf0fbf91cf2ad62011f1e14ba&language=en-US`)
        .then(response=>response.json())
        .then(response=>{
            setTrailer(response.results[0])
        })
      }
  return (
    <> 
    {trailer && <div className="movie__fragman mb-3">
    <h4>Fragman</h4>
    <hr/>
    {/* Youtube Video embed edildi */}
    <iframe
    className="movie__backdrop"
    src={`https://www.youtube.com/embed/${trailer.key}`}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    ></iframe> 
  <h5>{trailer.name}</h5>
  </div>}
    
  </>
  )
}
export default MoviTrailer
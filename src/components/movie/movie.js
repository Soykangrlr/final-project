
import { useState, useEffect } from "react";
import requests from "../../const/api";
import { useDocumentTitle } from "../../hooks/use-Document-Title";
import LoadingSpinner from "../spinner/spinner";
import MovieCard from "./movieCard";
import Search from "./search";
import "./style.css";

function Movie() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query,setQuery]=useState("")
  useDocumentTitle("FİLMLER")
  useEffect(() => {
    LaodData();
  }, []);

  // TMDB toprated url alındı ve state yazıldı
  const LaodData = () => {
    setLoading(true)
     fetch(requests.fetchTopRated)
      .then((resp) => resp.json())
      .then((response) => {
        setData(response.results)
        setLoading(false)
    });
  };
  // TMDB  search url alındı ve state yazıldı
  const LaodDataSearch = async() => {
    setLoading(true)
    await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6a3a57fcf0fbf91cf2ad62011f1e14ba&language=en-US&page=1&include_adult=false&query=${query}`)
      .then((resp) => resp.json())
      .then((response) => {
        setData(response.results)
        setLoading(false)
    });
  };
  // query olma durumuna göre state güncellendis
  useEffect(()=>{
    if (query==="") {
      LaodData()
    }else{LaodDataSearch()}
  },[query])
 
  return (
  <>
   <div className="container mt-3">
  <Search onChange={e=>setQuery(e.target.value)}/>
  {loading?<LoadingSpinner/>:
 <>
  {data.length<1 &&<div> Aradığınız Film Bulunamadı</div>}
  {query===""&& <h4 style={{color:"#cbab52"}} >En Çok İzlenenler</h4>}
  <div className="row">
    {/* Gelen data içinde dönülüp card yollandı */}
    {data.map((movie) => {
      return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
          {" "}
          <MovieCard key={movie.id} data={movie} />
        </div>
      );
    })}
  </div>
  </>
}</div></>
    
  );
}
export default Movie;

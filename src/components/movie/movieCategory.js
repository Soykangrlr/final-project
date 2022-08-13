import { useEffect, useState } from "react";
import { API_KEY } from "../../const/api";
import { useDocumentTitle } from "../../hooks/use-Document-Title";
import Error from "../../pages/error";
import LoadingSpinner from "../spinner/spinner";
import Filter from "./filter";
import MovieCard from "./movieCard";
import Pagination from "./pagination";
function MovieCategory({params}) {
 // routan gelen veri propery olaram alındı
  const [category, setCategory] = useState("")
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)
  const categoryTitle=[
    { categoryId:"28",categoryName: "Aksiyon"},
    {categoryId:"12", categoryName:"Macera"},
    { categoryId: "16",categoryName:"Animasyon"},
    {categoryId: "35",categoryName: "Komedi"},
    { categoryId: "27",categoryName: "Korku"},
    { categoryId: "10752",categoryName: "Savaş"},
    {categoryId: "14",categoryName: "Fantastik"},
    {categoryId: "10751",categoryName: "Aile"},
    {categoryId: "18",categoryName: "Dram"}
  ]
  useEffect(()=>{
    // Params Kontrolu yağıldı idlee eşleşirse name state gönderildi
 categoryTitle.map(item=>{
  console.log(item.categoryId===params)
  if(item.categoryId===params){
    setCategory(item.categoryName)
  }
 })
  },[params])
console.log(category.categoryName);
  // // const [sorting,setSorting]=useState("release_date.desc")
  useDocumentTitle(`${category} Filmleri`);
  const LaodData = () => {
    setLoading(true);
    // Sıralama Yapıldığı zaman Örn: Avatar 5 filmi geliyordu Bundan Dolayı Bilgiler Doğru olmadığı için iptal ettim.
    //fetch acıp DeneyeBilirsiniz
    //fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${category.categoryId}&sort_by=${sorting}`)
    // params category olarak değeri olarak yollandı ve sayfa state göderildi
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${params}&page=${page}`
    )
      .then((resp) => resp.json())
      .then((response) => {
        setData(response.results);
        setLoading(false);
      });
  };
// Kaetegori ve Page değiştikce veri yenilenecek
  useEffect(() => {
    LaodData();
  }, [category,page]);
  // useEffect(() => {
  //   LaodData();
  //  ;
  // }, [sorting]);
  return (<>{!category?<Error></Error>:<div className="container mt-3">
  {loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="categoryHeading">
        <h1>{category}</h1>
        {/* Pagination componnets çağrıldı  ve page değerleri göderildi  */}
        <Pagination setPage={setPage} page={page}/>
        {/*Sorting İçin Aç
//<Filter setSorting={setSorting}/>
*/}
      </div>
      <div className="row">
      {/* gelen data movicarta göderildi */}
        {data.map((movie) => {
          return (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
              <MovieCard key={movie.id} data={movie} />
            </div>
          );
        })}
      </div>
      <div class="d-flex justify-content-end mb-3">   <Pagination setPage={setPage} page={page}/></div>
    </>
  )}
  

</div>}</>

      

  );
}
export default MovieCategory;

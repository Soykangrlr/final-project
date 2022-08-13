import MovieCategory from "../components/movie/movieCategory"
import {useParams} from "react-router-dom"
function CategoryMovie() {
  // Gelen Params Alınp Kategori componentine yollandı
  const {id}=useParams()
  return (
    <div><MovieCategory params={id}/></div>
  )
}
export default CategoryMovie
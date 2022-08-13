import { useSelector } from "react-redux";
// Koleksiyonlara göre button ddeğitirildi
import { removeWatchedStore, removeWatchListStore, watched, watchList } from "../../firebase";
function MovieControls({type,data}) {
    const { user } = useSelector((state) => state.auth);
  //Kolesksiyon üzerinden silme ve diğre koleksiyona göderme işlemi yapıdı
    const removeWatched = async () => {
        await removeWatchedStore(user.uid, data.id);

      };
    
      const removeWatchlist=async () => {
        await removeWatchListStore(user.uid, data.id);
        
      };
    
      const handleWatched = async () => {
       
          await watched(user.uid, data.id, data);
         
       
      };
      const handleWatchList = async () => {
          await watchList(user.uid, data.id, data);
      };

      const watchAdd=async()=>{
       await handleWatched()
       await removeWatchlist()
    }
    const watchListAdd=async()=>{
        await handleWatchList()
        await removeWatched()
     }
     const stopPropagationWrapper = (cb) => {
      return (e) => {
        e.stopPropagation();
        e.preventDefault();
        cb()
      }
    }
  return (
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <>
          <button className="ctrl-btn"
          onClick={stopPropagationWrapper(watchAdd)} >
            <i className="fa-fw far fa-eye"></i>
          </button>
          <button
          onClick={stopPropagationWrapper(removeWatchlist)}
            className="ctrl-btn"
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}

      {type === "watched" && (
        <>
          <button className="ctrl-btn"
           onClick={stopPropagationWrapper(watchListAdd)} >
            <i className="fa-fw far fa-eye-slash"></i>
          </button>
          <button
            className="ctrl-btn"
            onClick={stopPropagationWrapper(removeWatched)}
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}
    </div>
  )
}
export default MovieControls
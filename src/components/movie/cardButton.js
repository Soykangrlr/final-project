import { removeWatchedStore, removeWatchListStore, watched, watchList } from "../../firebase";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
// Kategori ve ana Sayfa ve detay sayfasında kullanıldı
function CardButton({data}) {
  const { user } = useSelector((state) => state.auth);
  const { usercn } = useSelector((state) => state.authCn);
  const { watch } = useSelector((state) => state.watch);
  const { watchListRedux } = useSelector((state) => state.watchList);
  const [watchedCart, setWatchedCard] = useState(false);
  const [watchListCart, setWatchListCard] = useState(false);
 //firebase gelen koleksiyonlar reduxtan sakladı ve kontrol yapıldı
 //Kontrole göre buttonlar değitirildi
  const dataControl = () => { 
    if (watch.length>=1) {
      watch.forEach((item) => {
        if (item.id === data.id) {
          setWatchedCard(true);
        }
      });
    }
  
    if (watchListRedux.length>=1) {
      watchListRedux.forEach((item) => {
        if (item.id === data.id) {
          setWatchListCard(true);
        }
      });
    }
  };

  // Koleksiyon değitikçe yeniden veri dinlendi
  useEffect(() => {
    dataControl();
  }, [watch, watchListRedux]);
  useEffect(() => {

    // Çıkış yapıldığında storage yenilenmeden buttonlar değiştirildi
    if (usercn === false) {
      setWatchedCard(false);
      setWatchListCard(false);
    } else {
      //Sayfa Yüklenirken user Kontrol ilk  false sonra true geldiği için true olunca data dinledi
      dataControl();
    }
  },[usercn]);
  // İzlenen  Koleksiyondan silindi
  const removeWatched = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    //firebase remove method çağrıldı ve beklenen parametreler yollandı
    await removeWatchedStore(user.uid, data.id);
    setWatchedCard(false);
  };

  //İzlenecek Koleksiyon silindi
  const removeWatchlist=async (e) => {
    e.preventDefault()
    e.stopPropagation()
     //firebase remove method çağrıldı ve beklenen parametreler yollandı
    await removeWatchListStore(user.uid, data.id);
    //Silindikten sonra card güncellendi
    setWatchListCard(false);
  };
 // watched Koleksiyona movie eklendi
  const handleWatched = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    // eğer user giriş yapmadıysa uyarı verildi
    if (usercn === false) {
      toast.error("Önce Giriş Yapmalısınız");
    } else {
      ////firebase watched method çağrıldı ve beklenen parametreler yollandı
      await watched(user.uid, data.id, data);
      if(watchListCart){
        //Eğer İzleneceklerde varsa movie izlenecekler koleksiyonundan silindi
        removeWatchlist(e)
      }
    }
  };
  const handleWatchList = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (usercn === false) {
      toast.error("Önce Giriş Yapmalısınız");
    } else {
      await watchList(user.uid, data.id, data);
    
    }
  };
  return (
    <>
  {/* durumlara göre card buttonlar değişti */}
      {watchedCart && (
        <>
          {" "}
          <span disabled={true} className="text-success">
            İzledim
          </span>
          <button onClick={removeWatched} className="btn btn-sm btn-danger">
            Çıkar
          </button>
        </>
      )}
      {watchListCart && !watchedCart && (
        <>
          {" "}
          <span disabled={true} className="text-warning">
            İzleyecem
          </span>
          <div>
            <button
              disabled={watchedCart ? true : false}
              onClick={handleWatched}
              class="btn btn-sm btn-success"
            >
              İzledim
            </button>
          </div>
          <button onClick={removeWatchlist} className="btn btn-sm btn-danger">Çıkar</button>
        </>
      )}

      {!watchListCart && !watchedCart && (
        <>
          <button
            disabled={watchedCart ? true : false}
            onClick={handleWatched}
            class="btn btn-sm btn-success"
          >
            İzledim
          </button>
          <button onClick={handleWatchList} class="btn btn-sm btn-warning">
            İzleyeceklerim
          </button>
        </>
      )}
    </>
  );
}
export default CardButton;

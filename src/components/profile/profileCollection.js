
import CollectionCard from "./CollectionListCard";
import {  Link  } from "react-router-dom";
function ProfileCollection({title,data,type}) {
    // Profil Sayfasında koleksiyon Listesi Oluşturldu
    console.log(data.length);
    return (
        <div className="collectionList">
            <h2>{title}</h2>
            <div className="row">
                {
                    data.length==0  && (<h6 className="text-info">Listen Boş</h6>)
                }
                {   data.length!=0 && data.length<=4&&
               <> 
                {data.map(item=>
                    
                    <div className="col-1"> <CollectionCard key={item.id} data={item}/></div>
                    )}
                    <div className="col-1">
                    <Link to={type==="watched"?"/profile/watched":"/profile/watchList"}><span >Göster</span>
                            <span>→</span></Link>
                    </div>
                    </>
                    }
                {
                    data.length>4&&
                    <> 
                    {data.slice(0,10).map(item=>
                        
                        <div className="col-1"> <CollectionCard key={item.id} data={item}/></div>
                        )}
                        <div className="col-1">
                        <Link to={type==="watched"?"/profile/watched":"/profile/watchList"}><span >Göster</span>
                                <span>→</span></Link>
                        </div>
                        </>
                }

            </div>
        </div>
    );
}
export default ProfileCollection;

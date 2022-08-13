
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate, Link  } from "react-router-dom";
import ProfileLayout from '../components/layout/ProfileLayout';
import ProfileCollection from '../components/profile/profileCollection';
import { useDocumentTitle } from '../hooks/use-Document-Title';

function Profile() {
  const { usercn } = useSelector((state) => state.authCn);
  const { watch } = useSelector((state) => state.watch);
  const { watchListRedux } = useSelector((state) => state.watchList);
  const {user}= useSelector(state=>state.auth)
  useDocumentTitle("Profil")
  const navigate=useNavigate()
// eğer user açık değise logi ekranına göderildi
  useEffect(()=>{
    if(usercn===false){
        navigate("/login",{replace:true})
    }
  },[usercn])
  
    const {displayName,email,photoURL}=user
  // user child değerleri alındı
  return (
    <ProfileLayout>
        <div className='mt-5 m-1 overflow-hidden'> 
        <div className="row">
          <div className="col-lg-2 col-md-12 text-center profileInfo">
              <img className="rounded-circle mt-5 " src={photoURL===null? "/user_avatar.png":photoURL} alt="" width="150px"/>
             <div  className="mt-3 fw-semibold font-monospace"> <span>{displayName===null?"User":displayName} </span></div>
             <div  className="mt-1 fw-light "> <span> {email}</span></div>
             <Link to="./edit" className="edit"><i class="fa-solid fa-pen-to-square"></i></Link>
          </div>
          <div className="col-lg-10 col-sm-12 p-3">
           
            <div >
              <ProfileCollection type="watched" title="İzlediklerim Listesi" data={watch}/>
              <ProfileCollection type="watchlist" title="İzleyeceklerim Listesi" data={watchListRedux}/>
            </div>
          </div>
        </div>
    </div>
    </ProfileLayout>

  )

 
}
export default Profile
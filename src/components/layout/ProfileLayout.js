import {  Link  } from "react-router-dom";
function ProfileLayout({children}) {
  // Profil Sayfasıl Navbar layout
  return (
    <>
    
   <nav className="nav bg-dark profile-nav">
  <Link to="/profile" className="nav-link   ">Profil</Link>
  <Link to="/profile/watched" className="nav-link  " >İzlediklerim</Link>
  <Link to="/profile/watchList" className="nav-link  ">İzleyeceklerim</Link>
  
</nav>
  {children}
  </>
   
  )
}
export default ProfileLayout
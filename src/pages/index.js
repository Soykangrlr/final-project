import { Routes, Route } from "react-router-dom"
import Layout from "../components/layout/layout"
import CategoryMovie from "./categoryMovie"
import Error from "./error"
import HomePage from "./homePage"
import LoginPage from "./loginPage"
import MovieDetail from "./movieDetail"
import Profile from "./profile"
import ProfileEdit from "./profileEdit"
import ProfileWatched from "./profileWatched"
import ProfileWatchList from "./profileWatchList"
import Register from "./register"

export default function AppPages(){
  // Router ayarlandı ve  layouta childeren olarak yollandı
    return (
      <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/edit" element={<ProfileEdit/>}/>
        <Route path="/profile/watched" element={<ProfileWatched/>}/>
        <Route path="/profile/watchList" element={<ProfileWatchList/>}/>
        <Route path="/category/:id" element={<CategoryMovie/>}/>
        <Route path="/Movie-Detail/:id" element={<MovieDetail/>}/>
        <Route path="*" element={<Error/>}/>

      </Routes>
      </Layout>
 
    )
}
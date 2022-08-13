import Header from "../Header/header"
import LoadingSpinner from '../spinner/spinner'
import { useSelector } from 'react-redux'

function Layout({ children }) {
 const {pageloading}= useSelector(state => state.loading)
 // Sayfa layout oluşturuldu navbar her sayfada gelecek 
 //loading redux durum kontrolu yapıldı
  return (
    <div>
      <Header />
      <>
        {pageloading ? <LoadingSpinner/>: children}
      </>
    </div>
      )
}
export default Layout
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../firebase";

function Header() {
  const navigate = useNavigate();
  // user bilgisini aldım
  const { user } = useSelector((state) => state.auth);
  // Çıkış yapılırsa Ansayfa Yölendirme ve FireBase oturum kapatma Çalıştı
  const handleout = () => {
    logout();
    navigate("/", { replace: true });
  };
  return (
    <>
      <nav className="navbar  navbar-expand-md  bg-light">
        <div className="container my-2 navbarFlex">
          <div className="me-5">
            {/* Tıklayınca Ana sayfaya Yölendirdim */}
            <Link to="/" className="navbar-brand">
              MovieList
            </Link>
          </div>
    
        {/* toogle buuton medium ekranda çalışmaya başlıcak */}
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
         
          <div class="collapse navbar-collapse navbarRight" id="navbarNav">
       
            <ul class="navbar-nav ">
              <div className="nabarRight-item ">
                <li class="nav-item">
                  <Link to="/" className=" me-2">
                    Popüler Filmler
                  </Link>
                </li>
                <li class="nav-item">
                  {/* Kategori dropdown 
                  Link rooute params yollandı karşınlanan param ekrana Yazdıralıcak
                  */}
                  <div class=" dropdown">
                    <a
                      class=" dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      Kategoriler
                    </a>

                    <ul class="dropdown-menu">
                      <li>
                        <Link class="dropdown-item" to="/category/28">
                          Aksiyon
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/category/12">
                          Macera
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/category/16">
                          Animasyon{" "}
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/category/35">
                          Komedi
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/category/27">
                          Korku
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/category/10752">
                          Savaş
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/category/14">
                          Fantastik
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/category/10751">
                          Aile
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/category/18">
                          Dram
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                  {/* User Oturumu Açık olup olmama durumuna göre buttonlar değişecek
                  Link ile sayfa yölendirme yapıldı
                  */}
                {user === false ? (
                  <>
                    <li class="nav-item">
                      <Link to="/register" className="btn btn-outline-warning ms-2">
                        Kayıt Ol
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/login" className="btn btn-primary ms-2">
                        Giriş Yap
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li class="nav-item">
                      <Link to="/profile" className="btn btn-outline-muted ms-2">
                        Profil
                      </Link>
                    </li>
                    <li class="nav-item">
                      <button onClick={handleout} className="btn btn-danger ms-2">
                        Çıkış Yap
                      </button>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        
          
        </div>
      </nav>
    </>
  );
}
export default Header;

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  emailVerification,
  logout,
  updateProfil,
  uploadImage,
} from "../firebase";
import validationSchema from "./validations";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../hooks/use-Document-Title";
function ProfileEdit() {
  const { usercn } = useSelector((state) => state.authCn);
  const { user } = useSelector((state) => state.auth);
  useDocumentTitle("Profil Düzenle")
  const navigate = useNavigate();
  useEffect(() => {

    if (usercn===false) {
      navigate("/login", { replace: true });
    }
  }, [usercn]);
  const [photo, setphoto] = useState(null);
  const { displayName, email, emailVerified } = user;

  const formik = useFormik({
    initialValues: {
      name: displayName ? displayName : "",
      email: email ? email : "",
    },
    validationSchema,
  });
// firebase email doğrulama
  const handleClick = async () => {
    await emailVerification();
    logout()
    navigate("/login",{replace:true})
  };
  // state photo dosaya alındı
  const handlePhoto = (e) => {
    setphoto(e.target.files[0]);
  };
  // firebase storage fotoğraf yükleme
  const handleClickPhoto = async () => {
    await uploadImage(photo, user);
  };
  // İsim veya email güncelleme yapıldı sonra  profil sayfasına yönlendirildi
  const handleEdit = async (e) => {
    e.preventDefault();
    await updateProfil(formik.values.name, user, formik.values.email);

    navigate("/profile", { replace: true });
  };
  return (
    <>
    {/* Email Dorulama Kontrolu Yapıldı */}
      {!emailVerified ? (
        <div className="text-center alert alert-warning">
          <p>  <span className=" ">Email Onaylanmadı Önce Email Onayla</span>
          <button
            onClick={handleClick}
            type="button"
            class="btn btn-sm btn-info ms-2"
          >
            Onayla
          </button></p>
         
          <div>
            <p>Maili onayladıktan sonra tekrardan giriş yap</p>
            <p>Mail için Span Kutusuna bak </p>
          </div>
        </div>
      ) : (
        <div className="form">
          <form onSubmit={e=>e.preventDefault()}>
            <h1 className="text-center mb-3">Profil Düzenle</h1>
            <div className="mb-3">
              <label className="form-label">Ad Soyad</label>
              <input
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="form-control"
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <span style={{ color: "red" }}>*{formik.errors.name}</span>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="form-control"
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <span style={{ color: "red" }}>*{formik.errors.email}</span>
              ) : null}
            </div>
            <div className="mb-3 text-center">
              <label className="form-label">Resim Seç</label>

              <input
                name="photo"
                type="file"
                className="form-control"
                onChange={handlePhoto}
              />
              <button
                disabled={!photo}
                onClick={handleClickPhoto}
                className="btn btn-success mt-3 w-50 "
              >
                Resmi Yükle
              </button>
            </div>
            <button onClick={handleEdit} type="submit" className="btn btn-primary w-100">
              Düzenle
            </button>
          </form>
        </div>
      )}
    </>
  );
}
export default ProfileEdit;

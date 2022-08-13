import { useEffect } from "react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { login } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDocumentTitle } from "../hooks/use-Document-Title";

function LoginPage() {
  const { usercn } = useSelector((state) => state.authCn);
  useDocumentTitle("Log In")
  const navigate = useNavigate();
 // Eğer User Giriş Yapabilirse Profil Sayfasına Göderildi
  useEffect(()=>{
    console.log(usercn);
    if(usercn===true){
        navigate("/profile",{replace:true})
    }
  },[usercn]) 
  // formik initial değer oluşrurldu
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
  });
 // Fordan gelen değer firebase Login göderildi
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formik.values.email, formik.values.password);
      navigate("/profile", { replace: true });
   
  };
  return (
    <>
    
    <div className="form mt-5">
      <form className="col-lg-4" onSubmit={handleSubmit}>
        <h1 className="text-center mb-3">Giriş Yap</h1>
        <div className="mb-3">
          <label className="form-label">Email Adresi</label>
          <input
            name="email"
            type="email"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {/* validation Kontrolleri yapıldı */}
          {formik.touched.email && formik.errors.email ? (
            <span style={{ color: "red" }}>*{formik.errors.email}</span>
          ) : null}
        </div>
        <div className="mb-3">
          <label className="form-label">Parola</label>
          <input
            name="password"
            type="password"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <span style={{ color: "red" }}>*{formik.errors.password}</span>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Giriş Yap
        </button>
      </form>
    </div>

    </>
  );
}
export default LoginPage;

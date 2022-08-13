
import { useFormik } from "formik";
import { logout, register } from "../firebase";
import { useNavigate } from "react-router-dom";
import validationSchema from "./validations";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDocumentTitle } from "../hooks/use-Document-Title";

function Register() {
  const { usercn } = useSelector((state) => state.authCn);
  const navigate = useNavigate();
  useDocumentTitle("Kayıt Ol")
  useEffect(()=>{

    if(usercn===true){
        navigate("/profile",{replace:true})
    }
  },[usercn])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
  });
  // Üye olundu ve  profil sayfasına göderildi
  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formik.values.email, formik.values.password);
    logout()
    navigate("/profile", { replace: true });

  };
  return (
    <div className="form mt-5">
      <form className="col-lg-4" onSubmit={handleSubmit}>
        <h1 className="text-center mb-3">Kayıt ol</h1>
        <div class="mb-3">
          <label class="form-label">Email Adresi</label>
          <input
            name="email"
            type="email"
            class="form-control"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <span style={{color:"red"}}>*{formik.errors.email}</span>
          ) : null}
        </div>
        <div class="mb-3">
          <label class="form-label">Parola</label>
          <input
            name="password"
            type="password"
            class="form-control"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <span style={{color:"red"}}>*{formik.errors.password}</span>
            ) : null}
        </div>
        <div class="mb-3">
          <label class="form-label">Parola Onay</label>
          <input
            name="confirmPassword"
            type="password"
            class="form-control"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <span style={{color:"red"}}>*{formik.errors.confirmPassword}</span>
            ) : null}
        </div>
        <button type="submit" class="btn btn-primary w-100">
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
export default Register;

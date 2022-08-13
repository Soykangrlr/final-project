
import * as yup from 'yup';
const FILE_SIZE = 1024 * 1024;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png"
];
const validation=yup.object().shape({
    name: yup.string().required('isim alanı boş geçilemez'),
    email: yup.string().email('email formatında olamalıdır').required('email alanı boş olamaz'),
    password:yup.string().min(6,"En az 6 karakterli olmalıdır").required("Password alanı boş geçilemez"),
    confirmPassword:yup.string().oneOf([yup.ref("password")],"Password uyuşmadı").required("Password alanı boş geçilemez"),
    photo: yup
        .mixed()
        .required("A file is required")
        .test(
          "fileSize",
          "File too large",
          value => value && value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          "Unsupported Format",
          value => value && SUPPORTED_FORMATS.includes(value.type)
        )

  });
export default validation
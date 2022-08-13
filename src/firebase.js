import { initializeApp } from "firebase/app";

import { loggedin, loggedout } from "./redux/auth";
import { userContorol } from "./redux/authCn";
import { loading } from "./redux/loading";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import store from "./redux";
import toast from 'react-hot-toast'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  sendEmailVerification,
} from "firebase/auth";

import { doc, setDoc,getFirestore, collection,onSnapshot, deleteDoc} from "firebase/firestore";
import { appendWatched, removeWatched } from "./redux/watchedData";
import { appendWatchList, removeWatchlist } from "./redux/watchedListData";


//firabase config bilgileri alındı
const firebaseConfig = {
  apiKey: "AIzaSyDlc9zdQwbC5b7-V41Pgjf3sAfGlwyqIek",
  authDomain: "odev-4ed41.firebaseapp.com",
  projectId: "odev-4ed41",
  storageBucket: "odev-4ed41.appspot.com",
  messagingSenderId: "1083499733111",
  appId: "1:1083499733111:web:43e9ad8f5b398dfdfba672",
  measurementId: "G-SXG1FJ23Y7"
};

const app = initializeApp(firebaseConfig);
export default app;
// Kullanıcı Bilgileri auth ile çağrıldı
export const auth = getAuth();
// Firestore veri tabanı bilgileri çağrıldı
export const db= getFirestore()
// Storage bilgileri alındı
const storage=getStorage()

//Kullanıcı kayıt işlemleri yapıldı  "createUserWithEmailAndPassword" methodu ile email ve password ile kayıt yapıldı.
export const register = async (email, password) => {
  store.dispatch(loading(true))
await  createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {

    const user = userCredential.user;
    store.dispatch(loading(false))
    toast.success("Kayıt Başarılı")
    console.log(user.uid);
    // Kayıt olduktan Sonra user koleksiyon oluşturuldu
    await setDoc(doc(db, "users",user.uid));
  return user
  
  })
  .catch((error) => {
 
    store.dispatch(loading(false))

    // ..
  });
};
// Kullanıcı giriş ayarları 
export const login = async (email, password) => {
  store.dispatch(loading(true))
    await  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      
      toast.success("Giriş Başarılı")
      // Giriş yaptıktan Sonra Koleksiyonlar Dinlendi
      watchedListen(user.uid)
      watchListListen(user.uid)
      return user;
    })
    .catch((error) => {
      toast.error(error.code)
      store.dispatch(loading(false))
      
    });
};
//Email Onay Mail Gönderme
export const emailVerification= async()=>{
  try{ 
    await sendEmailVerification(auth.currentUser)
 toast.success("Mail Göderildi")
}catch(error){
  toast.error(error.code)
}
 
}
// Profil Güncelleme
export const updateProfil=async(displayName,currentUser,email)=>{
 try{ 
  // Resim bilgileri alınd
  const fileRef=ref(storage,currentUser.uid)
  const photoURL= await getDownloadURL(fileRef)
  // İsim ve Resim güncellendi
  await updateProfile(currentUser,{
    displayName,
    photoURL
  })
 // Mail Güncellendi
  await updateEmail(auth.currentUser,email)
  toast.success("Profil Güncellendi")
}
catch(error){
  toast.error(error.code)
}
}
// Kullanıcı Dinlendi (Giriş Yapıp Yapmadığını bakıldı)
  onAuthStateChanged(auth, (user) => {
    store.dispatch(loading(true))
  
    if (user) {
      store.dispatch(loggedin(user));
      store.dispatch(userContorol(true))
      store.dispatch(loading(false))
    } else {
      store.dispatch(loggedout(false));
      store.dispatch(userContorol(false))
      store.dispatch(loading(false))
    }
  })


//Çıkış Yapıldı ve Localstorage bilgileri silindi
export const logout =()=>{
  auth.signOut()
 store.dispatch(removeWatched())
 store.dispatch(removeWatchlist())
 store.dispatch(loading(false))
}

// storage
//Gelen file bilgisi User idsi ile Srorrage yüklendi
export const uploadImage= async(file,currentUser)=>{
  const fileRef=ref(storage,currentUser.uid)
  try{
    await uploadBytes(fileRef,file)
    toast.success("Resim yüklendi")
  }
 catch(error){
  toast.error(error.code)
 }

}

//fireStore DataBase
// Veri Ekleme
// Watched Koleksiyon oluşturuldu Koleksiyon altındaki dökümana Filmler idleri ile eklendi
export const watched= async(userId,movieId,data)=>{
const userIdRef=doc(db,'users',userId)
 await setDoc(doc(userIdRef, "watched",`${movieId}movie`),{data});
 toast.success('İzlediklerime Eklendi')
 watchedListen(userId)
 
 
}
// watchlist koleksiyon oluşturuldu Koleksiyon altındaki dökümana Filmler idleri ile eklendi
export const watchList= async(userId,movieId,data)=>{
  const userIdRef=doc(db,'users',userId)
   await setDoc(doc(userIdRef, "watchList",`${movieId}movie`),{data})
   toast.success('İzleyeceklerime  Eklendi')
   watchListListen(userId)
  }
  //Veri Silme
 // Koleksiyondan döküman silindi idyr göre
  export const removeWatchedStore=async(userId,movieId)=>{
    const watchedRef=doc(db,"users",userId)
    await deleteDoc(doc(watchedRef,"watched", `${movieId}movie`))
    watchedListen(userId)
    toast.success('Listeden Silindi')
  }
   // Koleksiyondan döküman silindi idyr göre
  export const removeWatchListStore=async(userId,movieId)=>{
    const watchedRef=doc(db,"users",userId)
    await deleteDoc(doc(watchedRef,"watchList", `${movieId}movie`))
    watchedListen(userId)
    toast.success('Listeden Silindi')
  }

  // Veri Dinleme
  // Firestore veri dinlendi (giriş işlemleri sırasında  ekleme silme sırasın )
 const watchedListen= async(userId)=>{
    const watchedRef=collection(db,'users',userId,'watched')
    
 onSnapshot(watchedRef, (querySnapshot) => {
    const watched = [];
    querySnapshot.forEach((doc) => {
        watched.push(doc.data().data);
     
    });
    console.log(watched);
   store.dispatch(appendWatched(watched))
  });
  }
 const watchListListen= async(userId)=>{
    const watchedRef=collection(db,'users',userId,'watchList')
    onSnapshot(watchedRef, (querySnapshot) => {
       const watchList = [];
       querySnapshot.forEach((doc) => {
         watchList.push(doc.data().data);
        
       });
      store.dispatch(appendWatchList(watchList))
     });
  }

   
 
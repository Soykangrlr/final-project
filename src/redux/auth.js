import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    user:  false
}
// Kullanıcı Bilgileri bu contexte saklandı
const auth=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loggedin:(state,action)=>{
            state.user= action.payload 
        },
        // Çıkış yapılınca kullanıcı false bilgileri silindi
        loggedout:state=>{
            state.user=false
        }
        
    }
})

export  const{loggedin,loggedout}=auth.actions
export default auth.reducer
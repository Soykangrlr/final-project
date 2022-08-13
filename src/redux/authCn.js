import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    usercn:  false
}
// kullanıcı konturolu yapıldı.
const authCn=createSlice({
    name:"authCn",
    initialState,
    reducers:{
        userContorol:(state,action)=>{
            state.usercn= action.payload 
        },
       
        
    }
})

export  const{userContorol}=authCn.actions
export default authCn.reducer
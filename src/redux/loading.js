import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    pageloading:false
}
//firabase loading bilgileri saklandı
const load=createSlice({
    name:"load",
    initialState,
    reducers:{
       loading:(state,action)=>{
        state.pageloading=action.payload
       }
        
    }
})

export  const{loading}=load.actions
export default load.reducer
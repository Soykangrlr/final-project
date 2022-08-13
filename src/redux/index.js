import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'
import loading from './loading'
import authCn from './authCn'
import watch from './watchedData'
import watchList from'./watchedListData'

const store=configureStore({
    reducer:{auth,loading,authCn,watch,watchList}
})
export default store
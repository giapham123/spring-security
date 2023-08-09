import { combineReducers } from 'redux'
import {  persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import todosReducer from '../reducers/homeReducer'
import allProductReducer from '../reducers/showAllProductsReducer'
import postPageReducer from '../reducers/postPageReducer'
import detailsReducer from '../reducers/detailsReducer'
import personalReducer from '../reducers/personalReducer'
import loginReducer from '../reducers/loginReducer'
import totalDataReducer from '../reducers/totalDataReducer'


const persistConfig = {
    key: 'root',
    storage,
    // allProduct:[allProductReducer]
}
const rootReducer = combineReducers({
    cate: todosReducer,
    allProduct: allProductReducer,
    postPage: postPageReducer,
    detailsProduct:detailsReducer,
    personal:personalReducer,
    login:loginReducer,
    totalData: totalDataReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer

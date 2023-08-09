import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import persistedReducer from './reducers/reducer'
import { persistStore, persistReducer } from 'redux-persist'
const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
  // other store enhancers if any
)

const store = createStore(persistedReducer, composedEnhancer)
let persistor = persistStore(store)
export { store, persistor }

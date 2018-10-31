import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
<<<<<<< HEAD
import {allProductsReducer} from './products'

const reducer = combineReducers({user, allProductsReducer})
=======
import products from './products'
import product from './product'

const reducer = combineReducers({user, products, product})
>>>>>>> f8f20403d47b69bf55d18dba19b91746e60c964c
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

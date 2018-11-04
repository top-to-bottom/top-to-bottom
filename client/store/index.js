import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import openMenu from './sidemenu'
import product from './product'
import cart from './cart'
import users from './users'
import orders from './orders'

const reducer = combineReducers({
  user,
  products,
  product,
  openMenu,
  cart,
  users,
  orders
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

import axios from 'axios'
import history from '../history'
import {addCartItems, fetchUserCart} from './cart'

/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'
const MAKE_ADMIN = 'MAKE_ADMIN'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: SET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const makeAdmin = newAdmin => ({type: MAKE_ADMIN, newAdmin})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async (dispatch, getState) => {
  let res
  const state = getState()
  const currentCart = state.cart
  const currentCartData = currentCart.cartData || []
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))

    await dispatch(fetchUserCart())
    dispatch(addCartItems(currentCartData))

    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const setUser = id => async dispatch => {
  const {data: user} = await axios.get(`/api/users/${id}`)
  dispatch(getUser(user))
}

export const setAdmin = selectedUser => async dispatch => {
  const updatedUser = {...selectedUser, isAdmin: true}
  const newAdmin = await axios.put(`/api/users/${updatedUser.id}`, updatedUser)
  if (!newAdmin) {
    return new Error()
  } else {
    const {data: user} = await axios.get(`/api/users/${updatedUser.id}`)
    dispatch(makeAdmin(user))
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser

    case MAKE_ADMIN:
      return action.newAdmin

    default:
      return state
  }
}

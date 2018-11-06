import axios from 'axios'
/**
 * ACTION TYPES
 */

const SET_CART_DATA = 'SET_CART_DATA'

/**
 * INITIAL STATE
 */

const initialCart = {}

/**
 * ACTION CREATORS
 */
export const setCartData = cart => {
  return {
    type: SET_CART_DATA,
    cart
  }
}

/**
 * THUNK CREATORS
 */

export const fetchUserCart = () => {
  return async (dispatch, getState) => {
    const state = getState()
    let userId = state.user.id
    const cartResponse = await axios.get(`/api/cart/${userId}`)
    const cart = cartResponse.data
    dispatch(setCartData(cart))
  }
}

export const addProductToCart = product => {
  return async (dispatch, getState) => {
    const state = getState()
    let userId = state.user.id
    await axios.put(`/api/cart/${userId}`, product)

    dispatch(fetchUserCart())
  }
}
export const updateCartItem = (cartItem, newQuantity) => {
  return async dispatch => {
    const response = await axios.put(`/api/cart/cartItem/${cartItem.id}`, {
      quantity: newQuantity
    })

    dispatch(fetchUserCart())
  }
}

export const removeCartItem = cartItemId => {
  return async dispatch => {
    await axios.delete(`/api/cart/${cartItemId}`)
    dispatch(fetchUserCart())
  }
}

/**
 * REDUCER
 */
export default (state = initialCart, action) => {
  switch (action.type) {
    case SET_CART_DATA: {
      return action.cart
    }
    default:
      return state
  }
}

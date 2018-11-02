import axios from 'axios'
/**
 * ACTION TYPES
 */

const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const SET_CART_ITEMS = 'SET_CART_ITEMS'
const SET_CART_DATA = 'SET_CART_DATA'

/**
 * INITIAL STATE
 */

const initialCart = {
  subtotal: 0,
  quantity: 0,
  products: []
}

/**
 * ACTION CREATORS
 */
export const setCartData = cart => {
  return {
    type: 'SET_CART_DATA',
    cart
  }
}
export const addItemToCart = item => {
  return {
    type: ADD_ITEM_TO_CART,
    item
  }
}

export const removeItemFromCart = item => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    item
  }
}

export const setItemsInCart = items => {
  return {
    type: SET_CART_ITEMS,
    items
  }
}

/**
 * THUNK CREATORS
 */

export const fetchUserCart = () => {
  return async dispatch => {
    const cartResponse = await axios.get(`/api/cart`)
    const productResponse = await axios.get(`/api/cart/products`)
    const cart = cartResponse.data
    const products = productResponse.data
    dispatch(setCartData(cart))
    dispatch(setItemsInCart(products))
  }
}

export const addProductToCart = product => {
  return async dispatch => {
    const requestBody = {
      productId: product.id
    }
    await axios.put(`/api/cart`, requestBody)
    dispatch(addItemToCart(product))
  }
}

/**
 * REDUCER
 */
export default (state = initialCart, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...state, action.item]
    case REMOVE_ITEM_FROM_CART: {
      const newArr = state.filter(item => {
        return item.id !== action.item.id
      })
      return newArr
    }
    case SET_CART_ITEMS: {
      return action.items
    }
    case SET_CART_DATA: {
      return {
        ...state,
        subtotal: cart.price,
        quantity: cart.quantity
      }
    }
    default:
      return state
  }
}

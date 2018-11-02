import axios from 'axios'
/**
 * ACTION TYPES
 */

const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const SET_CART_ITEMS = 'SET_CART_ITEMS'

/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */

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
    const response = await axios.get(`/api/cart/products`)
    const products = response.data
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
export default (state = [], action) => {
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
    default:
      return state
  }
}

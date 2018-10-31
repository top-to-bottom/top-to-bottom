import axios from 'axios'

/**
 * ACTION TYPES
 */
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const SELECT_SINGLE_PRODUCT = 'SELECT_SINGLE_PRODUCT'
export const ADD_ITEM_TO_CART = 'ADD_ITEM_FROM_PRODUCT_LISTING'
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'

/**
 * INITIAL STATE
 */
const defaultProduct = {
  list: [],
  singleProduct: {},
  cartItems: []
}

/**
 * ACTION CREATORS
 */
export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const setProduct = singleProduct => {
  return {
    type: SELECT_SINGLE_PRODUCT,
    singleProduct
  }
}

const addItemToCart = item => {
  return {
    type: ADD_ITEM_TO_CART,
    item
  }
}

const removeItemFromCart = item => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    item
  }
}

/**
 * THUNK CREATORS
 */
export const allProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    const products = res.data
    const action = getProducts(products)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const setSingleProduct = id => async dispatch => {
  try {
    const {data: singleProduct} = await axios.get(`/api/products/${id}`)
    const action = setProduct(singleProduct)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        list: action.products
      }

    case SELECT_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.singleProduct
      }
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.item]
      }

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: []
      }

    default:
      return state
  }
}

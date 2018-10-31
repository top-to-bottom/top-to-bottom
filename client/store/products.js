import axios from 'axios'

/**
 * ACTION TYPES
 */
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const SELECT_SINGLE_PRODUCT = 'SELECT_SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = {
  list: [],
  singleProduct: {}
}

/**
 * ACTION CREATORS
 */
export const getProducts = products =>  {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const setProduct = singleProduct =>  {
  return {
    type: GET_PRODUCTS,
    singleProduct
  }
}

/**
 * THUNK CREATORS
 */
export const allProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products');
    const products = res.data;
    const action = getProducts(products)
    dispatch(action);
  } catch (err) {
    console.error(err)
  }
}

export const setSingleProduct = (id) => async dispatch => {
  try {
    const {data: singleProduct} = await axios.get(`/api/products/${id}`)
    const action = setProduct(singleProduct)
    dispatch(action);
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
        ...state, list: action.products
      }

    case SELECT_SINGLE_PRODUCT:
      return {
        ...state, singleProduct: action.singleProduct
      }

    default:
      return state;
  }
}

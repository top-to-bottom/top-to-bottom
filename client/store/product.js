import axios from 'axios'

// TYPES

const GET_PRODUCT = 'GET_PRODUCT'

//CREATORS

const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

//THUNK

export const fetchProduct = id => async dispatch => {
  const {data: product} = await axios.get(`/api/products/${id}`)
  dispatch(getProduct(product))
}

//REDUCER

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}

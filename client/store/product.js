import axios from 'axios'

// TYPES

const GET_PRODUCT = 'GET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const ADD_REVIEW = 'ADD_REVIEW'

//CREATORS

const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

const updateProduct = updatedProduct => ({
  type: UPDATE_PRODUCT,
  updatedProduct
})

const createReview = newReview => ({
  type: ADD_REVIEW,
  newReview
})

//THUNK

export const fetchProduct = id => async dispatch => {
  const {data: product} = await axios.get(`/api/products/${id}`)
  dispatch(getProduct(product))
}

export const editProduct = updatedProduct => async dispatch => {
  const editedProduct = await axios.put(
    `/api/products/${updatedProduct.id}`,
    updatedProduct
  )
  if (!editedProduct) {
    return new Error()
  } else {
    const {data: product} = await axios.get(
      `/api/products/${updatedProduct.id}`
    )
    dispatch(updateProduct(product))
  }
}

export const addReview = newReview => async dispatch => {
  const {data: newestReview} = await axios.post('/api/reviews/', newReview)
  const action = createReview(newestReview)
  dispatch(action)
}

//REDUCER

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product

    case UPDATE_PRODUCT:
      return action.updatedProduct

    case ADD_REVIEW:
      return {
        ...state, reviews: [...state.reviews, action.newReview]
      }

    default:
      return state
  }
}

import axios from 'axios'

/**
 * ACTION TYPES
 */
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'

/**
 * ACTION CREATORS
 */
export const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export const addCategory = newCategory => {
  return {
    type: ADD_CATEGORY,
    newCategory
  }
}

/**
 * THUNK CREATORS
 */
export const allCategories = () => async dispatch => {
  try {
    const {data: categories} = await axios.get(
      `/api/categories`
    )
    const action = getCategories(categories)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const createCategory = newCategory => async dispatch => {
  try {
    const {data: newestCategory} = await axios.post('/api/categories/', newCategory)
    const action = addCategory(newestCategory)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const deleteCategory = categoryId => async dispatch => {
  try {
    const categoryDeleted = await axios.delete(`/api/categories/${categoryId}`)
    if(categoryDeleted.status === 204)  {
      const {data: categories} = await axios.get(
        `/api/categories`
      )
      const action = getCategories(categories)
      dispatch(action)
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories

    case ADD_CATEGORY:
      return [...state, action.newCategory]

    default:
      return state
  }
}

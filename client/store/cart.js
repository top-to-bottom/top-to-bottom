/**
 * ACTION TYPES
 */

const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'

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

/**
 * THUNK CREATORS
 */

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
    default:
      return state
  }
}

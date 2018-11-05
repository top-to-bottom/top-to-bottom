import axios from 'axios'

//TYPES

const GET_ORDER = 'GET_ORDER'

//CREATORS

const getOrders = order => ({
  type: GET_ORDER,
  order
})

//THUNK

export const fetchOrder = id => async dispatch => {
  const {data: order} = await axios.get(`/api/orders/${id}`)
  console.log('store order', order)
  dispatch(getOrders(order))
}

//REDUCER

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}

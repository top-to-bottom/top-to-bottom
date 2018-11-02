import axios from 'axios'

//TYPES

const GET_ORDERS = 'GET_ORDERS'

//CREATORS

const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

//THUNK

export const fetchOrders = () => async dispatch => {
  const {data: orders} = await axios.get('/api/orders')
  dispatch(getOrders(orders))
}

//REDUCER

export default (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
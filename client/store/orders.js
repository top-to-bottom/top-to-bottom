import axios from 'axios'

//TYPES

const GET_ORDERS = 'GET_ORDERS'
const ADD_ORDER = 'ADD_ORDER'

//CREATORS

const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

const addOrder = order => ({
  type: ADD_ORDER,
  order
})

//THUNK

export const fetchOrders = isMe => async dispatch => {
  const {data: orders} = await axios.get(`/api/orders/${isMe ? 'me' : ''}`)
  dispatch(getOrders(orders))
}

export const createOrder = (address, cartId) => async dispatch => {
  const contactInfo = {...address, cartId: cartId}
  const {data: order} = await axios.post('/api/orders', {address, cartId})
  order.customer = contactInfo;
  await axios.post('/api/email/order-confirmation', order)
  dispatch(addOrder(order))
}

//REDUCER

export default (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case ADD_ORDER:
      return [...state, action.order]
    default:
      return state
  }
}

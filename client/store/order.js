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
  dispatch(getOrders(order))
}

export const updateOrder = (id, newStatus) => {
  return async dispatch => {
    const response = await axios.put(`/api/orders/${id}`, {
      status: newStatus
    })
    dispatch(getOrders(response.data))
  }
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

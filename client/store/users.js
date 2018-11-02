import axios from 'axios'

const GET_USERS = 'GET_USERS'
const REMOVE_USERS = 'REMOVE_USERS'

const getUsers = users => ({type: GET_USERS, users})
const deleteUser = user => ({type: REMOVE_USERS, user})

export const fetchUsers = () => {
  return async dispatch => {
    const response = await axios.get('/api/users')
    const users = response.data
    dispatch(getUsers(users))
  }
}

export const removeUsers = user => {
  return async dispatch => {
    await axios.delete(`api/users/${user.id}`)
    dispatch(deleteUser(user))
  }
}

const users = []

export default (state = users, action) => {
  switch (action.type) {
    case GET_USERS:
      return [...action.users]

    case REMOVE_USERS:
      return state.filter(user => {
        return user.id !== action.user.id
      })
    default:
      return state
  }
}

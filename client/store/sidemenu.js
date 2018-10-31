//ACTION TYPES
const CHANGE_SIDEMENU = 'CHANGE_PRODUCT_MENU '

export const changeSidemenu = openMenu => {
  return {
    type: CHANGE_SIDEMENU,
    openMenu
  }
}

const initialState = {
  openMenu: false
}

//reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SIDEMENU:
      return {
        ...state,
        openMenu: action.openMenu
      }
    default:
      return state
  }
}

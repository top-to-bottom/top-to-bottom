//ACTION TYPES
const CHANGE_SIDEMENU = 'CHANGE_PRODUCT_MENU '

export const changeSidemenu = openMenu => {
  return {
    type: CHANGE_SIDEMENU,
    openMenu
  }
}

//reducer

export default function(state = false, action) {
  switch (action.type) {
    case CHANGE_SIDEMENU:
      return action.openMenu
    default:
      return state
  }
}

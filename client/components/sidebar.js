import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {withStyles} from '@material-ui/core/styles'

import {connect} from 'react-redux'
import {changeSidemenu} from '../store/sidemenu'

const styles = theme => {
  return {
    drawer: {
      width: 240
    }
  }
}

const Sidebar = props => {
  return (
    <SwipeableDrawer
      className={props.classes.drawer}
      open={props.open}
      onClose={() => {
        props.closeSideBar()
      }}
      onOpen={() => {}}
    >
      <div
        tabIndex={0}
        role="button"
        onClick={() => {
          props.closeSideBar()
        }}
      >
        <List>
          <ListItem
            button
            onClick={() => {
              props.closeSideBar()
            }}
          >
            <ListItemText primary="Shoes" />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => {
              props.closeSideBar()
            }}
          >
            <ListItemText primary="Hats" />
          </ListItem>
          <Divider />
        </List>
      </div>
    </SwipeableDrawer>
  )
}

const mapStateToProps = state => {
  return {
    open: state.openMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeSideBar: () => {
      dispatch(changeSidemenu(false))
      console.log('Close Side menu')
    }
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
)

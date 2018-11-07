import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {withStyles} from '@material-ui/core/styles'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SidebarItem from './sidebarItem'

import {changeSidemenu} from '../store/sidemenu'
import {allCategories} from '../store/categories'

const styles = theme => {
  return {
    drawer: {
      width: 240
    }
  }
}

class Sidebar extends React.Component {
  componentDidMount() {
    this.props.allCategories()
  }
  render() {
    return (
      <SwipeableDrawer
        className={this.props.classes.drawer}
        open={this.props.open}
        onClose={() => {
          this.props.closeSideBar()
        }}
        onOpen={() => {}}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={() => {
            this.props.closeSideBar()
          }}
        >
          <List>
            {this.props.categories.map(category => (
              <SidebarItem
                key={category.id}
                closeSideBar={this.props.closeSideBar}
                category={category.name}
              />
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    )
  }
}

const mapStateToProps = state => {
  return {
    open: state.openMenu,
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeSideBar: () => {
      dispatch(changeSidemenu(false))
    },
    allCategories: () => {
      dispatch(allCategories())
    }
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
)

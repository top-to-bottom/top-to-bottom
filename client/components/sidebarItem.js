import React from 'react'
import {Link} from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

const sidebarItem = props => (
  <React.Fragment>
    <ListItem
      button
      onClick={() => {
        props.closeSideBar()
      }}
    >
      <Link to={`/products/category/${props.category}`}>
        <ListItemText primary={props.category} />
      </Link>
    </ListItem>
    <Divider />
  </React.Fragment>
)

export default sidebarItem

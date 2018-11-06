import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import InputBase from '@material-ui/core/InputBase'
import {withStyles} from '@material-ui/core/styles'
import {Toolbar, Typography} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {fade} from '@material-ui/core/styles/colorManipulator'
import {changeSidemenu} from '../store/sidemenu'
import {fetchUserCart} from '../store/cart'
import Badge from '@material-ui/core/Badge'

const styles = theme => {
  return {
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    link: {
      color: 'white'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        width: 'auto'
      }
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit',
      width: '100%'
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200
      }
    },
    seperator: {
      flexGrow: 1
    },
    menuButtonContainer: {
      display: 'flex',
      flexDirection: 'row',
      color: 'white',
      alignItems: 'center'
    }
  }
}

class Navbar extends React.Component {
  state = {search: ''}

  onChange = event => {
    const search = event.target.value
    this.setState({search})
  }

  onSubmit = event => {
    event.preventDefault()
    this.props.history.push(`/products?search=${this.state.search}`)
    this.setState({search: ''})
  }

  render() {
    const {classes, rootClassName} = this.props
    return (
      <div className={rootClassName}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={() => {
                this.props.openSideBar()
              }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/home" className={classes.link}>
              <Typography variant="h4" color="inherit" noWrap>
                TOP-TO-BOTTOM
              </Typography>
            </Link>
            <div className={classes.seperator} />

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={this.onSubmit}>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  onChange={this.onChange}
                  value={this.state.search}
                />
              </form>
            </div>

            <div className={classes.menuButtonContainer}>
              {this.props.isLoggedIn === false ? (
                <div className={classes.menuButtonContainer}>
                  <Link to="/signup" className={classes.link}>
                    <IconButton color="inherit">Sign Up</IconButton>
                  </Link>
                  <Link to="/login" className={classes.link}>
                    <IconButton color="inherit">Login</IconButton>
                  </Link>
                </div>
              ) : (
                <div className={classes.menuButtonContainer}>
                  <Link to="/" className={classes.link}>
                    <IconButton color="inherit">My Account</IconButton>
                  </Link>
                  <IconButton onClick={this.props.logout}>
                    <label style={{color: 'white'}}>Logout</label>
                  </IconButton>
                </div>
              )}
              <Link to="/cart" className={classes.link}>
                <IconButton color="inherit">
                  {this.props.quantity === 0 ? (
                    <ShoppingCartIcon />
                  ) : (
                    <Badge badgeContent={this.props.quantity} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  )}
                </IconButton>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  let quantity = 0
  if (state.cart.cartData) {
    quantity = state.cart.cartData.length
  }

  return {
    isLoggedIn: !!state.user.id,
    state,
    ownProps,
    quantity
  }
}

const mapDispatch = dispatch => {
  return {
    logout() {
      dispatch(logout())
    },
    openSideBar: () => dispatch(changeSidemenu(true)),
    fetchCartCount: () => dispatch(fetchUserCart())
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

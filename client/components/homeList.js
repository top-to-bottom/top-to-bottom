import React from 'react'

import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import {Link} from 'react-router-dom'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 800,
    height: 700,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'white'
  }
})

const tileData = [
  {
    img: '/allproducts.jpeg',
    title: 'All Products',
    link: '/products',
    rows: 2.5,
    cols: 5
  },
  {
    img: '/hat.jpeg',
    title: 'Hats',
    link: '/products/1',
    cols: 2
  },
  {
    img: '/shoe.jpeg',
    title: 'Shoes',
    link: '/products/2',
    cols: 3
  }
]

function HomeList(props) {
  const {classes} = props

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={225}
        spacing={1}
        className={classes.gridList}
        cols={5}
      >
        {tileData.map(tile => (
          <GridListTile
            key={tile.img}
            rows={tile.rows || 2}
            cols={tile.cols || 1}
          >
            <Link to={tile.link}>
              <img src={tile.img} alt={tile.title} />
            </Link>
            <GridListTileBar
              title={tile.title}
              titlePosition="top"
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

HomeList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HomeList)

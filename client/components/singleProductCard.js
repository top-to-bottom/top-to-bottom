import React from 'react'

import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    objectFit: 'cover'
  }
}

const SingleProductCard = props => {
  const {classes, product} = props
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={product.name}
          className={classes.media}
          height="140"
          image={product.imageUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
            {'           '}
            ${product.price}
          </Typography>
          <Typography component="p">{product.description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Review
        </Button>
        <Button size="small" color="primary">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
}

SingleProductCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SingleProductCard)

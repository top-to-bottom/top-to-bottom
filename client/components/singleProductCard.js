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
import Icon from '@material-ui/core/Icon'
import {addItemToCart} from '../store/cart'
import {connect} from 'react-redux'

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
          image={product.defaultImageUrl}
          title={product.name}
        />
        {
          product.secondaryImageUrl ? <CardMedia
          component="img"
          alt={product.name}
          className={classes.media}
          height="140"
          image={product.secondaryImageUrl}
          title={product.name}
        /> : <div />
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
            {'           '}
            ${product.price}
          </Typography>
          <Typography component="p">{product.description}</Typography>
          <Typography gutterBottom variant="h6" component="h4">
            Reviews
          </Typography>
          {!!product.reviews &&
            product.reviews.map(review => (
              <React.Fragment key={review.id}>
                <Typography>{review.text}</Typography>
                <Typography>
                  <Icon
                    className={classes.icon}
                    color={review.stars >= 1 ? 'secondary' : 'primary'}
                  >
                    star_rate
                  </Icon>
                  <Icon
                    className={classes.icon}
                    color={review.stars >= 2 ? 'secondary' : 'primary'}
                  >
                    star_rate
                  </Icon>
                  <Icon
                    className={classes.icon}
                    color={review.stars >= 3 ? 'secondary' : 'primary'}
                  >
                    star_rate
                  </Icon>
                  <Icon
                    className={classes.icon}
                    color={review.stars >= 4 ? 'secondary' : 'primary'}
                  >
                    star_rate
                  </Icon>
                  <Icon
                    className={classes.icon}
                    color={review.stars >= 5 ? 'secondary' : 'primary'}
                  >
                    star_rate
                  </Icon>
                </Typography>
              </React.Fragment>
            ))}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Review
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            props.addToCart(product)
          }}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: product => {
      dispatch(addItemToCart(product))
    }
  }
}

SingleProductCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(SingleProductCard)
)

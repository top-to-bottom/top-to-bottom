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
    maxWidth: 345,
    marginBottom: 20
  },
  media: {
    objectFit: 'contain'
  }
}

const listProductsCard = props => {
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
            {'           '}
            {numeral(product.price / 100).format('$0,0.00')}
          </Typography>
          <Typography component="p">{product.description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          LEARN MORE
        </Button>
      </CardActions>
    </Card>
  )
}

listProductsCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(listProductsCard)

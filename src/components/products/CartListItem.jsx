import React from 'react'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { useSelector } from 'react-redux'
import { getUserId } from '../../reducks/users/selectors'
import { db } from '../../firebase'
import NoImage from '../../assets/image/src/noimage.png'

const useStyles = makeStyles({
	list: {
		height: 128,
	},
	image: {
		objectFit: 'cover',
		margin: 16,
		height: 96,
		width: 96,
	},
	text: {
		width: '100%',
	},
})

const CartListItem = (props) => {
	const selector = useSelector((state) => state)

	const classes = useStyles()

	const imagePath = props.product.images.length > 0 ? props.product.images[0].path : NoImage
	const name = props.product.name
	const price = props.product.price.toLocaleString()
	const size = props.product.size

	// methods
	const removeProductFromCart = (cartId) => {
		const uid = getUserId(selector)
		return db.collection('users').doc(uid).collection('cart').doc(cartId).delete()
	}

	return (
		<>
			<ListItem className={classes.list}>
				<ListItemAvatar>
					<img className={classes.image} src={imagePath} alt='商品のTOP画像' />
				</ListItemAvatar>
				<div className={classes.text}>
					<ListItemText primary={name} secondary={'サイズ：' + size} />
					<ListItemText primary={'¥' + price} />
				</div>
				<IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
					<DeleteIcon />
				</IconButton>
			</ListItem>
			<Divider />
		</>
	)
}

export default CartListItem

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MOreVertIcon from '@material-ui/icons/MoreVert'

import NoImage from '../../assets/image/src/noimage.png'
import { deleteProduct } from '../../reducks/products/operations'

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.down('sm')]: {
			margin: 8,
			width: 'calc(50% - 16px)',
		},
		[theme.breakpoints.up('md')]: {
			margin: 16,
			width: 'calc(33.3333% - 32px)',
		},
	},
	content: {
		display: 'flex',
		padding: '16 8',
		textAlign: 'left',
		'&:last-child': {
			paddingBottom: 16,
		},
	},
	icon: {
		marginRight: 0,
		marginLeft: 'auto',
	},
	media: {
		height: 0,
		paddingTop: '100%',
	},
	price: {
		color: theme.palette.secondary.dark,
		fontSize: 16,
	},
}))

const ProductCard = (props) => {
	const dispatch = useDispatch()
	const classes = useStyles()

	// state
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const imagePath = props.images.length > 0 ? props.images[0].path : NoImage
	const price = props.price.toLocaleString()

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image={imagePath}
				title=''
				onClick={() => dispatch(push(`/product/${props.id}`))}
			/>
			<CardContent className={classes.content}>
				<div onClick={() => dispatch(push(`/product/${props.id}`))}>
					<Typography color='textSecondary' component='p'>
						{props.name}
					</Typography>
					<Typography className={classes.price} component='p'>
						￥{price}
					</Typography>
				</div>
			</CardContent>
			<IconButton onClick={handleClick}>
				<MOreVertIcon />
			</IconButton>
			<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem
					onClick={() => {
						dispatch(push(`product/edit/${props.id}`))
						handleClose()
					}}
				>
					編集する
				</MenuItem>
				<MenuItem
					onClick={() => {
						const ref = window.confirm('この商品を削除しますか？')
						if (ref) dispatch(deleteProduct(props.id))
					}}
				>
					削除する
				</MenuItem>
			</Menu>
		</Card>
	)
}

export default ProductCard

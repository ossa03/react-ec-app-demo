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

import noimage from '../../assets/image/src/noimage.png'
import { deleteProduct } from '../../reducks/products/operations'

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.down('sm')]: {
			margin: 8,
			width: 'calc(50%-16px)',
		},
		[theme.breakpoints.up('sm')]: {
			margin: 16,
			width: 'calc(33.3333%-32px)',
		},
		content: {
			display: 'flex',
			padding: '16px 8px',
			textAlign: 'left',
			'&:last-child': {
				paddingBottom: 16,
			},
		},
		media: {
			height: 0,
			paddingTop: 'auto',
		},
		price: {
			color: theme.palette.secondary.main,
			fontSize: 16,
		},
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

	const images = props.images.length > 0 ? props.images : [{ path: noimage }]
	const price = props.price.toLocaleString()

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image={images[0].path}
				title=''
				onClick={() => dispatch(push(`/product/${props.id}`))}
			/>
			<CardContent className={classes.content} onClick={() => dispatch(push(`/product/${props.id}`))}>
				<div>
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
				<MenuItem onClick={() => dispatch(deleteProduct(props.id))}>削除する</MenuItem>
			</Menu>
		</Card>
	)
}

export default ProductCard

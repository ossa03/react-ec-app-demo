import React from 'react'
import { useDispatch } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/styles'
import { PrimaryButton } from '../UIkit'
import { push } from 'connected-react-router'
import { useCallback } from 'react'

// import NoImage from '../../assets/image/src/noimage.png'

const useStyles = makeStyles({
	list: {
		background: '#fff',
		height: 'auto',
	},
	image: {
		objectFit: 'cover',
		margin: '8px 16px 8px 0',
		height: 96,
		width: 96,
	},
	text: {
		width: '100%',
	},
})

const OrderedProducts = (props) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const products = props.products

	const goToProductDetail = useCallback((productId) => {
		dispatch(push(`product/${productId}`))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<List>
			<>
				{products.map((product) => (
					<ListItem className={classes.list} key={product.id}>
						<ListItemAvatar>
							{
								<img
									className={classes.image}
									src={
										product.images.length > 0
											? product.images[0].path
											: 'http://unsplash.it/200/200?random&gravity=center'
									}
									alt={'Ordered Product'}
								/>
							}
						</ListItemAvatar>
						<div className={classes.text}>
							<ListItemText primary={product.name} secondary={`サイズ: ${product.size}`} />
							<ListItemText primary={`￥${product.price.toLocaleString()}`} />
						</div>
						<PrimaryButton
							label={'商品詳細を見る'}
							omClick={() => dispatch(goToProductDetail(product.id))}
						/>
					</ListItem>
				))}
			</>
		</List>
	)
}
export default OrderedProducts

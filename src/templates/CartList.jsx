import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import List from '@material-ui/core/List'
import { getProductsInCart } from '../reducks/users/selectors'
import { CartListItem } from '../components/products'
import { PrimaryButton, GreyButton } from '../components/UIkit'
import { useCallback } from 'react'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '0 auto',
		maxWidth: 512,
		width: '100%',
	},
}))

const CartList = (props) => {
	const dispatch = useDispatch()
	const selector = useSelector((state) => state)
	const productsInCart = getProductsInCart(selector)

	const classes = useStyles()

	// methods
	const goToOrder = useCallback(() => {
		dispatch(push('order/confirm'))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const backToHome = useCallback(() => {
		dispatch(push('/'))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<section className='c-section-wrapin'>
			<h2 className='u-text__headline'>ショッピングカート</h2>
			<List className={classes.root}>
				{productsInCart.length > 0 &&
					productsInCart.map((product) => <CartListItem product={product} key={product.cartId} />)}
			</List>
			<div className='module-spacer--medium'></div>
			<div className='p-grid__column'>
				<PrimaryButton label='レジへ進む' onClick={goToOrder} />
				<div className='module-spacer--extra-extra-small'></div>
				<GreyButton label='ショッピングを続ける' onClick={backToHome} />
			</div>
		</section>
	)
}

export default CartList

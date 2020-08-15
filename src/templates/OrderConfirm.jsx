/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from 'react'
import { getProductsInCart } from '../reducks/users/selectors'
import { makeStyles } from '@material-ui/core/styles'
import { CartListItem } from '../components/products'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { PrimaryButton, TextDetail } from '../components/UIkit'
import { useDispatch, useSelector } from 'react-redux'
import { orderProducts } from '../reducks/products/operations'

const useStyles = makeStyles((theme) => ({
	detailBox: {
		margin: '0 auto',
		[theme.breakpoints.down('sm')]: {
			width: 320,
		},
		[theme.breakpoints.up('sm')]: {
			width: 512,
		},
	},
	orderBox: {
		border: '1px solid rgba(0,0,0,0.2)',
		borderRadius: 4,
		margin: '24px auto 16px auto',
		padding: 16,
		width: 288,
	},
}))

const OrderConfirm = () => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const selector = useSelector((state) => state)
	const productsInCart = getProductsInCart(selector)

	//! methods
	// 合計料金
	const subTotal = useMemo(() => {
		return productsInCart.reduce((sum, product) => (sum += product.price), 0)
	}, [productsInCart])

	// 送料
	const shippingFee = useMemo(() => {
		return subTotal >= 10000 ? 0 : 210
	}, [productsInCart])

	// 消費税
	const tax = useMemo(() => {
		return subTotal * 0.1
	}, [productsInCart])

	// 合計(税込) 消費税10%
	const totalWithTax = useMemo(() => {
		return subTotal + tax + shippingFee
	}, [productsInCart])

	const order = useCallback(() => {
		dispatch(orderProducts(productsInCart, totalWithTax))
	}, [productsInCart, totalWithTax])

	return (
		<section className='c-section-wrapin'>
			<h2 className='u-text__headline'>注文の確認</h2>
			<div className='p-grid__row'>
				<div className={classes.detailBox}>
					<List>
						{productsInCart.length > 0 &&
							productsInCart.map((product) => <CartListItem product={product} key={product.cartId} />)}
					</List>
				</div>
				<div className={classes.orderBox}>
					<TextDetail label='商品合計' value={'￥' + subTotal.toLocaleString()} />
					<TextDetail label='消費税' value={'￥' + tax.toLocaleString()} />
					<TextDetail label='送料' value={'￥' + shippingFee.toLocaleString()} />
					<Divider />
					<div className='module-spacer--extra-extra-small'></div>
					<TextDetail label='合計(税込)' value={'￥' + totalWithTax.toLocaleString()} />
					<PrimaryButton label={'注文する'} onClick={() => dispatch(order)} />
				</div>
			</div>
		</section>
	)
}

export default OrderConfirm

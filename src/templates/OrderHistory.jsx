import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/styles'
import { getOrdersHistory } from '../reducks/users/selectors'
import { fetchOrdersHistory } from '../reducks/users/operations'
import { OrdersHistoryItem } from '../components/products'

const useStyles = makeStyles((theme) => ({
	orderList: {
		background: theme.palette.grey['100'],
		margin: '0 auto',
		padding: 32,
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
		[theme.breakpoints.up('md')]: {
			width: 768,
		},
	},
}))

const OrderHistory = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const selector = useSelector((state) => state)
	const orders = getOrdersHistory(selector)

	useEffect(() => {
		dispatch(fetchOrdersHistory())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<section className='c-section-wrapin'>
			<List className={classes.orderList}>
				{orders.length > 0 && orders.map((order) => <OrdersHistoryItem key={order.id} order={order} />)}
			</List>
		</section>
	)
}

export default OrderHistory
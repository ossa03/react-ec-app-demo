import React from 'react'
import Divider from '@material-ui/core/Divider'
import { TextDetail } from '../UIkit'
import { OrderedProducts } from '../../components/products'

const datetimeToString = (date) => {
	return (
		date.getFullYear() +
		'-' +
		('00' + (date.getMonth() + 1)).slice(-2) +
		'-' +
		('00' + date.getDate()).slice(-2) +
		' ' +
		('00' + date.getHours()).slice(-2) +
		':' +
		('00' + date.getMinutes()).slice(-2) +
		':' +
		('00' + date.getSeconds()).slice(-2)
	)
}

const dateToString = (dt) => {
	return dt.getFullYear() + '-' + ('00' + (dt.getMonth() + 1)).slice(-2) + '-' + ('00' + dt.getDate()).slice(-2)
}

const OrdersHistoryItem = (props) => {
	const order = props.order
	const orderedDatetime = datetimeToString(order.updated_at.toDate())
	const shippingDate = dateToString(order.shipping_date.toDate())
	const price = `￥${order.amount.toLocaleString()}`

	return (
		<div>
			<div className='module-spacer--small'></div>
			<div>
				<TextDetail label={'注文ID'} value={order.id} />
				<TextDetail label={'注文日時'} value={orderedDatetime} />
				<TextDetail label={'発送予定日'} value={shippingDate} />
				<TextDetail label={'注文金額'} value={price} />

				<div className='module-spacer--extra-extra-small'></div>
				<OrderedProducts products={order.products} />
				<div className='module-spacer--extra-extra-small'></div>
				<Divider />
			</div>
		</div>
	)
}

export default OrdersHistoryItem

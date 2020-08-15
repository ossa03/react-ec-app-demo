import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserId, getHistory } from '../reducks/users/selectors'

const OrderComplete = () => {
	const selector = useSelector((state) => state)
	const uid = getUserId(selector)
	const histories = getHistory(selector) // Array

	const [history, setHistory] = useState([])

	useEffect(() => {
		const lastHistory = histories[histories.length - 1]
		setHistory(lastHistory)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='c-section-container'>
			<h2 className='u-text__headline u-text-center'>注文完了画面</h2>
			<p className='u-text-center'>ご注文ありがとうございました</p>
		</div>
	)
}
export default OrderComplete

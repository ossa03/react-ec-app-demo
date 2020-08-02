import React from 'react'
import { getUserId, getUsername } from '../reducks/users/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { resetPassword } from '../reducks/users/operations'

const Home = () => {
	const dispatch = useDispatch()
	const selector = useSelector((state) => state)
	const uid = getUserId(selector)
	const username = getUsername(selector)

	return (
		<div>
			<h2>Home</h2>
			<h2>ユーザーID:{uid}</h2>
			<h2>ユーザー名:{username}</h2>
			<button onClick={() => dispatch(resetPassword())}>SIGN_OUT</button>
		</div>
	)
}

export default Home

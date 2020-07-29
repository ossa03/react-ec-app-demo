import React from 'react'
import { getUserId, getUsername } from '../reducks/users/selectors'
import { useSelector } from 'react-redux'

const Home = () => {
	const selector = useSelector((state) => state)
	const uid = getUserId(selector)
	const username = getUsername(selector)
	console.log(selector.users)

	return (
		<div>
			<h2>Home</h2>
			<h2>ユーザーID:{uid}</h2>
			<h2>ユーザー名:{username}</h2>
		</div>
	)
}

export default Home

import React, { useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/Menu'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsInCart, getUserId } from '../../reducks/users/selectors'
import { db } from '../../firebase'
import { fetchProductsInCart } from '../../reducks/users/operations'

const HeaderMenus = (props) => {
	const dispatch = useDispatch()
	const selector = useSelector((state) => state)
	const uid = getUserId(selector)
	const productsInCart = getProductsInCart(selector)

	useEffect(() => {
		const unsubscribe = db
			.collection('users')
			.doc(uid)
			.collection('cart')
			.onSnapshot((snapshots) => {
				snapshots.docChanges().forEach((changedSnapshot) => {
					const product = changedSnapshot.doc.data()
					const changeType = changedSnapshot.type

					switch (changeType) {
						// 新規追加されたら
						case 'added':
							productsInCart.push(product)
							break
						// 変更があったら
						case 'modified':
							const index = productsInCart.findIndex((product) => product.id === changedSnapshot.doc.id)
							productsInCart[index] = product
							break
						// 削除されたら
						case 'removed':
							productsInCart.filter((product) => product.id !== changedSnapshot.doc.id)
							break
						default:
							break
					}
				})

				dispatch(fetchProductsInCart(productsInCart))
			})
		return () => {
			unsubscribe()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<IconButton>
				<Badge badgeContent={productsInCart.length} color='secondary'>
					<ShoppingCartIcon />
				</Badge>
			</IconButton>
			<IconButton>
				<FavoriteBorder />
			</IconButton>
			<IconButton onClick={(event) => props.handleDrawerToggle(event)}>
				<MenuIcon />
			</IconButton>
		</>
	)
}

export default HeaderMenus

import React, { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { db, FirebaseTimestamp } from '../firebase'
import { makeStyles } from '@material-ui/core/styles'
import HtmlReactParser from 'html-react-parser'
import ImageSwiper from '../components/products/ImageSwiper'
import { SizeTable } from '../components/products'
import { addProductToCart } from '../reducks/users/operations'

const useStyles = makeStyles((theme) => ({
	sliderBox: {
		[theme.breakpoints.down('sm')]: {
			margin: '0 auto 24px auto',
			height: 320,
			width: 320,
		},
		[theme.breakpoints.up('sm')]: {
			margin: '0 auto',
			height: 400,
			width: 400,
		},
	},
	detail: {
		textAlign: 'left',
		[theme.breakpoints.down('sm')]: {
			margin: '0 auto 16px auto',
			height: 320,
			width: 320,
		},
		[theme.breakpoints.up('sm')]: {
			margin: '0 auto',
			height: 'auto',
			width: 400,
		},
	},
	price: {
		fontSize: 36,
	},
}))

const ProductDetail = () => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const selector = useSelector((state) => state)
	const path = selector.router.location.pathname
	const id = path.split('/product/')[1]

	console.log({ id })

	// state
	const [product, setProduct] = useState(null)

	// ? idは次のコードではダメか？
	// 	let id = window.location.pathname.split('product/edit')[1]
	// if (id !== '') {
	// 	id = id.split('/')[1]
	// }

	useEffect(() => {
		db.collection('products')
			.doc(id)
			.get()
			.then((doc) => {
				const data = doc.data()
				setProduct(data)
			})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const returnToCodeBr = (text) => {
		if (text === '') return text
		return HtmlReactParser(text.replace('/\r?\n/g', '<br>'))
	}

	const addProduct = useCallback(
		(selectedSize) => {
			const timestamp = FirebaseTimestamp.now()
			dispatch(
				addProductToCart({
					added_at: timestamp,
					description: product.description,
					gender: product.gender,
					images: product.images,
					name: product.name,
					price: product.price,
					productId: product.id,
					quantity: 1,
					size: selectedSize,
				}),
			)
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[product],
	)

	return (
		<section className='c-section-wrapin'>
			{product && (
				<div className='p-grid__row'>
					<div className={classes.sliderBox}>
						<ImageSwiper images={product.images} />
					</div>
					<div className={classes.detail}>
						<h2 className='u-text__headline'>{product.name}</h2>
						<p className={classes.price}>￥{product.price.toLocaleString()}</p>
						<div className='module-spacer--small'></div>
						<SizeTable sizes={product.sizes} addProduct={addProduct} />
						<div className='module-spacer--small'></div>
						<p>{returnToCodeBr(product.description)}</p>
					</div>
				</div>
			)}
		</section>
	)
}

export default ProductDetail

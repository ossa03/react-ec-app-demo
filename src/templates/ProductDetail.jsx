import React, { useEffect, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../firebase'
import { makeStyles } from '@material-ui/core/styles'
import HtmlReactParser from 'html-react-parser'

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
	const classes = useStyles()
	const selector = useSelector((state) => state)
	const path = selector.router.location.pathname
	const id = path.split('/product/')[1]

	console.log({ id })

	// state
	const [product, setProduct] = useState(null)

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

				console.log({ data })
			})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const returnToCodeBr = (text) => {
		if (text === '') return text
		return HtmlReactParser(text.replace('/\r?\n/g', '<br>'))
	}

	return (
		<section className='c-section-wrapin'>
			{product && (
				<div className='p-grid__row'>
					<div className={classes.sliderBox}></div>
					<div className={classes.detail}>
						<h2 className='u-text__headline'>{product.name}</h2>
						<p className={classes.price}>￥{product.price.toLocaleString()}</p>
						<div className='module-spacer--small'></div>
						<div className='module-spacer--small'></div>
						<p>{returnToCodeBr(product.description)}</p>
					</div>
				</div>
			)}
		</section>
	)
}

export default ProductDetail

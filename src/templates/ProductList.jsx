import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../reducks/products/operations'
import { getProducts } from '../reducks/products/selectors'
import { ProductCard } from '../components/products'

const ProductList = () => {
	const dispatch = useDispatch()
	const selector = useSelector((state) => state)
	const products = getProducts(selector)

	useEffect(() => {
		dispatch(fetchProducts())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<section className='c-section-wrapin'>
			<div className='p-grid__row'>
				{products.length > 0 &&
					products.map((product) => (
						<ProductCard
							key={product.id}
							id={product.id}
							images={product.images}
							name={product.name}
							price={product.price}
						/>
					))}
			</div>
		</section>
	)
}

export default ProductList

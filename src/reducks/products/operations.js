import { FirebaseTimestamp, db } from '../../firebase'
import { fetchProductsAction, deleteProductAction } from './actions'

const productRef = db.collection('products')

export const deleteProduct = (id) => {
	return async (dispatch, getState) => {
		productRef
			.doc(id)
			.delete()
			.then(() => {
				const prevProducts = getState().products.list
				const nextProducts = prevProducts.filter((product) => product.id !== id)
				dispatch(deleteProductAction(nextProducts))
			})
	}
}

export const fetchProducts = () => {
	return async (dispatch) => {
		productRef
			.orderBy('updated_at', 'desc')
			.get()
			.then((snapshots) => {
				const productList = []
				snapshots.forEach((snapshot) => {
					const product = snapshot.data()
					productList.push(product)
				})

				dispatch(fetchProductsAction(productList))
			})
	}
}

export const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
	return async (dispatch) => {
		const timestamp = FirebaseTimestamp.now()

		const data = {
			category,
			description,
			gender,
			images,
			name,
			price: parseInt(price, 10),
			sizes,
			updated_at: timestamp,
		}

		// 編集ページでないときは新規作成する
		if (id === '') {
			const ref = productRef.doc()
			id = ref.id
			data.id = id
			data.created_at = timestamp
		}

		return productRef
			.doc(id)
			.set(data, { merge: true })
			.then(() => {
				// dispatch(push('/'))
				console.log('商品を登録したよ')
			})
			.catch((error) => {
				throw new Error(error)
			})
	}
}

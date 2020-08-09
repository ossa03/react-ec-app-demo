import React, { useState, useCallback, useEffect } from 'react'
import { TextInput, PrimaryButton, SelectBox } from '../components/UIkit'
import { ImageArea, SetSizeImageArea } from '../components/products'
import { useDispatch } from 'react-redux'
import { saveProduct } from '../reducks/products/operations'
import { db } from '../firebase/index'

const ProductEdit = () => {
	const dispatch = useDispatch()

	let id = window.location.pathname.split('product/edit')[1]
	if (id !== '') {
		id = id.split('/')[1]
	}

	// state
	const [category, setCategory] = useState('')
	const [description, setDescription] = useState('')
	const [gender, setGender] = useState('')
	const [images, setImages] = useState([])
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [sizes, setSizes] = useState([])

	const inputName = useCallback((event) => setName(event.target.value), [setName])
	const inputDescription = useCallback((event) => setDescription(event.target.value), [setDescription])
	const inputPrice = useCallback((event) => setPrice(event.target.value), [setPrice])

	const categories = [
		{ id: 'tops', name: 'トップス' },
		{ id: 'shirt', name: 'シャツ' },
		{ id: 'pants', name: 'パンツ' },
	]
	const genders = [
		{ id: 'male', name: '男性' },
		{ id: 'female', name: '女性' },
		{ id: 'other', name: 'その他' },
	]

	useEffect(() => {
		if (id !== '') {
			db.collection('products')
				.doc(id)
				.get()
				.then((snapshot) => {
					const data = snapshot.data()
					setCategory(data.category)
					setDescription(data.description)
					setGender(data.gender)
					setImages(data.images)
					setName(data.name)
					setPrice(data.price)
				})
		}
	}, [id])

	return (
		<div className='c-section-container'>
			<h2 className='u-text__headline u-text-center'>商品登録・編集</h2>

			<div className='module-spacer--medium'></div>

			<ImageArea images={images} setImages={setImages} />
			<TextInput
				fullWidth={true}
				label={'商品名'}
				margin={'dense'}
				multiline={false}
				required={true}
				rows={1}
				value={name}
				type={'text'}
				onChange={inputName}
			/>
			<TextInput
				fullWidth={true}
				label={'商品説明'}
				margin={'dense'}
				multiline={true}
				required={true}
				rows={5}
				value={description}
				type={'text'}
				onChange={inputDescription}
			/>
			<SelectBox
				label={'カテゴリー'}
				required={true}
				value={category}
				select={setCategory}
				options={categories}
			></SelectBox>
			<SelectBox label={'性別'} required={true} value={gender} select={setGender} options={genders}></SelectBox>
			<TextInput
				fullWidth={true}
				label={'価格'}
				margin={'dense'}
				multiline={false}
				required={true}
				rows={1}
				value={price}
				type={'number'}
				onChange={inputPrice}
			/>

			<div className={'module-spacer--medium'}></div>

			<SetSizeImageArea sizes={sizes} setSizes={setSizes} />

			<div className={'module-spacer--medium'}></div>

			<div className={'center'}>
				<PrimaryButton
					label={'商品情報を保存'}
					onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images, sizes))}
				/>
				<div className={'module-spacer--medium'}></div>
			</div>
		</div>
	)
}

export default ProductEdit

import React, { useCallback } from 'react'
import { IconButton } from '@material-ui/core'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import { makeStyles } from '@material-ui/styles'
import { storage } from '../../firebase/index'
import { ImagePreview } from '../products'

const useStyle = makeStyles({
	icon: {
		width: 48,
		height: 48,
		cursor: 'pointer',
	},
})

const ImageArea = (props) => {
	const { images, setImages } = props
	const classes = useStyle()

	const deleteImage = useCallback(
		(id) => {
			const ret = window.confirm('この画像を削除しますか？')
			if (!ret) return false
			const newImages = images.filter((image) => image.id !== id)
			setImages(newImages)
			return storage.ref('images').child(id).delete()
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[images],
	)

	const uploadImage = useCallback(
		async (event) => {
			const file = event.target.files
			let blob = new Blob(file, { type: 'image/jpeg' })

			// Generate random 16 digits strings
			const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
			const N = 16
			const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
				.map((n) => S[n % S.length])
				.join('')

			// CloudStorageへ画像をアップロード
			const uploadRef = storage.ref('images').child(fileName)
			const uploadTask = uploadRef.put(blob)
			uploadTask.then(() => {
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const newImage = { id: fileName, path: downloadURL }
					props.setImages((prevState) => [...prevState, newImage])
				})
			})
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setImages],
	)

	return (
		<div>
			<div className='p-grid__list-images'>
				{images.length > 0 &&
					images.map((image) => (
						<ImagePreview delete={deleteImage} key={image.id} id={image.id} path={image.path} />
					))}
			</div>
			<div className='u-text-right'>
				<span>商品画像を登録する</span>
				<IconButton className={classes.icon}>
					<label>
						<AddPhotoAlternateIcon />
						<input
							className='u-display-none'
							type='file'
							id='image'
							onChange={(event) => uploadImage(event)}
						></input>
					</label>
				</IconButton>
			</div>
		</div>
	)
}

export default ImageArea

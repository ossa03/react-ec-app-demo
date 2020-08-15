import React, { useState, useCallback, useEffect } from 'react'
import { TableContainer, Paper, TableCell, TableHead, TableBody, TableRow, IconButton, Table } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/styles'
import { TextInput } from '../UIkit'

const useStyles = makeStyles({
	checkIcon: {
		float: 'right',
	},
	iconCell: {
		width: 48,
		height: 48,
	},
	selectBox: {
		display: 'inline',
	},
})
const SetSizeImageArea = (props) => {
	const classes = useStyles()

	// state
	const [index, setIndex] = useState(0)
	const [size, setSize] = useState('')
	const [quantity, setQuantity] = useState(0)

	const inputSize = useCallback(
		(event) => {
			const size = event.target.value
			setSize(size)
		},
		[setSize],
	)

	const inputQuantity = useCallback(
		(event) => {
			const quantity = event.target.value
			setQuantity(quantity)
		},
		[setQuantity],
	)

	const addSize = (index, size, quantity) => {
		if (size === '' || quantity === '') return false

		// 新規追加
		if (index === props.sizes.length) {
			props.setSizes((prevState) => [...prevState, { size, quantity }])
			setIndex(index + 1)
			setSize('')
			setQuantity(0)
		} else {
			// 編集
			const newSizes = props.sizes
			newSizes[index] = { size, quantity }
			props.setSizes(newSizes)
			setIndex(newSizes.length)
			setSize('')
			setQuantity(0)
		}
	}

	const editSize = (index, size, quantity) => {
		setIndex(index)
		setSize(size)
		setQuantity(quantity)
	}

	const deleteSize = (deleteIndex) => {
		const newSizes = props.sizes.filter((item, i) => i !== deleteIndex)
		props.setSizes(newSizes)
	}

	useEffect(() => {
		setIndex(props.sizes.length)
	}, [props.sizes.length])

	return (
		<div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>サイズ</TableCell>
							<TableCell>数量</TableCell>
							<TableCell className={classes.iconCell} />
							<TableCell className={classes.iconCell} />
						</TableRow>
					</TableHead>
					<TableBody>
						{props.sizes.length > 0 &&
							props.sizes.map((item, i) => (
								<TableRow key={item.size}>
									<TableCell>{item.size}</TableCell>
									<TableCell>{item.quantity}</TableCell>
									<TableCell>
										<IconButton
											className={classes.iconCell}
											onClick={() => editSize(i, item.size, item.quantity)}
										>
											<EditIcon />
										</IconButton>
									</TableCell>
									<TableCell>
										<IconButton className={classes.iconCell} onClick={() => deleteSize(i)}>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				<div>
					<TextInput
						fullWidth={false}
						label={'サイズ'}
						margin={'dense'}
						multiline={false}
						required={true}
						rows={1}
						value={size}
						type='text'
						onChange={inputSize}
					/>
					<TextInput
						fullWidth={false}
						label={'数量'}
						margin={'dense'}
						multiline={false}
						required={true}
						rows={1}
						value={quantity}
						type='number'
						onChange={inputQuantity}
					/>
				</div>
				<IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
					<CheckCircleIcon />
				</IconButton>
			</TableContainer>
		</div>
	)
}

export default SetSizeImageArea

import React from 'react'
import { TableContainer, TableCell, TableBody, TableRow, IconButton, Table } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

const useStyles = makeStyles({
	iconCell: {
		height: 48,
		width: 48,
		padding: 0,
	},
})

const SizeTable = (props) => {
	const classes = useStyles()
	const sizes = props.sizes

	return (
		<TableContainer>
			<Table area-label='simple table'>
				<TableBody>
					{sizes.length > 0 &&
						sizes.map((size) => (
							<TableRow key={size.size}>
								<TableCell component='th' scope='row'>
									{size.size}
								</TableCell>
								<TableCell>残り {size.quantity}点</TableCell>
								<TableCell className={classes.iconCell}>
									{size.quantity > 0 ? (
										<IconButton onClick={() => props.addProduct(size.size)}>
											<ShoppingCartIcon />
										</IconButton>
									) : (
										<p>売切</p>
									)}
								</TableCell>
								<TableCell className={classes.iconCell}>
									<IconButton>
										<FavoriteBorderIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default SizeTable

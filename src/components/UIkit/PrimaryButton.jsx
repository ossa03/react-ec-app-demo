import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	button: {
		backgroundColor: '#4dd0e1',
		color: '#fff',
		fontSize: 16,
		height: 48,
		marginBottom: 16,
		width: 256,
	},
})

const PrimaryButton = (props) => {
	const classes = useStyles()

	return (
		<Button className={classes.button} valiant={'contained'} onClick={() => props.onClick()}>
			{props.label}
		</Button>
	)
}

export default PrimaryButton

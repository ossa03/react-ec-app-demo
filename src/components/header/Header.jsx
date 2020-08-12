import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import logo from '../../assets/image/src/logo.png'

import { getIsSignedIn } from '../../reducks/users/selectors'
import { HeaderMenus, ClosableDrawer } from './index'

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	menuBar: {
		backgroundColor: '#fff',
		color: '#444',
	},
	toolBar: {
		margin: '0 auto',
		width: '100%',
		maxWidth: 1024,
	},
	iconButtons: {
		margin: '0 0 0 auto',
	},
})

const Header = () => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const selector = useSelector((state) => state)
	const isSignedIn = getIsSignedIn(selector)

	// state
	const [open, setOpen] = useState(false)

	const handleDrawerToggle = useCallback(
		(event) => {
			if ((event.type === 'keydown' && event.key === 'Tab') || event.key === 'Shift') return
			setOpen(!open)
		},
		[open, setOpen],
	)

	return (
		<div className={classes.root}>
			<AppBar position='fixed' className={classes.menuBar}>
				<Toolbar className={classes.toolBar}>
					<img src={logo} alt='logo' width='55px' onClick={() => dispatch(push('/'))} />
					{isSignedIn && (
						<div className={classes.iconButtons}>
							<HeaderMenus handleDrawerToggle={handleDrawerToggle} />
						</div>
					)}
				</Toolbar>
			</AppBar>
			<ClosableDrawer open={open} onClose={handleDrawerToggle} />
		</div>
	)
}

export default Header

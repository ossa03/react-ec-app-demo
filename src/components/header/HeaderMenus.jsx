import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/Menu'

const HeaderMenus = (props) => {
	return (
		<>
			<IconButton>
				<Badge badgeContent={4} color='secondary'>
					<ShoppingCartIcon />
				</Badge>
			</IconButton>
			<IconButton>
				<FavoriteBorder />
			</IconButton>
			<IconButton onClick={(event) => props.handleDrawerToggle(event)}>
				<MenuIcon />
			</IconButton>
		</>
	)
}

export default HeaderMenus

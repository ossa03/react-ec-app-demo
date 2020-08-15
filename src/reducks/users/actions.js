export const ORDERED_HISTORY = 'ORDERED_HISTORY'
export const fetchOrderedHistory = (history) => {
	return {
		type: 'ORDERED_HISTORY',
		payload: history,
	}
}

export const FETCH_PRODUCTS_IN_CART = 'FETCH_PRODUCTS_IN_CART'
export const fetchProductsInCartAction = (productsInCart) => {
	return {
		type: 'FETCH_PRODUCTS_IN_CART',
		payload: productsInCart,
	}
}

export const SIGN_IN = 'SIGN_IN'
export const signInAction = (userState) => {
	return {
		type: 'SIGN_IN',
		payload: {
			isSignedIn: true,
			role: userState.role,
			uid: userState.uid,
			username: userState.username,
		},
	}
}

export const SIGN_OUT = 'SIGN_OUT'
export const signOutAction = () => {
	return {
		type: 'SIGN_OUT',
		payload: {
			isSingedIn: false,
			role: '',
			uid: '',
			username: '',
		},
	}
}

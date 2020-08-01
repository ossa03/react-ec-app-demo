export const SIGN_IN = 'SIGN_IN'
export const signInActions = (userState) => {
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
export const signOutActions = () => {
	return {
		type: 'SIGN_OUT',
		payload: {
			isSingedIn: false,
			uid: '',
			username: '',
		},
	}
}

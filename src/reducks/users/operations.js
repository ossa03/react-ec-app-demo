import { push } from 'connected-react-router'
import { signInActions } from './actions'

export const signIn = () => {
	return async (dispatch, getState) => {
		const state = getState()
		const isSignedIn = state.users.isSignedIn

		if (!isSignedIn) {
			const url = 'https://api.github.com/users/ossa03'
			const response = await fetch(url)
				.then((res) => res.json())
				.catch(() => null)

			const username = response.login

			dispatch(
				signInActions({
					isSignedIn: true,
					uid: '0123456789',
					username: username,
				}),
			)
			dispatch(push('/'))
		}
	}
}

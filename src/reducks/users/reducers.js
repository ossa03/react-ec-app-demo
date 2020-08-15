import * as Actions from './actions'
import initialState from '../store/initialState'

export const UsersReducer = (state = initialState.users, action) => {
	switch (action.type) {
		case Actions.ORDERED_HISTORY:
			return {
				...state,
				history: [...action.payload],
			}
		case Actions.FETCH_PRODUCTS_IN_CART:
			return {
				...state,
				cart: [...action.payload],
			}
		case Actions.SIGN_IN:
			return {
				...state,
				...action.payload,
			}
		case Actions.SIGN_OUT:
			return {
				...action.payload,
			}
		default:
			return state
	}
}

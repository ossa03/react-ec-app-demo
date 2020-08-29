import { createSelector } from 'reselect'

const usersSelector = (state) => state.users

export const getIsSignedIn = createSelector([usersSelector], (state) => state.isSignedIn) // Boolean

export const getProductsInCart = createSelector([usersSelector], (state) => state.cart) // Array

export const getOrdersHistory = createSelector([usersSelector], (state) => state.orders) // Array

export const getUserId = createSelector([usersSelector], (state) => state.uid) // uid

export const getUsername = createSelector([usersSelector], (state) => state.username) // username

import { createSelector } from 'reselect'

const usersSelector = (state) => state.users

export const getIsSignedIn = createSelector([usersSelector], (state) => state.isSignedIn) // Boolean

export const getProductsInCart = createSelector([usersSelector], (state) => state.cart) // Array

export const getHistory = createSelector([usersSelector], (state) => state.history) // Array

export const getUserId = createSelector([usersSelector], (state) => state.uid) // uid

export const getUsername = createSelector([usersSelector], (state) => state.username) // username

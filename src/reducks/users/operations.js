import { push } from 'connected-react-router'
// import { signInActions } from './actions'
import { auth, FirebaseTimestamp, db } from '../../firebase'
import { signInActions } from './actions'

export const signIn = (email, password) => {
	return async (dispatch) => {
		// Validation
		if (email === '' || password === '') {
			window.alert('必須項目が入力されていません')
			return false
		}

		// firebase-authへアクセス
		const response = await auth.signInWithEmailAndPassword(email, password)
		const user = response.user

		// Home画面へリダイレクト
		if (user) {
			const uid = user.uid

			const snapshot = await db.collection('users').doc(uid).get()
			const data = snapshot.data()

			dispatch(
				signInActions({
					isSignedIn: true,
					role: data.role,
					uid: uid,
					username: data.username,
				}),
			)

			dispatch(push('/'))
		}
	}
}

export const signUp = (username, email, password, confirmPassword) => {
	return async (dispatch) => {
		// Validation
		if (username === '' || email === '' || password === '' || confirmPassword === '') {
			window.alert('必須項目が未入力です')
			return false
		}
		if (password !== confirmPassword) {
			window.alert('パスワードが一致しません。もう一度お試しください')
			return false
		}

		// firebase-authへアクセス
		const response = await auth.createUserWithEmailAndPassword(email, password)
		const user = response.user

		if (user) {
			const uid = user.uid
			const timestamp = FirebaseTimestamp.now()

			const userInitialData = {
				created_at: timestamp,
				email: email,
				uid: uid,
				role: 'costomer',
				updated_at: timestamp,
				username: username,
			}

			// databaseへユーザー情報を登録
			await db.collection('users').doc(uid).set(userInitialData)

			// Home画面へリダイレクト
			dispatch(push('/'))
		}
	}
}

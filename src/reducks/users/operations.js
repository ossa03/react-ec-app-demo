import { push } from 'connected-react-router'
import { auth, FirebaseTimestamp, db } from '../../firebase'
import { signInActions, signOutActions } from './actions'

export const addProductToCart = (addedProduct) => {
	return async (dispatch, getState) => {
		const uid = getState().users.uid
		const cartRef = db.collection('users').doc(uid).collection('cart').doc()
		addedProduct['cartId'] = cartRef.id
		await cartRef.set(addedProduct)
		dispatch(push('/'))
	}
}

const getUserInfoObj = async (user) => {
	const uid = user.uid

	const snapshot = await db.collection('users').doc(uid).get()
	const data = snapshot.data()

	const userInfo = {
		isSignedIn: true,
		role: data.role,
		uid,
		username: data.username,
	}

	return userInfo
}

export const listenAuthState = () => {
	return async (dispatch) => {
		return auth.onAuthStateChanged(async (user) => {
			if (user) {
				const userInfo = await getUserInfoObj(user)

				dispatch(signInActions(userInfo))
			} else {
				dispatch(push('signin'))
			}
		})
	}
}

export const resetPassword = (email) => {
	return async (dispatch) => {
		if (email === '') {
			window.alert('メールアドレスが未入力です')
		} else {
			try {
				await auth.sendPasswordResetEmail(email)
				window.alert('入力されたメールアドレスへパスワードリセット用のメールを送信しました')
				dispatch(push('/'))
			} catch (error) {
				window.alert('パスワードリセットに失敗しました。通信状況を確認して再度お試しください')
				console.error({ error })
			}
		}
	}
}

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

		if (user) {
			const userInfo = await getUserInfoObj(user)

			dispatch(signInActions(userInfo))
			// Home画面へリダイレクト
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

export const signOut = () => {
	return async (dispatch) => {
		const ref = window.confirm('ログアウトしますか？')

		if (!ref) return

		// firebase-authからサインアウト
		await auth.signOut()
		// store初期化
		dispatch(signOutActions())
		// サインイン画面へ遷移
		dispatch(push('/signin'))
	}
}

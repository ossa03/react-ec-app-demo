import React, { useState, useCallback } from 'react'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { signUp } from '../reducks/users/operations'
import { useDispatch } from 'react-redux'

const SignUp = () => {
	const dispatch = useDispatch()

	// state
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const inputUsername = useCallback(
		(event) => {
			setUsername(event.target.value)
		},
		[setUsername],
	)
	const inputEmail = useCallback(
		(event) => {
			setEmail(event.target.value)
		},
		[setEmail],
	)
	const inputPassword = useCallback(
		(event) => {
			setPassword(event.target.value)
		},
		[setPassword],
	)
	const inputConfirmPassword = useCallback(
		(event) => {
			setConfirmPassword(event.target.value)
		},
		[setConfirmPassword],
	)

	return (
		<div className='c-section-container'>
			<h2 className='u-text__headline u-text-center'>アカウント登録</h2>

			<div className='module-spacer--medium'></div>

			<TextInput
				fullWidth={true}
				label={'ユーザー名'}
				margin={'dense'}
				multiline={false}
				required={true}
				rows={1}
				value={username}
				type={'text'}
				onChange={inputUsername}
			/>
			<TextInput
				fullWidth={true}
				label={'メールアドレス'}
				margin={'dense'}
				multiline={false}
				required={true}
				rows={1}
				value={email}
				type={'email'}
				onChange={inputEmail}
			/>
			<TextInput
				fullWidth={true}
				label={'パスワード'}
				margin={'dense'}
				multiline={false}
				required={true}
				rows={1}
				value={password}
				type={'password'}
				onChange={inputPassword}
			/>
			<TextInput
				fullWidth={true}
				label={'パスワード（再確認）'}
				margin={'dense'}
				multiline={false}
				required={true}
				rows={1}
				value={confirmPassword}
				type={'password'}
				onChange={inputConfirmPassword}
			/>

			<div className={'module-spacer--medium'}></div>

			<div className={'center'}>
				<PrimaryButton
					label={'登録する'}
					onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
				/>
			</div>
		</div>
	)
}

export default SignUp

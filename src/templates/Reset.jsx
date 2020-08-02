import React, { useState, useCallback } from 'react'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { resetPassword } from '../reducks/users/operations'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

const Reset = () => {
	const dispatch = useDispatch()

	// state
	const [email, setEmail] = useState('')

	const inputEmail = useCallback(
		(event) => {
			setEmail(event.target.value)
		},
		[setEmail],
	)

	return (
		<div className='c-section-container'>
			<h2 className='u-text__headline u-text-center'>パスワードのリセット</h2>

			<div className='module-spacer--medium'></div>

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

			<div className={'module-spacer--medium'}></div>

			<div className={'center'}>
				<PrimaryButton label={'リセットする'} onClick={() => dispatch(resetPassword(email))} />
				<p onClick={() => dispatch(push('/'))}>ログイン画面に戻る</p>
			</div>
		</div>
	)
}

export default Reset

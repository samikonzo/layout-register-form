import React from 'react'
import Input from './Input.jsx'
import checkValue from './checkValue'
import './styles/RegisterForm.less'


class RegisterForm extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			notes : {
				username: '',
				email: 'We don\'t send spam to our users. (available only mail with "admin")',
				email2: 'Spare mail',
				password: 'Password must be at least 6 characters long',
				notRequired: '',
			}
		}

		this._formSubmit = this._formSubmit.bind(this)
		this._checkUsername = this._checkUsername.bind(this)
		this._checkEmail = this._checkEmail.bind(this)
		this._checkPassword = this._checkPassword.bind(this)
		this._checkNotRequired = this._checkNotRequired.bind(this)
	}

	_formSubmit(e){
		e.preventDefault()
	}

	_checkUsername(value){
		var checkOptions = {
			min: 4,
			max: 10,
			name: 'username',
		}

		var checkResult = checkValue(value, checkOptions)

		return checkResult
	}

	_checkEmail(value){
		var checkOptions = {
			regExp : /^\w+@\w+\.\w{2,3}$/,
			name: 'email',
		}

		var checkResult = checkValue(value, checkOptions)

		if(checkResult.result){
			return new Promise( (resolve, reject) => {
				// servercheck emulation
				if(value.includes('admin')){
					setTimeout(() => {
						resolve('true')
					}, 1000)
				} else {
					setTimeout(() => {
						reject('unavailable email')
					}, 1000)
				}
			})
		} else {
			return checkResult
		}
	}

	_checkPassword(value){
		return checkValue(value, {min: 6})
	}

	_checkNotRequired(value){
		return true
	}


	render(){
		return(
			<div className="RegisterForm">
				<form action="/" method="post" onSubmit={this._formSubmit} className="RegisterForm_form">
					<input type='hidden' value='something'/>
					
					<header className="RegisterForm_header"> Sign Up </header>

					<main className="RegisterForm_main"> 
						<Input 
							className="username" 
							name="Name"
							required="true"
							checkFunction={this._checkUsername}
							note={this.state.notes.username}
						/>

						<Input 
							className="email" 
							name="Email"
							required="true"
							checkFunction={this._checkEmail}
							note={this.state.notes.email}
						/>

						{/*<Input 
							className="email emailSecond" 
							name="Email #2"
							required="false"
							note={this.state.notes.email2}
						/>*/}

						<Input 
							className="password" 
							name="Password"
							required="true"
							type="password" 
							checkFunction={this._checkPassword}
							note={this.state.notes.password}
						/>

						{/*<Input
							className="notRequired"
							name="Not Required"
							checkFunction={this._checkNotRequired}
							note={this.state.notes.notRequired}
						/>*/}

						<p className="RegisterForm_note">
							<span className='requiredAsterisk'></span> Required fields
						</p>

						<input 
							className="RegisterForm_submit"
							type="submit"
							value="Sign Up"
						/>
					</main>

					<footer className="RegisterForm_footer">
						Already have an account? 
						<span>
							<a href="#"> Log in to your account</a>
						</span>
					</footer>
				</form>
			</div>
		)
	}

}

export default RegisterForm
import React from 'react'
import Input from './Input.jsx'
import './styles/RegisterForm.less'


class RegisterForm extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			notes : {
				username: '',
				email: '',
				password: '',
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

	_checkUsername(){}
	_checkEmail(){}
	_checkPassword(){}
	_checkNotRequired(){}

	render(){
		return(
			<div className="RegisterForm">

				<form action="/" method="post" onSubmit={this._formSubmit} className="RegisterForm_form">
					
					<header className="RegisterForm_header"> Sign Up </header>

					<Input 
						className="RegisterForm_input-username" 
						name="Name"
						required="true"
						checkFunction={this._checkUsername}
						note={this.state.notes.username}
					/>

					<Input 
						className="RegisterForm_input-email" 
						name="Email"
						required="true"
						checkFunction={this._checkEmail}
						note={this.state.notes.email}
					/>

					<Input 
						className="RegisterForm_input-password" 
						name="Password"
						required="true"
						type="password" 
						checkFunction={this._checkPassword}
						note={this.state.notes.password}
					/>

					<Input
						className="RegisterForm_input-notRequired"
						name="Not Required"
						checkFunction={this._checkNotRequired}
						note={this.state.notes.notRequired}
					/>

					<p className="RegisterForm_note">
						<span> * </span> Required fields
					</p>

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
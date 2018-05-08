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
			},
			submitLoading: false,
			promiseArr: [],

		}

		this._formSubmit = this._formSubmit.bind(this)
		this._checkUsername = this._checkUsername.bind(this)
		this._checkEmail = this._checkEmail.bind(this)
		this._checkPassword = this._checkPassword.bind(this)
		this._checkNotRequired = this._checkNotRequired.bind(this)
	}

	_formSubmit(e){
		e && e.preventDefault() && e.persist()


		if(this.state.submitLoading) return

		this.setState({
			submitLoading: true,
		})

		let formValidate = false
		let inputs = e.target.elements
		let requiredInputs = [].filter.call(inputs, input => input.dataset.required == 'true')
		formValidate = requiredInputs.every(input => input.dataset.validate == 'true')
		
		if(!formValidate){
			let checkEvent = new CustomEvent('check',{bubbles: false})

			// need to wait for off loading
			requiredInputs.forEach(input => {input.dispatchEvent(checkEvent)})

			Promise.all(this.state.promiseArr).then(() => {
				this.setState({
					submitLoading: false
				}, () => {
					this.submitBtn.click()
				})
			})

			return
		} 

		l(' SUBMIT! ')
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
				l('send to server...waiting...')
				// servercheck emulation
				if(value.includes('admin')){
					setTimeout(() => {
						l('good email')
						resolve({result: true})
					}, 1000)
				} else {


					setTimeout(() => {
						l('bad email')
						reject({result: false, error: 'only email with "admin" works'})
					}, 2000)
				}
			})
		} else {
			l('bad email, no servercheck')
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

		let submitClassName = 'RegisterForm_submit '
		if(this.state.submitLoading) submitClassName += 'RegisterForm_submit--loading '

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
							promiseArr={this.state.promiseArr}
						/>

						<Input 
							className="email" 
							name="Email"
							required="true"
							checkFunction={this._checkEmail}
							note={this.state.notes.email}
							promiseArr={this.state.promiseArr}
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
							promiseArr={this.state.promiseArr}
						/>

						<Input
							className="notRequired"
							name="Not Required"
							checkFunction={this._checkNotRequired}
							note={this.state.notes.notRequired}
							promiseArr={this.state.promiseArr}
						/>

						<p className="RegisterForm_note">
							<span className='requiredAsterisk'></span> Required fields
						</p>

						<label className={submitClassName}> 
							<input 
								className="RegisterForm_submit-btn"
								type="submit"
								value="Sign Up"
								ref={elem => this.submitBtn = elem}
							/>

							<div className="RegisterForm_submit-loader"> <div></div> <div></div> </div>
						</label>

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
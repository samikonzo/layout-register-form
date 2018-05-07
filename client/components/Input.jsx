import React from 'react'
import './styles/Input.less'

// ;ike throttle
function changeWaiter (f, time) {
	function waiterFunc(){
		if(waiterFunc.timer){
			clearTimeout(waiterFunc.timer)
		} 

		waiterFunc.timer = setTimeout(() => {
			f.apply(null, arguments)
			delete waiterFunc.timer
		}, time)
	}

	return waiterFunc
}


class Input extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			name: props.name,
			checkFunction: props.checkFunction,
			type: props.type || 'text',
			error: '',
			value: '',
			available: false, 
			loading: false,
		}

		this.showPasswordHandler = this.showPasswordHandler.bind(this)
		this.onChangeHandler = this.onChangeHandler.bind(this)
		this.checkInput = changeWaiter( this.checkInput.bind(this), 1000).bind(this)
		
	}

	showPasswordHandler(e){
		(this.state.type == 'password') ? 
			this.setState({ type : 'text'}) : this.setState({ type : 'password'})
	}

	onChangeHandler(e){
		e.persist()


		if(!this.state.checkFunction){
			if(this.state.error) this.setState({error : undefined})
		}

		this.setState({value : e.target.value},
			this.checkInput()
		)
	}

	checkInput(){
		if(!this.state.checkFunction) return

		// random seed	
		let seed =  Math.random().toString(36)
		this.checkInput.lastSeed = seed;
		
		var result = this.state.checkFunction(this.state.value)


		if(typeof result == 'boolean'){ 
			// result true | false
			this.setState({
				available: result,
				error: !result ? 'undefined error' : ''
			})

		} else if(result && result.then){
			// result promise
			result.then(
				ok => {
					l('ok : ', ok)
				},
				fail => {
					l('fail : ', fail)
				}
			)

		} else if(result !== undefined){
			// result {result: true | false, error?: str}			
			this.setState({
				available: result.result,
				error: result.error
			})

		} else {
			// no result
			this.setState({
				error: 'check error'
			})
		}
		
	
	}

	render(){
		//l(this.props)
		let { type } = this.state
		let { type: originalType = 'text' ,name, note, required, className } = this.props
		//l(type, originalType, name, note, required, className)

		let baseClassName = 'Input'

		let wrapperClassName = baseClassName
		className.split(' ').forEach((addedName,i) => {
			if(!i) wrapperClassName += ' '
			wrapperClassName += `Input-${addedName} `
		})

		let labelClassName = 'Input_label '
		let nameClassName = 'Input_name '
		let inputClassName = 'Input_input '
		if(this.state.error) inputClassName += 'Input_input--error '
		let errorClassName = 'Input_error '
		if(!this.state.error) errorClassName += 'Input_error--empty '
		let noteClassName = 'Input_note '
		let showPasswordClassName = 'Input_showPassword'

		return(
			<div className={wrapperClassName}>

				{originalType === 'password' &&
					<label className={showPasswordClassName}>
						<input type="checkbox" ref={elem => this.showPassword = elem} onChange={this.showPasswordHandler}/>
						Show password
					</label>	
				}

				<label className={labelClassName}>
					{name && 
						<div className={nameClassName}> 
							{name}
							{(this.props.required == 'true') &&
								<span className="requiredAsterisk"></span>
							}

						</div>

					}


					<input 
						className={inputClassName}
						autoComplete="off"
						type={type || "text"}
						ref={elem => this.elem = elem}
						value={this.state.value}
						onChange={this.onChangeHandler}
					/>

					{this.state.error &&
						<div className={errorClassName}>{this.state.error}</div>
					}

					{this.props.note && this.props.note.length &&
						<div className={noteClassName}>{this.props.note}</div>
					}
				</label>
			</div>
		)
	}
}

export default Input
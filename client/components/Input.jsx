import React from 'react'
import './styles/Input.less'

// like throttle
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
			id: `id_${props.name ? props.name.split(' ').join('-') : ''}_${(Math.random()).toString(36).slice(2).split('.').join('')}`
		}

		this.showPasswordHandler = this.showPasswordHandler.bind(this)
		this.onChangeHandler = this.onChangeHandler.bind(this)
		this.checkInput_waited = changeWaiter( this.checkInput.bind(this), 1000).bind(this)
		this.externalCheckInput = this.externalCheckInput.bind(this)
	}

	componentDidMount(){
		this.elem.addEventListener('check', this.externalCheckInput)
	}

	componentWillUnmount(){
		this.elem && this.elem.removeEventListener('check', this.externalCheckInput)	
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

			/* remove commetns 
			*
			*/
			
			//this.checkInput_waited()
			
			/*
			*
			*/

		)
	}

	externalCheckInput(){
		//if(this.state.error) return

		let promise = this.checkInput()

		this.props && 
			this.props.promiseArr && 
				this.props.promiseArr.push && 
					this.props.promiseArr.push( promise ) 
	}

	checkInput(){
		var promise = new Promise((resolve, reject) => {

			if(!this.state.checkFunction) return

			this.setState({
				loading: true
			}, () => {
			
				var result = this.state.checkFunction(this.state.value)

				if(typeof result == 'boolean'){ 
					// result true | false
					this.setState({
						available: result,
						error: !result ? 'undefined error' : '',
						loading: false,
					}, resolve)

				} else if(result && result.then){
					// result promise

										result.then(
						data => {
							l('ok : ', data)
							this.setState({
								loading: false,
								available: data.result,
								error: data.error
							}, resolve)
						},
						data => {
							l('fail : ', data)
							this.setState({
								loading: false,
								available: data.result,
								error: data.error
							}, resolve)
						}
					)

				} else if(result !== undefined){
					// result {result: true | false, error?: str}			
					this.setState({
						loading: false,
						available: result.result,
						error: result.error
					}, resolve)

				} else {
					// no result
					this.setState({
						loading: false,
						error: 'check error'
					}, resolve)
				}

			})
			
		})

		return promise
	}

	render(){
		//l(this.props)
		let { type, available, error, value, loading } = this.state
		let { type: originalType = 'text' ,name, note, required, className } = this.props
		//l(type, originalType, name, note, required, className)
		required = (required === 'true') ? true : false

		let baseClassName = 'Input'

		let wrapperClassName = baseClassName
		className.split(' ').forEach((addedName,i) => {
			if(!i) wrapperClassName += ' '
			wrapperClassName += `Input-${addedName} `
		})

		//l(available, required)
		let labelClassName = 'Input_label '
		let headerClassName = 'Input_header '

		let nameClassName = 'Input_name '
		if(available && required) nameClassName += 'Input_name--available '	

		let inputClassName = 'Input_input '
		if(error && required) inputClassName += 'Input_input--error '

		let loadingClassName = 'Input_loading '	
		if(loading) loadingClassName += 'Input_loading--show'

		let errorClassName = 'Input_error '
		if(error) errorClassName += 'Input_error--empty '
			
		let noteClassName = 'Input_note '
		let showPasswordClassName = 'Input_showPassword'

		return(
			<div className={wrapperClassName}>

				<div className={headerClassName}>
					{name && 
						<label className={nameClassName} htmlFor={this.state.id}> 
							{name}
							{(required == true) &&
								<span className="requiredAsterisk"></span>
							}
						</label>
					}

					{originalType === 'password' &&
						<label className={showPasswordClassName}>
							<input type="checkbox" ref={elem => this.showPassword = elem} onChange={this.showPasswordHandler}/>
							<span> password </span>
						</label>	
					}
				</div>

				<label className={labelClassName}>
					<input 
						id={this.state.id}
						className={inputClassName}
						autoComplete="off"
						type={type || "text"}
						ref={elem => this.elem = elem}
						value={value}
						onChange={this.onChangeHandler}
						data-required={required}
						data-validate={required ? available : true}
					/>

					<div className={loadingClassName}> <div></div> <div></div> </div>

					<div className={errorClassName}>{this.state.error}</div>


					{this.props.note && this.props.note.length &&
						<div className={noteClassName}>{this.props.note}</div>
					}
				</label>
			</div>
		)
	}
}

export default Input
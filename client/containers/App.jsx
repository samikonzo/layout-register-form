import React from 'react'
import RegisterForm from '../components/RegisterForm.jsx'


class App extends React.Component{
	constructor(props){
		super(props)

		this.state = {}

	}

	render(){
		return (
			<div> 
				<RegisterForm />
			</div>
		)
	}
}

export default App
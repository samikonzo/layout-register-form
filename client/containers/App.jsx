import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import AppActions from '../flux/actions/AppActions.js'
/*import AppStore from '../flux/stores/AppStore.js'*/


class App extends React.Component{
	constructor(props){
		super(props)

		this.state = {}

		this._historyObjGrabber = this._historyObjGrabber.bind(this)
	}

	_historyObjGrabber(elem){
		if(this.state._historyObj) return
		
		if(elem && elem.context && elem.context.router && elem.context.router.history){
			var _historyObj = elem.context.router.history
			//AppActions.pageSetHistoryObj(_historyObj)
		}
	}

	render(){
		return (
			<div> 
				App.jsx

				<Switch> 
					<Route exact path='/' component={Home} />
					<Route path='/contacts' component={Contacts} />
					<Route path='/page' component={Page} />
				</Switch>

				<Link to="/">Home</Link>
				<Link to="/contacts">Contacts</Link>
				<Link to="/page">Page</Link>

				{!this.state._historyObj && (
					<Link to='/' ref={elem => {this._historyObjGrabber(elem)}}/>
				)}
			</div>
		)
	}
}



const Home = () => {
	return(
		<div>Home</div>
	)
}
const Contacts = () => {
	return(
		<div>Contacts</div>
	)
}
const Page = () => {
	return(
		<div>Page</div>
	)
}













export default App
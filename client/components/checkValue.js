export default (value, options) => {
	/**
	* @param {string} value 	value for check
	* @param {object} options 	check options
	* @return {object} {
		result: [true | false],
		error: 'etc..'
	}
	*/

	let { min, max, regExp, name} = options

	if(min !== undefined){
		if(value.length <= min){
			return {
				result: false,
				error: name ? `${name} length must be greater than ${min}` : `length must be greater than ${min}`,
			}
		}
	}

	if(max !== undefined){
		if(value.length > max){
			return {
				result: false,
				error: name ? `${name} length must be less than ${max}` : `length must be less than ${max}`
			}
		}
	}

	if(regExp !== undefined){
		value = value.trim()

		var match = value.match(regExp)

		if(match == undefined){
			return {
				result: false,
				error: name ? `Incorrect ${name}. Please Try Again` : `Incorrect. Please Try Again`
			}
		}
	}


	return {
		result: true
	}	

}
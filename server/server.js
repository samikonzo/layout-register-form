const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

global.l = console.log

app.use((req, res, next) => {
	l(req.method, req.url)
	next()
})

app.use(express.static(path.join(__dirname, '../', 'public/')))

app.get(/.*/, function root(req, res){
	res.sendFile(path.join(__dirname, '../', 'public/index.html'))
})

app.listen(3000)
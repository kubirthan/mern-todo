//using express 
const express = require('express')

//create an instance of express
const app = express()

//define a route
app.get('/', (req, res) => {
    res.send('Hello world')
})

//Start the server
const port = 3000
app.listen(port, () => {
    console.log("Server listining to the port: " + port);
})
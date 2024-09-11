//using express 
const express = require('express')

//create an instance of express
const app = express()
app.use(express.json())

//Sample in memory storage for todos items
let todos = []

//Create a new todo item
app.post('/todos', (req, res) => {
    const {title, description} = req.body
    const newTodo = {
        id:todos.length + 1,
        title,
        description
    }

    todos.push(newTodo)
    console.log(todos);
    res.status(201).json(newTodo)
    
})

//get all items
app.get('/todos', (req, res) => {
    res.json(todos)
})

//Start the server
const port = 3000
app.listen(port, () => {
    console.log("Server listining to the port: " + port);
})
//using express
const express = require("express");
const mongoose = require("mongoose");

//create an instance of express
const app = express();
app.use(express.json());

//connecting database
mongoose
  .connect("mongodb://127.0.0.1:27017/todo")
  .then(() => {
    console.log("DB conected");
  })
  .catch((err) => {
    console.log(err);
  });

//creating schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

//creating model
const todoModel = mongoose.model("Todo", todoSchema);

//Create a new todo item
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTodo = new todoModel({ title, description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//get all items
app.get("/todos", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.status(201).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//update a todo item
app.put("/todos/:id", async(req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    const updatedTodo = await todoModel.findByIdAndUpdate(id, { title, description }, {new: true});

    if (!updatedTodo) {
      return res.status(404).json({ message: "todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message})
    
  }
});

//Start the server
const port = 3000;
app.listen(port, () => {
  console.log("Server listining to the port: " + port);
});

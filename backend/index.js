const express = require("express");
const { readJsonFile, writeJsonFile } = require("./fsUtils.js");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());

// body parser
app.use(express.json());

// multer begin
const storage = multer.diskStorage( { destination: "./uploads", filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
}});
const upload = multer( { storage: storage } );

app.post("/api/data/upload", upload.single("image"), (req, res) => {
    console.log(req.body);
    const newTask = req.body.task;
    console.log(req.body);
    const newTodo = {
        id: Date.now(),
        task: newTask,
        done: false
    }
    readJsonFile("./data.json").then(data => { 
        const newTodoList = [...data, newTodo];
        return newTodoList;
    }).then(data => writeJsonFile("./data.json", data)).then(data => res.json(data));
    // res.json({success: true, result: "data recieved!"})
});

// multer end

app.get("/api/data", (req, res) => {readJsonFile("./data.json").then(data => res.json(data)).catch(err => console.log(err))});

app.delete("/api/data/delete/:todoID", (req, res) => {
    const todoID = req.params.todoID;
    readJsonFile("./data.json").then(data => {
        const filteredData = data.filter((todo) => todo.id.toString() !== todoID);
        return filteredData;
    }).then(data => writeJsonFile("./data.json", data)).then(data => res.json(data));
});

// app.post("/api/data/post", (req, res) => {
//     const newTask = req.body.task;
//     console.log(req.body);
//     const newTodo = {
//         id: Date.now(),
//         task: newTask,
//         done: false
//     }
//     readJsonFile("./data.json").then(data => { 
//         const newTodoList = [...data, newTodo];
//         return newTodoList;
//     }).then(data => writeJsonFile("./data.json", data)).then(data => res.json(data));
// });

app.patch("/api/data/toggleDone/:todoID", (req, res) => {
    const todoID = req.params.todoID;
    readJsonFile("./data.json").then(data => {
        const updatedTodoList = data.map((todo) => todo.id.toString() === todoID ? {
            id: todo.id,
            task: todo.task,
            done: !todo.done
        } : todo)
        return updatedTodoList;
    }).then(data => writeJsonFile("./data.json", data)).then(data => res.json(data));
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is listening at PORT:", PORT));
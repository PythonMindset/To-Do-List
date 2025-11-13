const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const FILE_PATH = "tasks.json";

app.get("/tasks", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(FILE_PATH));
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(FILE_PATH));
    const newTask = { id: Date.now(), task: req.body.task, completed: false };
    tasks.push(newTask);
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
    res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(FILE_PATH));
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        task.completed = req.body.completed;
        fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
        res.json(task);
    } else {
        res.status(404).send("Task not found");
    }
});

app.delete("/tasks/:id", (req, res) => {
    let tasks = JSON.parse(fs.readFileSync(FILE_PATH));
    tasks = tasks.filter(t => t.id != req.params.id);
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
    res.sendStatus(200);
});

app.listen(5000, () => console.log("Server running on port 5000"));

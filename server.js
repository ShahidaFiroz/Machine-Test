
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "test_db"
});

db.connect((err) => {
    if (err) {
        console.log("Error connecting to MySQL:", err);
        return;
    }
    console.log('Connected to MySQL DB');
});

app.get("/tasks", (req, res) => {
    const sql = "SELECT * FROM task";
    db.query(sql, (err, data) => {
        if (err) {
            console.log("Error executing query:", err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log("Query executed successfully:", sql);
        console.log("Data:", data);
        res.json(data);
    });
});

// Route handler for retrieving a single task by ID
app.get("/tasks/:taskId", (req, res) => {
    const taskId = req.params.taskId;
    const sql = `SELECT * FROM task WHERE task_id = ${taskId}`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log("Error executing query:", err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log("Query executed successfully:", sql);
        console.log("Data:", data);
        if (data.length === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json(data[0]);
        }
    });
});

app.post("/tasks", (req, res) => {
    const { task_title, task_description, task_date, task_priority, task_status, task_time,task_image } = req.body;
    const sql = "INSERT INTO task (`task_title`, `task_description`, `task_date`, `task_priority`, `task_status`, `task_image`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [task_title, task_description, task_date, task_priority, task_status,task_time, task_image];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.log("Error executing query:", err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log("Query executed successfully:", sql);
        console.log("Data:", data);
        res.json(data);
    });
});

app.delete("/tasks/:id",(req,res)=>{
    const taskId =req.params.id;
    const sql="DELETE FROM task WHERE task_id = ?";
    db.query(sql,[taskId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Task has been deleted successfully");
    });
});

app.put("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    const { task_title, task_description, task_date, task_priority, task_status, task_time, task_image } = req.body;
    const sql = "UPDATE task SET `task_title`=?, `task_description`=?, `task_date`=?, `task_priority`=?, `task_status`=?, `task_time`=?, `task_image`=? WHERE task_id=?";
    const values = [task_title, task_description, task_date, task_priority, task_status, task_time, task_image, taskId];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.log("Error executing query:", err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log("Task updated successfully");
        res.json("Task has been updated successfully");
    });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

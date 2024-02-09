
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [task, setTask] = useState({
        task_title: "",
        task_description: "",
        task_date: "",
        task_priority: "",
        task_status: "",
        task_time: "",
        task_image: ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    const taskId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tasks/${taskId}`);
                const fetchedTask = response.data;
                setTask(fetchedTask);
            } catch (error) {
                console.error("Error fetching task:", error);
            }
        };

        fetchTask();
    }, [taskId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prev => ({
            ...prev,
            [name]: name === "task_date" ? new Date(value).toISOString() : value
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/tasks/${taskId}`, task);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='form'>
            <h1>Update Task</h1>
            <input type='text'  onChange={handleChange} name='task_title' value={task.task_title} />
            <input type='text' onChange={handleChange} name='task_description' value={task.task_description} />
            <input type='date'  onChange={handleChange} name='task_date' value={task.task_date ? task.task_date.split("T")[0] : ""} />
            <input type='text'  onChange={handleChange} name='task_priority' value={task.task_priority} />
            <input type='text' onChange={handleChange} name='task_status' value={task.task_status} />
            <input type='text'  onChange={handleChange} name='task_image' value={task.task_image} />
            <button className="formButton" onClick={handleClick}>Update</button>
        </div>
    );
};

export default Update;


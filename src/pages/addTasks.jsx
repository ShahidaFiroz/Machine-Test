

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [task, setTask] = useState({
        task_title: "",
        task_description: "",
        task_date: null,
        task_priority: "",
        task_status: "",
        task_time:"",
        task_image: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setTask(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/tasks", task);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='form'>
            <h1>Add New Task</h1>
            <input type='text' placeholder='Title' onChange={handleChange} name='task_title' />
            <input type='text' placeholder='Description' onChange={handleChange} name='task_description' />
            <input type='date' placeholder='Date' onChange={handleChange} name='task_date' />
            <input type='text' placeholder='Time' onChange={handleChange} name='task_time' />
            <select name='task_priority' onChange={handleChange}>
                <option value='' selected disabled hidden>Priority</option>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
            </select>
            <select name='task_status' onChange={handleChange}>
                <option value='' selected disabled hidden>Status</option>
                <option value='pending'>Pending</option>
                <option value='completed'>Completed</option>
            </select>
            <input type='text' placeholder='Image URL' onChange={handleChange} name='task_image' />
            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    );
};

export default Add;

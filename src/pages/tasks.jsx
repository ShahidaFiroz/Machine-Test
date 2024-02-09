
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleTaskView = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/tasks/${id}`);
                setTask(res.data);
            } catch (err) {
                console.error("Error fetching task:", err);
            }
        };

        fetchTask();
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Task Details</h1>
            <h2>{task.task_title}</h2>
            <p>{task.task_description}</p>
            <p>Date: {task.task_date}</p>
            <p>Status: {task.task_status}</p>
            <p>Time: {task.task_time}</p>
            {task.task_image && <img src={task.task_image} alt="Task" />}
        </div>
    );
};

export default SingleTaskView;

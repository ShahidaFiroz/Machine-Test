
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Space, Select } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const ListTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filter, setFilter] = useState('all');

  
    useEffect(() => {
        const fetchAllTasks = async () => {
            try {
                const res = await axios.get("http://localhost:3000/tasks");
                const sortedTasks = res.data.sort((a, b) => new Date(a.task_date).getTime() - new Date(b.task_date).getTime());
                setTasks(sortedTasks);
                setFilteredTasks(sortedTasks);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        };
    
        fetchAllTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${id}`);
            setTasks(tasks.filter(task => task.task_id !== id));
            setFilteredTasks(filteredTasks.filter(task => task.task_id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleFilterChange = (value) => {
        setFilter(value);
        if (value === 'all') {
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter(task => {
                const priority = task.task_priority;
                return priority && priority.toLowerCase() === value.toLowerCase();
            });
            setFilteredTasks(filtered);
        }
    };
    
    

    const columns = [
        {
            title: 'Title',
            dataIndex: 'task_title',
            key: 'task_title',
        },
        {
            title: 'Description',
            dataIndex: 'task_description',
            key: 'task_description',
        },
        {
            title: 'Date',
            dataIndex: 'task_date',
            key: 'task_date',
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Priority',
            dataIndex: 'task_priority',
            key: 'task_priority',
        },
        {
            title: 'Status',
            dataIndex: 'task_status',
            key: 'task_status',
        },
        {
            title: 'Time',
            dataIndex: 'task_time',
            key: 'task_time',
        },
        {
            title: 'Image',
            key: 'task_image',
            render: (text, record) => {
                if (record.task_image && record.task_image.data) {
                    const arrayBufferView = new Uint8Array(record.task_image.data);
                    const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
                    const imageUrl = URL.createObjectURL(blob);
                    return <img src={imageUrl} alt="Task" style={{ width: '50px', height: '50px' }} />;
                } else {
                    return null; // or any fallback image or text
                }
            },
        },
        
        
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
               
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} href={`/update/${record.task_id}`} />
                    <Button type="primary" icon={<EyeOutlined />} href={`/task/${record.task_id}`} />
                    
                    <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record.task_id)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1 style={{ display: 'inline-block', marginRight: '20px', marginBottom: '0' }}>INTERVAL TASKS</h1>
            <Select defaultValue="all" style={{ width: 120 }} onChange={handleFilterChange}>
                <Option value="all">All</Option>
                <Option value="low">Low</Option>
                <Option value="medium">Medium</Option>
                <Option value="high">High</Option>
            </Select>
            <Button type="primary" style={{ height: '32px', float: 'right' }}><Link to="/add">Add New Task</Link></Button>
            <Table dataSource={filteredTasks} columns={columns} rowKey="task_id" />
        </div>
    );
};

export default ListTasks;

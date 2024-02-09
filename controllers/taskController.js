// controllers/tasksController.js
const { Task } = require('../models/task');

const tasksController = {
  async createTask(req, res) {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getAllTasks(req, res) {
    try {
      const tasks = await Task.findAll();
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getTaskById(req, res) {
    const { id } = req.params;
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.json(task);
    } catch (error) {
      console.error('Error fetching task by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async updateTask(req, res) {
    const { id } = req.params;
    try {
      const [updatedRowsCount, updatedTask] = await Task.update(req.body, {
        where: { id },
        returning: true,
      });
      if (updatedRowsCount === 0) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.json(updatedTask[0]);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async deleteTask(req, res) {
    const { id } = req.params;
    try {
      const deletedRowCount = await Task.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = tasksController;

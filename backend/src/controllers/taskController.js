const { Task } = require('../models');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, status } = req.body;
        const task = await Task.create({
            title,
            description,
            status,
            userId: req.user.id
        });

        res.status(201).json({
            message: 'Task created successfully',
            task
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating task',
            error: error.message
        });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching tasks',
            error: error.message
        });
    }
};

exports.getTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching task',
            error: error.message
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const task = await Task.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        const { title, description, status } = req.body;
        await task.update({
            title,
            description,
            status
        });

        res.json({
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating task',
            error: error.message
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        await task.destroy();

        res.json({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting task',
            error: error.message
        });
    }
}; 
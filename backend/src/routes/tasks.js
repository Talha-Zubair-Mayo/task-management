const express = require('express');
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');

const router = express.Router();

const taskValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required'),
    body('status')
        .optional()
        .isIn(['pending', 'in_progress', 'completed'])
        .withMessage('Invalid status value')
];

router.use(auth);

router.post('/', taskValidation, taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.put('/:id', taskValidation, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router; 
import { Router } from 'express';
import { TodoItem, ITodoItem } from '../../models/todo-item.model';

const router = Router();

// @route   GET api/todo-items
// @desc    Fetches all todo items
// @access  Public
router.get('/', async (request, response, next) => {
    try {
        const items = await TodoItem.find().sort({ date: -1 });
        response.json(items);
    } catch (error) {
        return next(error);
    }
});

// @route   POST api/todo-items
// @desc    Creates a new todo item
// @access  Public
router.post('/', async (request, response, next) => {
    try {
        const item = new TodoItem({
            name: request.body.name
        });
        const savedItem = await item.save();
        return response.status(201).json(savedItem);
    } catch (error) {
        return next(error);
    }
});

// @route   DELETE api/todo-items/:id
// @desc    Deletes a new todo item
// @access  Public
router.delete('/:id', async (request, response, next) => {
    try {
        const item = await TodoItem.findById(request.params.id);
        if (!item) {
            return response.status(404);
        }
        await item.remove();
        return response.status(200).json();
    } catch (error) {
        return next(error);
    }
});


export const TodoItemsRoute = router;



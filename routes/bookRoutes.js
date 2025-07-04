import express from 'express';
import { getAll, getById, create, update, remove, search } from '../controllers/bookController.js';
import auth from '../middlewares/auth.js';

const bookRoute = express.Router();

bookRoute.get('/', getAll);
bookRoute.get('/search', search);  //  Search route
bookRoute.get('/:id', auth, getById);
bookRoute.post('/', auth, create);
bookRoute.put('/:id', auth, update);
bookRoute.delete('/:id', auth, remove);

export default bookRoute
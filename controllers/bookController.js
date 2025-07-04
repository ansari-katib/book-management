import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
} from '../models/bookModel.js';

export async function getAll(req, res) {
  try {
    const books = await getAllBooks();
    res.json({
      message: 'Books fetched successfully',
      data: books
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
}

export async function getById(req, res) {
  try {
    const book = await getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({
      message: 'Book fetched successfully',
      data: book
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
}

export async function create(req, res) {
  try {
    const book = await createBook(req.body);
    res.status(201).json({
      message: 'Book created successfully',
      data: book
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create book' });
  }
}

export async function update(req, res) {
  try {
    const book = await updateBook(req.params.id, req.body);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({
      message: 'Book updated successfully',
      data: book
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
}

export async function remove(req, res) {
  try {
    const ok = await deleteBook(req.params.id); 
    if (!ok) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
}


// search api  : 

export async function search(req, res) {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Missing search query' });

    const results = await searchBooks(q);
    res.json({
      message: 'Search successful',
      data: results
    });
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
}
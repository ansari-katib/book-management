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
    const { genre } = req.query;
    if (!genre) return res.status(400).json({ error: 'Missing search query' });

    const results = await searchBooks(genre);
    res.json({
      message: 'Search successful',
      data: results
    });
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
}


// pagination apo : 

export async function paginate(req, res) {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const books = await getAllBooks(); // get all books

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedBooks = books.slice(startIndex, endIndex);

    res.json({
      message: 'Books fetched with pagination',
      page,
      limit,
      total: books.length,
      data: paginatedBooks
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to paginate books' });
  }
}
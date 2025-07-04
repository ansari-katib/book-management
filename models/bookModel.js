import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const booksFile = path.join(__dirname, '../data/book.json');

async function readBooks() {
  try {
    const data = await fs.readFile(booksFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeBooks(books) {
  await fs.writeFile(booksFile, JSON.stringify(books, null, 2));
}

export async function getAllBooks() {
  return Object.values(await readBooks());
}

export async function getBookById(id) {
  const books = await readBooks();
  return books[id];
}

export async function createBook(bookData) {
  const books = await readBooks();
  const id = Date.now().toString();
  const book = { id, ...bookData }; 
  books[id] = book;
  await writeBooks(books);
  return book;
}

export async function updateBook(id, updates) {
  const books = await readBooks();
  if (!books[id]) return null;
  books[id] = { ...books[id], ...updates };
  await writeBooks(books);
  return books[id];
}

export async function deleteBook(id) {
  const books = await readBooks();
  if (!books[id]) return false;
  delete books[id];
  await writeBooks(books);
  return true;
}

//  search book model  :

export async function searchBooks(query) {
  const books = await getAllBooks(); // assuming this fetches all books
  const q = query.toLowerCase();
  return books.filter(book =>
    book.genre.toLowerCase().includes(q)  
  );
}
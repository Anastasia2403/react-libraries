import { Book } from "../types/Book";
import { BookReq } from "../types/BookReq";

const API_URL = `http://localhost:9000/api/v1/library/book`;

export function addBook(bookRQ: BookReq ): Promise<Book> {
  return fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookRQ)
  })
    .then(response => response.json());
}

export function updateBook(bookRQ: BookReq ): Promise<Book> {
  return fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookRQ)
  })
    .then(response => response.json());
}

export function deleteBook(id: number): Promise<Book> {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json());
}
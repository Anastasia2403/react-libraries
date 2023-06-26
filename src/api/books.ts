import { Book } from "../types/Book";

const API_URL = `http://localhost:9000/api/v1/library/books`;

export function getBooks(tenant: string, pageNumber: number, pageSize: number, keyword: string | null): Promise<Book[]> {
  return fetch(`${API_URL}?tenant=${tenant}&pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyword}`)
    .then(response => response.json());
}

export function getById(id: number): Promise<Book> {
  return fetch(`${API_URL}/${id}/book`)
    .then(response => response.json());
}
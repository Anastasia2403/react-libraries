import { Genre } from "../types/Genre";

const API_URL = `http://localhost:9000/api/v1/library/genre`;

export function getAllGenre(): Promise<Genre[]> {
  return fetch(`${API_URL}`)
    .then(response => response.json());
}
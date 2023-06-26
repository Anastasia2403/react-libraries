import { Library } from "../types/Library";


const API_URL = `http://localhost:9000/api/v1/library`;

export function getAllLibrary(): Promise<Library[]> {
  return fetch(`${API_URL}/all`)
    .then(response => response.json());
}

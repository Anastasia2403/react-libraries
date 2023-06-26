const API_URL = `http://localhost:9000/api/v1/library/add/book`;

export function addBookToLibrary(tenant: string, bookId: number): Promise<any> {
  return fetch(`${API_URL}?tenant=${tenant}&bookId=${bookId}`)
    .then(response => response.json());
}
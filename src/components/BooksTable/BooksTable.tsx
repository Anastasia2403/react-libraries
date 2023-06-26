import { addBookToLibrary } from "../../api/addbook";
import { deleteBook } from "../../api/book";
import { Book } from "../../types/Book";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  books: Book[];
  value: string | null;
}

export const BooksTable: React.FC<Props> = ({
  books,
  value,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tenantId = location.state?.tenant;

  console.log(tenantId);

  const handleEditClick = (bookId: number) => {
    navigate(`/addEditbook?id=${bookId}`);
  };

  const handleDeleteClick = (bookId: number) => {
    deleteBook(bookId)
    window.location.reload()
  };

  const handleAddBookToLibrary = (bookId: number) => {
    addBookToLibrary(tenantId, bookId)
    navigate(`/books?tenant=${tenantId}`)
    window.location.reload()
  };
    
  console.log(value);

  return (
    <table className="table is-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>ISBN</th>
          <th>Author name</th>
          <th>Genre</th>
          <th>Published year</th>
          <th>Publication</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        {books.map(book => (
          <tr key={book.id}>
            <td>{book.title || '---'}</td>
            <td>{book.isbn || '---'}</td>
            <td>{book.authorName || '---'}</td>
            <td>{book.genre || '---'}</td>
            <td>{book.publishedYear || '---'}</td>
            <td>{book.publication || '---'}</td>
            <td>{book.description || '---'}</td>
            <td>
              {value ? (
                <>
                <button
                    className="button has-background-success-light is-small"
                    onClick={() => handleEditClick(book.id || 0)}
                >
                  Edit
                </button>
                  <button
                    className="button has-background-danger-light is-small"
                    onClick={() => handleDeleteClick(book.id || 0)}
                  >
                  Delete
                  </button></>
              ) : (
                  <button
                    className="button has-background-success-light is-small"
                    onClick={() => handleAddBookToLibrary(book.id || 0)}
                  >
                Add book to library
              </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
   )
}
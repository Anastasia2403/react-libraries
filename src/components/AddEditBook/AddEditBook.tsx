/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Book } from "../../types/Book";
import { getById } from "../../api/books";
import { addBook, updateBook } from "../../api/book";
import { BookReq } from "../../types/BookReq";

export const AddEditBook = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookId = searchParams.get("id");
  const tenantId = searchParams.get("tenant");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [title, setTitle] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [publishedYear, setPublishedYear] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const [publication, setPublication] = useState<string>("");
  const [isNewBook, setIsNewBook] = useState<boolean>(true);
  const navigate = useNavigate();

  console.log(bookId, selectedBook);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleIsbnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(event.target.value);
  };

  const handleAuthorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.target.value);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenre(event.target.value);
  };

  const handlePublishedYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublishedYear(+event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handlePublicationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublication(event.target.value);
  };

    useEffect(() => {
      if (bookId) {
        setIsNewBook(false);
        getById(Number(bookId))
        .then((book) => {
          setSelectedBook(book);
          setTitle(book.title || '');
          setIsbn(book.isbn || '');
          setAuthorName(book.authorName || '');
          setGenre(book.genre || '');
          setPublishedYear(Number(book.publishedYear));
          setDescription(book.description || '');
          setPublication(book.publication || '');
        })
        .catch(() => {
          alert("Something went wrong");
        });
      }
    }, [bookId]);
  
  const handleFormSubmit = () => {
    if (!title || !isbn || !authorName || !genre || !publishedYear || !description || !publication) {
      alert("Please fill in all required fields.");
      return;
    }

    const bookData: BookReq = {
      bookRQ: {
        title,
        isbn,
        authorName,
        genre,
        publishedYear,
        description,
        publication,
      },
      tenantId: tenantId || '',
      bookId: Number(bookId),
    };

    if (isNewBook) {
      addBook(bookData)
        .then(() => {
          navigate(`/books?tenant=${tenantId}`);
        })
        .catch(() => {
          alert("Something went wrong");
        });
    } else {
      updateBook(bookData)
        .then(() => {
          navigate(-1);
        }
      )
        .catch(() => {
          alert("Something went wrong");
        }
      );
    }
  };


    return (
      <div className="field-container">
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Kobzar"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">ISBN</label>
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="9780061120084"
              value={isbn}
              onChange={handleIsbnChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Author</label>
          <div className="control">
            <input
              className="input"
              type="name"
              placeholder="Taras Shevchenko"
              value={authorName}
              onChange={handleAuthorNameChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Genre</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="poem"
              value={genre}
              onChange={handleGenreChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Published year</label>
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="1980"
              value={publishedYear}
              onChange={handlePublishedYearChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <input
              className="input"
              placeholder="A dystopian novel by....."
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Publication</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Harper Perennial"
              value={publication}
              onChange={handlePublicationChange}
            />
          </div>
        </div>

        <button
          className="button is-primary"
          type="submit"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </div>
    );
  }

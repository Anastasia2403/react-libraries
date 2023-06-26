/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import { Book } from "../../types/Book"
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { Pagination } from "../Pagination/Pagination";
import { BooksTable} from "../BooksTable/BooksTable";
import { Genre } from "../../types/Genre";
import { getBooks } from "../../api/books";
import { getAllGenre } from "../../api/genre";

export const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [serachParams, setSearchParams] = useSearchParams({});
  const value = serachParams.get('tenant');
  let pageSize = 10;
  const [genres, setGenres] = useState<Genre[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks(value || '', currentPage, pageSize, searchQuery || '')
      .then(setBooks)
      .catch(() => {
        alert('Something went wrong');
      });
  }, [value, currentPage, searchQuery]);

 useEffect(() => {
    getBooks(value || '', currentPage, pageSize = 10000, searchQuery || '')
      .then(setAllBooks)
      .catch(() => {
        alert('Something went wrong');
      });
  }, []);

  useEffect(() => {
    getAllGenre()
      .then(setGenres)
      .catch(() => {
        alert('Something went wrong');
      });
  }, []);

const handlePagination = async (currentPage: number) => {
  try {
    setCurrentPage(currentPage);
  } catch (error) {
    alert('Something went wrong');
  } finally {
    window.scrollTo(0, 0);
  }
};

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'Find by genre') {
      setSearchQuery('');
    } else {
      setSearchQuery(event.target.value);
    }
  };

  return (
    <div className="container">
        <div className="data-container">
          <BooksTable
            books={books}
            value={value}
          />
          <Pagination
            currentPage={currentPage}
            handlePagination={handlePagination}
            allLength={allBooks.length}
          />
        </div>
          <SearchBar
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            handlePagination={handlePagination}
            genres={genres}
            handleSelectGenre={handleSelectGenre}
            value={value}
          />
    </div>
  )
}
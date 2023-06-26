/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect} from "react";
import { Genre } from "../../types/Genre";
import { useNavigate } from "react-router-dom";

interface Props {
  searchQuery: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePagination: (currentPage: number) => void;
  handleSelectGenre?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  genres?: Genre[];
  value: string | null;
}

export const SearchBar: React.FC<Props> = ({
  searchQuery,
  handleSearch,
  handlePagination,
  handleSelectGenre,
  genres,
  value,
}) => {
  const navigate = useNavigate();

  console.log(value);
  
  useEffect(() => {
    handlePagination(0);
  }, [searchQuery]);
  
  const handleAddUser = () => {
    navigate(`/addEditUser?tenant=${value}`)
  }

  const handleAddBook = () => {
    navigate(`/addBook?tenant=${value}`)
  }

  return (
 <div className="search-container">
    <div className="search">
      <div className="field has-addons">
        <p className="control">
          <input
            className="input"
            type="text"
            placeholder="Find by keyword"
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handlePagination(0);
              }
            }
            }
            />
        </p>
      </div>
      </div>
      {genres && (
        <div className="select is-rounded">
          <select value={searchQuery} onChange={handleSelectGenre}>
            <option>Find by genre</option>
            {genres?.map(gen => (
              <option key={gen.id}>{gen.name}</option>
            ))}
          </select>
        </div>
      )}

      {value && genres ? (
        <button
          className="button is-primary"
          onClick={handleAddBook}
        >
          Add new book
        </button>
      ) : (
         <button
            className="button is-primary"
            onClick={handleAddUser}
        >
          Add new visitor
        </button> 
      )}
  </div>
)}
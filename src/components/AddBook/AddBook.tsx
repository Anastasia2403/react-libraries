import { NavLink, useLocation, useNavigate } from "react-router-dom"

export const AddBook = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tenantId = searchParams.get("tenant");
  const navigate = useNavigate();

  const handleAddBook = () => {
    navigate(`/addEditBook?tenant=${tenantId}`)
  }

  const handleFindBook = () => {
    navigate("/books", { state: { tenant: tenantId } });
  }
  
  return (
    <div className="addBook__wrapper">
    <div className="addBook__container">
      <h1>Please select your preferred method of adding a book:</h1>
      <div className="addBook__buttons">
          <button className="button has-background-grey-light addBook__button"
           onClick={handleAddBook}
          >
          <NavLink
            to="/addEditBook">
            Add new book by your own
          </NavLink>
        </button>
          <button
            className="button has-background-grey-light addBook__button"
            onClick={handleFindBook}
          >
          <NavLink
            to="/books">
            Find book in general books` list
          </NavLink>
        </button>
        </div>
      </div>
    </div>
  )
}
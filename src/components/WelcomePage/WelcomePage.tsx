import { useEffect, useState, useRef } from "react";
import { getAllLibrary } from "../../api/library";
import { Library } from "../../types/Library";
import { NavLink } from "react-router-dom";

export const WelcomePage = () => {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [libraries, setLibraries] = useState<Library[]>([]);
  const passwordPromptRef = useRef<HTMLDivElement>(null);
  const [selectedLibraryId, setSelectedLibraryId] = useState<string>('');

  const handleButtonClick = (id: string) => {
    setShowPasswordPrompt(!showPasswordPrompt);
    setSelectedLibraryId(id);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      passwordPromptRef.current &&
      !passwordPromptRef.current.contains(event.target as Node)
    ) {
      setShowPasswordPrompt(false);
    }
  };

  useEffect(() => {
    getAllLibrary()
      .then(setLibraries)
      .catch(() => {
        alert("Something went wrong");
      });

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="welcome__container">
      <h1 className="welcome__title">Welcome to the Libraries database!</h1>
      <p className="welcome__subtitle">Please choose your library to continue</p>

      <div className="welcome__buttons">
        {libraries.map((library) => (
          <button
            className="welcome__button button has-background-grey-lighter"
            onClick={() => handleButtonClick(library.tenantId)}
            key={library.tenantId}
          >
            {library.name}
          </button>
        ))}
      </div>

      {showPasswordPrompt && (
        <div
          className="password-prompt has-background-grey-lighter"
          ref={passwordPromptRef}
        >
          <p>Please enter the password:</p>
          <input type="password" />
          <button
            className="button"
          >
            <NavLink
              to={{
                pathname: "/library/books",
                search: `?tenant=${selectedLibraryId}`,
              }}
            >
              Submit
            </NavLink>
          </button>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <header
        id="header"
        className="header"
      >
        <NavLink to="/" className="header_logo">
          <img
            src='book.png'
            alt="logo"
            className="header_logo-img"
          />
        </NavLink>
        <nav className="nav">
          <ul className="nav_list">
            <li className="nav_item">
              <NavLink
                className={({ isActive }) => classNames(
                  'nav_link',
                  { 'is-active': isActive },
                )}
                to={`library/books${location.search}`}
              >
                Books
              </NavLink>
            </li>

            <li className="nav_item">
              <NavLink
                className={({ isActive }) => classNames(
                  'nav_link',
                  { 'is-active': isActive },
                )}
                 to={`library/users${location.search}`}
              >
                Visitors
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

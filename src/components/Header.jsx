import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__column">
          <Link to="/">
            <i className="fab fa-youtube"></i>
          </Link>
        </div>
        <div className="header__column">
          <form action="/search" method="get">
            <input type="text" name="searchingBy" placeholder="Search Video" />
          </form>
        </div>
        {!user && (
          <div className="header__column">
            <ul>
              <li>
                <Link to="/join">Join</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        )}
        {user && (
          <div className="header__column">
            <ul>
              <li>
                <Link to="/upload">Upload</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header_wrapper">
          <div className="header__column">
            <Link to="/">
              <i className="fab fa-youtube"></i>
            </Link>
          </div>
          <div className="header__column">
            <form action="" method="get">
              <input
                type="text"
                name="searchingBy"
                placeholder="Search Video"
              />
            </form>
          </div>
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
        </div>
      </header>
    );
  }
}

export default Header;

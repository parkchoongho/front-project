import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__icon">
          <i className="fab fa-youtube"></i>
        </div>
        <span className="footer__text">
          Wetube {new Date().getFullYear()} &copy;
        </span>
      </footer>
    );
  }
}

export default Footer;

import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid ">
          <NavLink
            className="navbar-brand"
            to="/"
            style={{
              fontSize: "25px",
              // background: "#f8f9fa",
              padding: "5px 10px",
              border: "gray solid 1px",
              color: "#fff"
            }}
          >
            R<span style={{ fontSize: "15px" }}>eact</span>M
            <span style={{ fontSize: "15px" }}>ERN</span>C
            <span style={{ fontSize: "15px" }}>RUD</span>|
            <span style={{ fontSize: "15px" }}>Fullstack</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  style={{
                    fontSize: "16px",
                    background: "#0d6efd",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    color: "#fff",
                  }}
                >
                  Home
                </Link>
              </li>
            </ul>
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

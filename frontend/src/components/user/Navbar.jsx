import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../redux/auth.slice";
import { searchBlog } from "../../utils/api";
import { setSearchBlogs } from "../../redux/search.slice";

export default function Navbar() {
  const navMenus = [
    { path: "/home", label: "Home" },
    { path: "/write", label: "Write" },
    { path: "/notifications", label: "Notifications" },
    { path: "/profile", label: "Profile" },
  ];
  const tokenFromStore = useSelector((state) => state.token.token);
  const tokenFromLocalStorage = localStorage.getItem("access_token");

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?searchTerm=${encodeURIComponent(searchTerm)}`);
      searchBlog(1, setSearchBlogs, dispatch);
    }
  };

  const logOut = () => {
    dispatch(setToken(null));
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          BlogSphere
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex me-auto mt-1" role="search">
            {(tokenFromStore || tokenFromLocalStorage) && (
              <form onSubmit={handleSubmit} className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn my-btn" type="submit">
                  Search
                </button>
              </form>
            )}
          </div>

          <ul className="navbar-nav d-flex mb-2 mb-lg-0 gap-2">
            {(tokenFromStore || tokenFromLocalStorage) && (
              <>
                {navMenus.map(({ path, label }) => (
                  <li className="nav-item" key={path}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to={path}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}

                <li className="nav-item">
                  <button onClick={logOut} className="btn my-btn">
                    Log out
                  </button>
                </li>
              </>
            )}

            {!tokenFromStore && !tokenFromLocalStorage && (
              <>
                <li className="nav-item">
                  <NavLink to="/login">
                    <button className="btn my-btn">Login</button>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup">
                    <button className="btn my-btn">Signup</button>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

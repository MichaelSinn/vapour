import React, { useState } from "react";
import "bulma/css/bulma.min.css";

import { Button, Form, Navbar } from "react-bulma-components";
import { Navigate, NavLink } from "react-router-dom";

import Auth from "../utils/auth";

import { searchGames } from "../utils/API";
// Nav accepts a 'page' state object prop to determine what the active page is
// Nav expects:
// genres ; /genres endpoint; genre.id and genre.name
// gameCount; /games endpoint; "count" should equal 828994
// userID; ID of logged-in user for viewing Profile page
export default function Nav({ genres, gameCount }) {
  // Underline the active page
  const [toggled, setToggled] = useState(true);

  const toggleBurger = () => {
    var burger = document.querySelector(".navbar-burger");
    var nav = document.querySelector(".navbar-menu");
    burger.classList.toggle("is-active");
    nav.classList.toggle("is-active");
    setToggled(!toggled);
  };

  const [result, setResult] = useState({ results: [] });
  const [searchState, setSearchState] = useState("");

  const handleChange = (event) => {
    setSearchState(event.target.value);
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    <Navigate to={`/search/${searchState}`} />;
  };

  return (
    <nav className="navbar">
      <Navbar.Burger onClick={toggleBurger} />
      <div className="navbar-menu">
        <NavLink className="navbar-item" to="/">
          Home
        </NavLink>
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">Genres</a>
          <div className="navbar-dropdown">
            {genres.map((genre) => {
              return (
                <NavLink className="navbar-item" to={`/genres/${genre.id}`}>
                  {genre.name}
                </NavLink>
              );
            })}
          </div>
        </div>
        <form onSubmit={handleFormSubmit} className="navbar-item">
          <Form.Input
            className="navbar-item"
            onChange={handleChange}
            value={searchState}
            placeholder={`Search over ${gameCount} games...`}
          />
          <NavLink className="navbar-item" to={`/search/${searchState}`}>
            <Button className="navbar-item" type="submit">
              Search
            </Button>
          </NavLink>
        </form>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          {Auth.loggedIn() ? (
            <div className="buttons">
              <NavLink
                to={`/profile/${Auth.getProfile().data.username}`}
                className="button is-primary"
              >
                <strong>Profile</strong>
              </NavLink>
              <NavLink onClick={Auth.logout} className="button is-light">
                Log out
              </NavLink>
            </div>
          ) : (
            <div className="buttons">
              <NavLink to="/signup" className="button is-primary">
                <strong>Sign up</strong>
              </NavLink>
              <NavLink to="/login" className="button is-light">
                Log in
              </NavLink>
            </div>
          )}
        </div>
      </div>
      *
    </nav>
  );
}

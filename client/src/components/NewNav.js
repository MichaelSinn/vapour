import React from "react";
import "bulma/css/bulma.min.css";

import { Button, Dropdown, Form, Navbar } from "react-bulma-components";
import { NavLink } from "react-router-dom";

//TODO: Convert Nav to a Hamburger when in mobile viewport size

// Nav accepts a 'page' state object prop to determine what the active page is
// Nav expects:
// genres ; /genres endpoint; genre.id and genre.name
// gameCount; /games endpoint; "count" should equal 828994
// userID; ID of logged-in user for viewing Profile page
export default function NewNav({ genres, gameCount, userID }) {
  // Underline the active page
  let activeStyle = {
    textDecoration: "underline",
  };

  const toggleBurger = () => {
    var burger = document.querySelector(".navbar-burger");
    var nav = document.querySelector(".navbar-menu");
    burger.classList.toggle("is-active");
    nav.classList.toggle("is-active");
  };

  return (
    <Navbar fixed="top">
      <Navbar.Burger onClick={toggleBurger} />
      <Navbar.Menu>
        <Navbar.Item>
          <NavLink to="/">Home</NavLink>
        </Navbar.Item>
        <Dropdown label="Genres">
          {genres.map((genre) => {
            return (
              <Dropdown.Item
                renderAs="a"
                href={`/genres/${genre.id}`}
                value={genre.name}
              >
                {genre.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown>

        <Form.Input
          // TODO: Query API for inputted game 'name', 'name_original' or 'alternative_names'
          type="text"
          placeholder={`Search over ${gameCount} games...`}
        />
        {/* TODO: onClick() query to go the SingleGame page with that game as props (if multiple games match query, just use first)*/}
        <Button type="submit">Search</Button>

        {/* TODO: Only render Profile if user is logged in */}
        <Navbar.Item>
          <NavLink to={`/profile/${userID}`}>Profile</NavLink>
        </Navbar.Item>
        <Navbar.Item to="/signup">
          <NavLink to="/signup">Sign up</NavLink>
        </Navbar.Item>
        <Navbar.Item to="/login">
          <NavLink to="/login">Log in</NavLink>
        </Navbar.Item>
      </Navbar.Menu>
    </Navbar>
  );
}

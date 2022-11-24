import React from "react";
import "bulma/css/bulma.min.css";

import {
  Navbar,
  Dropdown,
  Button,
  Form,
  Icon,
} from "react-bulma-components";

//TODO: Convert Nav to a Hamburger when in mobile viewport size

// Nav accepts a 'page' state object prop to determine what the active page is
// Nav expects:
// genres ; /genres endpoint; genre.id and genre.name
// gameCount; /games endpoint; "count" should equal 828994
// userID; ID of logged in user for viewing Profile page
export default function Nav({ genres, gameCount, userID }) {
  // Underline the active page
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  return (
    <Navbar aria-label="main navigation" brand={<></>}>
      <Navbar.Section position="start" tabs>
        <Navbar.Item
          active
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Home
        </Navbar.Item>
        <Dropdown hoverable navbar text="Genres">
          {genres.map((genre) => {
            return (
              <Dropdown.Item navbar to={`/genres/${genre.id}`}>
                {genre.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown>
      </Navbar.Section>
      <Form.Input
        // TODO: Query API for inputted game 'name', 'name_original' or 'alternative_names'
        iconLeft={<Icon name="search" />}
        type="text"
        placeholder={`Search over ${gameCount} games...`}
      />
      <Button>Search</Button>
      {/* TODO: onClick() query to go the SingleGame page with that game as props (if multiple games match query, just use first)*/}
      <Navbar.Section position="end" tabs>
        {/* TODO: Only render Profile if user is logged in */}
        <Navbar.Item
          to={`/profile/${userID}`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Profile
        </Navbar.Item>
        <Navbar.Item
          to="/signup"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Sign Up
        </Navbar.Item>
        <Navbar.Item
          to="/login"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Log in
        </Navbar.Item>
      </Navbar.Section>
    </Navbar>
  );
}

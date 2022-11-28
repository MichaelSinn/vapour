import React, {useState} from 'react';
import 'bulma/css/bulma.min.css';

import {Navbar} from 'react-bulma-components';
import {NavLink} from 'react-router-dom';

import Auth from '../utils/auth';
// Nav accepts a 'page' state object prop to determine what the active page is
// Nav expects:
// genres ; /genres endpoint; genre.id and genre.name
// gameCount; /games endpoint; "count" should equal 828994
// userID; ID of logged-in user for viewing Profile page
export default function Nav({genres, gameCount}) {
    // Underline the active page
    const [toggled, setToggled] = useState(true);

    const toggleBurger = () => {
        var burger = document.querySelector('.navbar-burger');
        var nav = document.querySelector('.navbar-menu');
        burger.classList.toggle('is-active');
        nav.classList.toggle('is-active');
        setToggled(!toggled);
    };

    return (
        <nav className="navbar">
            <Navbar.Burger onClick={toggleBurger}/>
            <div className="navbar-menu">
                <NavLink className="navbar-item" to="/">Home</NavLink>
                <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                        Genres
                    </a>
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
                <input className="input mt-2"
                    // TODO: Query API for inputted game 'name', 'name_original' or 'alternative_names'
                    type="text"
                    placeholder={`Search over ${gameCount} games...`}
                />
                <button className="button mt-2" type="submit">Search</button>
            </div>

            <div className="navbar-end">
                <div className="navbar-item">
                    {Auth.loggedIn() ?
                        <div className="buttons">
                            <NavLink to={`/profile/${Auth.getProfile().data.username}`} className="button is-primary">
                                <strong>Profile</strong>
                            </NavLink>
                            <NavLink onClick={Auth.logout} className="button is-light">
                                Log out
                            </NavLink>
                        </div>
                        :
                        <div className="buttons">
                            <NavLink to="/signup" className="button is-primary">
                                <strong>Sign up</strong>
                            </NavLink>
                            <NavLink to="/login" className="button is-light">
                                Log in
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
}

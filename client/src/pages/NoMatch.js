import React from 'react';
import { Link } from 'react-router-dom';

import Lost from '../assets/404.png'
import 'bulma/css/bulma.min.css';
import { Box } from 'react-bulma-components';
import {NavLink} from 'react-router-dom';

export default function NoMatch() {
    return (
        <Box>
            <img src={Lost} alt ='page not found'></img>
            <p>Page not found</p>
            <NavLink exact to="/">Click Here to go back home</NavLink>
        </Box>
    )
}
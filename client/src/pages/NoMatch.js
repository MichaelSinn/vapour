import React from 'react';

import Lost from '../assets/404.png'
import 'bulma/css/bulma.min.css';
import { Box } from 'react-bulma-components';

export default function NoMatch() {
    return (
        <Box>
            <img src={Lost} alt ='page not found'></img>
            <p>Page not found</p>
            <Link>Click Here to go back home</Link>
        </Box>
    )
}
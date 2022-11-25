import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import Auth from '../utils/auth';
import {LOGIN} from '../utils/queries'

//Import React BulmaUI components to build page
import 'bulma/css/bulma.min.css';
import { Box, Form, Container, Button, Icon } from 'react-bulma-components';

const Login = () => {

    const [formState, setFormState] = useState({ username: '', password: '' });
    
    const [login, { error, data }] = useLazyQuery(LOGIN);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const { data } = await login({
            variables: { ...formState },
          });
    
          Auth.login(data.login.token);
          
        } catch (e) {
          console.error(e);
        }
    
        setFormState({
          username: '',
          password: '',
        });
      };

    return (
        <Container>
            <Box>
                <Form.Field>
                    <Form.Label>Name</Form.Label>
                    <Form.Control>
                        <Form.Input placeholder="Username" name="name" value={formState.username} onChange={handleChange} />
                        <Icon align="left">
                            <i className="fas fa-user" />
                        </Icon>
                    </Form.Control>
                    {error && (
                    <Form.Help color="danger">{error.message}</Form.Help>
                    )}
                </Form.Field>
                <Link></Link>
                <Form.Field>
                    <Form.Label>Password</Form.Label>
                    <Form.Control>
                        <Form.Input placeholder="Password" name="password" type="password" value={formState.password} onChange={handleChange} />
                        <Icon align="left">
                            <i className="github" />
                        </Icon>
                    </Form.Control>
                    {error && (
                    <Form.Help color="danger">{error.message}</Form.Help>
                    )}
                </Form.Field>
                <Link to = '/signup'>Don't have an account? Signup here</Link>
                <Button.Group>
                <Button fullwidth rounded color="primary" to = '/' onClick={() => handleFormSubmit}>Login</Button>
                </Button.Group>

            </Box>
        </Container>
    )
}

export default Login
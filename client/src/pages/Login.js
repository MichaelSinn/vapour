import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
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
                <form onSubmit={handleFormSubmit}>
                    <Form.Field>
                        <Form.Label>Userame</Form.Label>
                        <Form.Control>
                            <Form.Input placeholder="Username" name="username" type='text' value={formState.username} onChange={handleChange} />
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
                    <Button fullwidth rounded color="primary" type='submit'>Login</Button>
                    </Button.Group>
                </form>
            </Box>
        </Container>
    )
}

export default Login
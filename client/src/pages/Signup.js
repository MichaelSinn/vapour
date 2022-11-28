import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'

import Auth from '../utils/auth'

//Import React BulmaUI components to build page
import 'bulma/css/bulma.min.css';
import { Box, Form, Container, Button, Icon } from 'react-bulma-components';

const Signup = () => {

    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER)

    const [errors, updateErrors] = useState([]);

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            console.log("hey")
            const { data } = await addUser({
                variables: { ...formState },
              });
              
          Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <Container>
            <Box>
            { data ? (
              <p>
                Success! Your account has been created!
                <Link to="/">back to the homepage.</Link>
                </p>
            ) : (
                <form onSubmit={handleFormSubmit}>
                {/* Username Field */}
                    <Form.Field>
                        <Form.Label>Username</Form.Label>
                        <Form.Control>
                            <Form.Input placeholder="Username" name="username" type='text' value={formState.username} onChange={handleChange} onBlur={(e) => {
                        if (formState.username.length === 0 && !errors.includes('Usermame is required')) updateErrors([...errors, 'Usermame is required']);
                        else {
                            const updatedErrors = errors.map(error=>{
                                return (error !== 'Usermame is required');
                            })
                            updateErrors(updatedErrors);
                        }
                    }}/>
                            <Icon align="left">
                                <i className="" />
                            </Icon>
                        </Form.Control>
                        {errors.includes('Usermame is required') && (
                    <Form.Help color="danger">Usermame is required</Form.Help>
                    )}
                    </Form.Field>
                    {/* Email form */}
                    <Form.Field>
                        <Form.Label>Email</Form.Label>
                        <Form.Control>
                            <Form.Input placeholder="example@email.com" name="email" type='email' value={formState.email} onChange={handleChange} onBlur={(e) => {
                            if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formState.email) === false && !errors.includes('Email is invalid')) updateErrors([...errors, 'Email is invalid']);
                            else {
                                const updatedErrors = errors.map(error=>{
                                    return (error !== 'Email is invalid');
                                })
                                updateErrors(updatedErrors);
                            }
                        }}/>
                            <Icon align="left">
                                <i className="fas fa-user" />
                            </Icon>
                        </Form.Control>
                        {errors.includes('Email is invalid') && (
                    <Form.Help color="danger">Email is invalid</Form.Help>
                    )}
                    </Form.Field>
                    {/* link to login page */}
                    <Form.Field>
                        <Form.Label>Password</Form.Label>
                        <Form.Control>
                            <Form.Input placeholder="Password" name="password" type="password" value={formState.password} onChange={handleChange} />
                            <Icon align="left">
                                <i className="Github" />
                            </Icon>
                        </Form.Control>
                    </Form.Field>
                    {/* Password box */}
                    <Link to='/login'>Already have an account? Login here.</Link>
                    <Button.Group>
                    <Button fullwidth rounded color="primary" type = 'submit'>Signup</Button>
                    </Button.Group>
                    </form>
                )}
            </Box>
        </Container>
    );
};

export default Signup;
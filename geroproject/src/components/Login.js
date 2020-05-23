import React, { Component } from 'react';
import axios from 'axios';

import { Image, Container, Form, Button } from 'react-bootstrap';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = (event) => {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? 
        this.setState({ [name]: checked }) : 
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        axios.get(`https://kvhgeronimo.herokuapp.com/soldier/${this.state.password}`)
            .then(response => {
                if (response.data.name === this.state.username && response.data.password === this.state.password) {
                    console.log("Logged In")
                    localStorage.setItem("logged", true)
                    localStorage.setItem("username", this.state.username)
                    localStorage.setItem("id", response.data._id)
                    localStorage.setItem("nameFull", response.data.nameFull)
                    response.data.isAdmin && localStorage.setItem("isAdmin", true)
                    this.props.loggingOn()
                }
                else console.log("Wrong username or password", response.data.name, response.data.password)
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <Container 
                style={{
                    position: 'absolute', maxWidth: '350px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'
                }}
            >   
                <Image style={{
                    position: 'relative', maxWidth: '350px', left: '50%', transform: 'translate(-50%, -10%)'
                }} src="https://www.509thgeronimo.org/images/509pibblack.jpg" fluid />
                <Form className="text-center">
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text" 
                            placeholder="Enter username"
                            className="text-center"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            className="text-center"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button variant="dark" onClick={this.handleSubmit}>Log In</Button>
                </Form>
            </Container>
        )
    }
}

export default Login;
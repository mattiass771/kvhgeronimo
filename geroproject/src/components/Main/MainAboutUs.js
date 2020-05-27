import React, { Component } from 'react';
import axios from 'axios';

import { Col, Row, Image } from 'react-bootstrap';

class MainAboutUs extends Component {
    constructor() {
        super()
        this.state = {
            links: [],
            text: {}
        }
    }

    componentDidMount() {
        axios.get(`https://kvhgeronimo.herokuapp.com/aboutUs/geronimo`)
        .then(response => {
            this.setState({ 
                links: response.data.links,
                text: response.data.text
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <Row style={{marginTop: "15px"}}>
                <Col>
                    <h3 style={{textAlign: "center"}}>{this.state.text.title}</h3>
                    <Image className="about-image" src={this.state.links[0]} thumbnail fluid />
                    <p>{this.state.text.para1}</p>
                    <p>{this.state.text.para2}</p>
                </Col>
            </Row>
        )
    }
}

export default MainAboutUs;
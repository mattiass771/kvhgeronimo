import React, { Component } from 'react';
import axios from 'axios';

import { Image, Container, Row, Col } from 'react-bootstrap';
import GalleryImage from './GalleryImage';

class OpenGallery extends Component {
    constructor() {
        super()
        this.state = {
            galleries: [],
            popup: false,
            actualImage: ""
        }
    }

    //POPUP HANDLER
    togglePop = (link) => {
        this.setState({ popup: !this.state.popup, actualImage: link })
    }
    
    //props: galleryID, gallery = links, toggleGal

    componentDidMount() {
        axios.get(`https://geronimoprojectwebsite.herokuapp.com/gallery/${localStorage.getItem("galleryID")}`)
        .then(response => {
            this.setState({ galleries: response.data.links })
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentWillUnmount() {
        localStorage.removeItem("galleryID")
    }

    showGrid = () => {
        let output = []
        for (let link of this.state.galleries) {
            output.push(
                <Col onClick={() => this.togglePop(link)} key={link} className="gallery" lg={3} md={4} sm={6}>
                    <Image className="img" src={link} alt={link} thumbnail/>
                </Col>
            )

        }
        return output
    }

    render() {
        return (
            <Container>
                {this.state.popup ? <GalleryImage galleries={this.state.galleries} actualImage={this.state.actualImage} togglePop={this.togglePop} /> : false}
                <Row>
                    {this.showGrid()}
                </Row>
            </Container>
        )
    }
}

export default OpenGallery;
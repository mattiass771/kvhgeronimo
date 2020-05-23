import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';

import { Carousel } from 'react-bootstrap';

class MainCarousel extends Component {
    constructor() {
        super()
        this.state = {
            galleries: []
        }
    }

    componentDidMount() {
        axios.get(`https://kvhgeronimo.herokuapp.com/gallery`)
        .then(response => {
            this.setState({ 
                galleries: response.data
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleClick = (e) => {
        localStorage.setItem("galleryID", e.target.dataset.galleryid)
        console.log(e.target.dataset.galleryid)
        this.props.history.push("opengallery");
    }

    getCarousel = () => {
        let output = []
        for (let gallery of this.state.galleries) {
            output.push(
                <Carousel.Item key={gallery._id} className="carousel">
                    <img
                        className="d-block w-100"
                        alt={gallery._id}
                        src={gallery.showLink}
                    />
                    <Carousel.Caption onClick={this.handleClick}>
                        <h1 className="pointer-fade-on-hover" data-galleryid={gallery._id}>{gallery.name}</h1>
                    </Carousel.Caption>
                </Carousel.Item>
            )
        }
        return output
    }

    render () {
        return (
            <Carousel style={{marginTop: "-24px"}} interval={5000} indicators={false}>
                {this.getCarousel()}
            </Carousel>
        )
    }
}

export default withRouter(MainCarousel);
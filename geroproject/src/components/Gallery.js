import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

import { Carousel, Image, Container, Card } from 'react-bootstrap';

class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            galleries: []
        }
    }

    componentDidMount() {
        axios.get(`https://kvhgeronimo.herokuapp.com/gallery/`)
        .then(response => {
            this.setState({ galleries: response.data })
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleClick = (gal) => {
        localStorage.setItem("galleryID", gal._id)
        this.props.history.push("opengallery");
    }

    getGallery = () => {
        let slide = []
        let carouselItem = []
        let galleryShow = []
        let i = 0
        for (let gallery of this.state.galleries) {
            slide = []
            for (let link of gallery.links) {
                if ((gallery.links.indexOf(link)%2 === 0 && gallery.links.indexOf(link) !== 0)) {
                    carouselItem.push(
                        <Carousel.Item key={gallery.links.indexOf(link)}>
                            {slide}
                        </Carousel.Item>
                    )
                    slide = []
                } else if (gallery.links.indexOf(link) === gallery.links.length-1) {
                    slide.push(
                        <Image
                            key={gallery.links.indexOf(link)}
                            style= {{objectFit:"cover", height: "150px"}}
                            className="w-50"
                            alt="geronimo"
                            src={link}
                        />
                    )
                    carouselItem.push(
                        <Carousel.Item key={gallery.links.indexOf(link)}>
                            {slide}
                        </Carousel.Item>
                    )
                    slide = []
                }
                slide.push(
                        <Image
                            key={gallery.links.indexOf(link)}
                            style= {{objectFit:"cover", height: "150px"}}
                            className="w-50"
                            alt="geronimo"
                            src={link}
                        />
                    )
            }
            galleryShow.push(
                <Card key={i} className="block-background" style={{marginBottom: "15px", borderRadius:"5px"}}>
                    <Card.Header>
                        <h5 style={{textAlign: "center"}}>{gallery.name}</h5>
                        <Carousel style={{border:"3px solid whitesmoke", borderRadius:"5px"}} onClick={() => this.handleClick(gallery)} className="pointer-on-hover" interval={5000} controls={false} indicators={false} pause={false} >
                            {carouselItem}
                        </Carousel>
                    </Card.Header>
                    <Card.Body>
                        <p>{gallery.about}</p>
                    </Card.Body>
                </Card>
            )
            carouselItem = []
            i++
        }
        return galleryShow
    }

    render() {
            return (
                <Container>
                    {this.getGallery()}
                </Container>
            )
    }
}

export default withRouter(Gallery);
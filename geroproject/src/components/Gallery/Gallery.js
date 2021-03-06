import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

import { Carousel, Image, Container, Card, Row, Button } from 'react-bootstrap';

import GalleryAddModal from './GalleryAddModal';
import GalleryEditModal from './GalleryEditModal';
import DeleteFromDb from '../DeleteFromDB';

class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            galleries: [],
            popup: false,
            deleteItem: false,
            editItem: false,
            passID: ""
        }
    }

    componentDidMount() {
        this.toggleRefresh()
    }

    toggleRefresh = () => {
        axios.get(`https://kvhgeronimo.herokuapp.com/gallery/`)
        .then(response => {
            this.setState({ galleries: response.data.reverse() })
        })
        .catch(error => {
            console.log(error);
        });
    }

    togglePop = () => {
        this.setState({ popup: !this.state.popup })
    }

    toggleDeleteItem = (e) => {
        this.setState({ deleteItem: !this.state.deleteItem, passID: e.currentTarget.dataset.itemid })
    }

    closeDeleteItem = () => {
        this.setState({ deleteItem: !this.state.deleteItem, passID: "" })
    }

    toggleEditItem = (e) => {
        this.setState({ editItem: !this.state.editItem, passID: e.currentTarget.dataset.itemid })
    }

    closeEditItem = () => {
        this.setState({ editItem: !this.state.editItem, passID: "" })
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
                    {localStorage.getItem("isAdmin") &&
                    <Button onClick={this.toggleDeleteItem} data-itemid={gallery._id} size="sm" variant="outline-dark" style={{width: "100%", marginBottom: "1px", height:"20px"}}><span style={{position:"relative", top:"-4px"}}>Delete</span></Button>}
                    {localStorage.getItem("isAdmin") &&
                    <Button onClick={this.toggleEditItem} data-itemid={gallery._id} size="sm" variant="outline-dark" style={{width: "100%", height:"20px"}}><span style={{position:"relative", top:"-4px"}}>Edit</span></Button>}
                    <Card.Header>
                        <h5 style={{textAlign: "center"}}>{gallery.name}</h5>
                        <Carousel style={{border:"3px solid whitesmoke", borderRadius:"5px"}} onClick={() => this.handleClick(gallery)} className="pointer-on-hover" interval={5000} controls={false} indicators={false} pause={false} >
                            {carouselItem}
                        </Carousel>
                    </Card.Header>
                    <Card.Body style={{whiteSpace: "pre-line"}}>
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
                    {localStorage.getItem("isAdmin") &&
                    <Row className="justify-content-center">
                        <Button variant="outline-dark" style={{marginBottom: "15px"}} onClick={this.togglePop}>Add Gallery</Button>
                    </Row>}
                    {this.state.deleteItem && <DeleteFromDb toggleRefresh={this.toggleRefresh} collectionID="gallery" itemID={this.state.passID} toggleDeleteItem={this.closeDeleteItem} />}
                    {this.state.editItem && <GalleryEditModal itemID={this.state.passID} toggleRefresh={this.toggleRefresh} togglePop={this.closeEditItem} />}
                    {this.state.popup && <GalleryAddModal toggleRefresh={this.toggleRefresh} togglePop={this.togglePop} />}
                    {this.getGallery()}
                </Container>
            )
    }
}

export default withRouter(Gallery);
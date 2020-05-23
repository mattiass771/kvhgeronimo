import React, { Component } from 'react';

import { Image, Modal } from 'react-bootstrap';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

class GalleryImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popup: true,
            controls: false,
            newImage: this.props.actualImage
        }  
    }

    //props: actualImage: link of starting image, galleries: all links

    handleClose = () => {
        this.props.togglePop()
        this.setState({ popup: false })
    }

    handleControls = () => {
        this.setState({ controls: !this.state.controls })
    }

    nextImage = () => {
        let index = this.props.galleries.indexOf(this.state.newImage)
        index === this.props.galleries.length-1 ? this.setState({ newImage: this.props.galleries[0] }) : 
        this.setState({ newImage: this.props.galleries[index+1] })
    }

    prevImage = () => {
        let index = this.props.galleries.indexOf(this.state.newImage)
        index ? this.setState({ newImage: this.props.galleries[index-1] }) :
        this.setState({ newImage: this.props.galleries[this.props.galleries.length-1] })
    }

    render() {
        return (    
            <Modal size="lg" show={this.state.popup} onHide={this.handleClose}>
                <Modal.Body className="block-background" onMouseEnter={this.handleControls} onMouseLeave={this.handleControls} >
                    { this.state.controls && <AiFillCaretLeft onClick={this.prevImage} className="leftArrow" /> }
                    { this.state.controls && <AiFillCaretRight onClick={this.nextImage} className="rightArrow" /> }
                    <Image src={this.state.newImage} alt={this.props.actualImage} fluid />
                </Modal.Body>
            </Modal>
        );
    }
}
  
export default GalleryImage;
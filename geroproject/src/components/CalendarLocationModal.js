import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';

class CalendarCompareModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popup: true,
            link: ""
        }  
    }

    //PROPS: mapLink

    handleClose = () => {
        this.props.closePop()
        this.setState({ popup: false })
    }

    componentDidMount() {
        this.setState({ link: `https://www.google.com/maps/embed/v1/place?key=AIzaSyCPCVFHmwpm0e8la38jOrQzYj9SxCJFxoM&q=${this.props.mapLink}&maptype=satellite`  })
    }

    render() {
        return (    
            <Modal size="lg" show={this.state.popup} onHide={this.handleClose}>
                <Modal.Body>
                    <iframe
                        title="map"
                        width="100%"
                        height="500px"
                        frameBorder="0" 
                        src={this.state.link}
                        >
                    </iframe>
                </Modal.Body>
            </Modal>
        );
    }
}
  
export default CalendarCompareModal;
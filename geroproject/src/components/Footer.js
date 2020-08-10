import React from 'react';

import { Row, Col, Container } from 'react-bootstrap';

import { FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <Container>
            <Row>
                <Col style={{margin:"30px 15px", textAlign: "center", borderTop: "1px solid #787671"}}>
                    <br />
                    <span style={{color: "#555"}}><FaEnvelope style={{width: "25px", height: "25px", top:"-3px", position: "relative"}} />&nbsp;kvh.geronimo@gmail.com&nbsp;&nbsp;</span>
                    <a rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/kvh_geronimo/" className="footer-link"><FaInstagram style={{width: "25px", height: "25px", top:"-3px", position: "relative"}} />&nbsp;kvh_geronimo&nbsp;&nbsp;</a>
                    <a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/geronimo509thPIB" className="footer-link"><FaFacebook style={{width: "25px", height: "25px", top:"-3px", position: "relative"}} />&nbsp;KVH Geronimo Reenactment Group&nbsp;&nbsp;</a>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;
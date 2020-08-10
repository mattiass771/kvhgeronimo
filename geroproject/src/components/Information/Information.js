import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

const Information = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>SK91650000000000 20555150</h2>
                    <h2>IČO42164656</h2>
                    <h2>Predseda Klubu</h2>
                    <p>Dávid Stojaspal</p>
                    <h2>Podpredseda Klubu</h2>
                    <p>Andrej Ladanyi</p>
                </Col>
                <Col>
                    <h3>Email</h3>
                    <p>kvh.geronimo@gmail.com</p>
                    <h3>Sídlo</h3>
                    <p>KVH Geronimo, (Klub Vojenskej Histórie Geronimo) Novoviesska 212 94634 Bátorove Kosihy</p>
                    <h4>Právna forma</h4>
                    <p>Združenie (zväz,spolok)</p>
                </Col>
            </Row>    
            <Row>
                    <h4>Chcete nás podporiť? / Do you want to support us?</h4>
                    <p>KVH Geronimo je dobrovoľné, nevládne a neziskové združenie občanov. Nepodporuje, nesympatizuje a nepropaguje žiadnu politickú stranu alebo hnutie šíriace rasovú, náboženskú ani inú diskrimináciu a násilie.</p>
                    <p>Venujeme sa vojenskej histórii, s cieľom vzdať hold pamiatke padlým a preživším vojakom bojujúcim v druhej svetovej vojne.</p>
                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                        <input type="hidden" name="cmd" value="_s-xclick" />
                        <input type="hidden" name="hosted_button_id" value="JUQ9T6D7B9YQJ" />
                        <input type="image" src="https://images-na.ssl-images-amazon.com/images/I/71mWjwc2QOL._AC_SY741_.jpg" width="auto" height="250px" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                        <img alt="" border="0" src="https://www.paypal.com/en_SK/i/scr/pixel.gif" width="1" height="1" />
                    </form>
                    <img width="auto" height="250px" src="https://i.pinimg.com/originals/8e/29/85/8e29853f519282314f09022d4da3b921.png" />
            </Row>
        </Container>
    )
}

export default Information;
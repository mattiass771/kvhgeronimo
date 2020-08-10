import React from 'react';

import { Container, Row, Col, Image } from 'react-bootstrap';

const Information = () => {
    return (
        <Container>
            <h3 style={{textAlign:"center"}}>Chcete nás podporiť? / Do you want to support us?</h3><br />
            <Row style={{textAlign:"center"}}>  
                <Col>
                    <p>KVH Geronimo je dobrovoľné, nevládne a neziskové združenie občanov. Nepodporuje, nesympatizuje a nepropaguje žiadnu politickú stranu alebo hnutie šíriace rasovú, náboženskú ani inú diskrimináciu a násilie.</p>
                    <p>Venujeme sa vojenskej histórii, s cieľom vzdať hold pamiatke padlým a preživším vojakom bojujúcim v druhej svetovej vojne.</p>
                    <p>Ak vás náš klub zaujal natoľko, že by ste sa k nám chceli pridať, Uncle Sam hľadá stále nových dobrovoľníkov!</p>
                    <Image height="180px" src="https://i.imgur.com/Abo0GBr.png" />
                </Col>
                <Col>
                    <h5>Kúpou "War Bondov" podporíte klub v jeho aktivitách a ďaľšom fungovaní!<br />/ Buy "War Bonds" to support the group in its further activities!</h5>
                    <form style={{marginTop: "10px", marginLeft: "5px"}} action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                        <input type="hidden" name="cmd" value="_s-xclick" />
                        <input type="hidden" name="hosted_button_id" value="JUQ9T6D7B9YQJ" />
                        <input className="war-bonds" type="image" src="https://i.imgur.com/YJkl54P.png?1" height="350px" border="0" name="submit" alt="" />
                    </form>
                </Col>
            </Row>
            <br />
            <h3 style={{textAlign:"center"}}>Informácie o klube</h3><br />
            <Row style={{textAlign:"center"}}>
                <Col>
                    <h4>Číslo účtu</h4>
                    <p>SK9165000000000020555150</p>
                    <h4>IČO</h4>
                    <p>42164656</p>
                    <h4>Predseda Klubu</h4>
                    <p>Dávid Stojaspal</p>
                    <h4>Podpredseda Klubu</h4>
                    <p>Andrej Ladanyi</p>
                </Col>
                <Col>
                    <h4>Email</h4>
                    <p>kvh.geronimo@gmail.com</p>
                    <h4>Sídlo</h4>
                    <p>KVH Geronimo, (Klub Vojenskej Histórie Geronimo) Novoviesska 212 94634 Bátorove Kosihy</p>
                    <h4>Právna forma</h4>
                    <p>Združenie (zväz,spolok)</p>
                </Col>
            </Row>    
        </Container>
    )
}

export default Information;
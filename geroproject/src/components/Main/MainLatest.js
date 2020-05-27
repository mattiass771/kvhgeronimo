import React, { useState, Fragment } from 'react';
import axios from 'axios';

import { Row, Col, Card, Carousel, Image } from 'react-bootstrap';

const MainLatest = () => {
    const [report, setReport] = useState({})
    const [calendar, setCalendar] = useState({})
    const [loaded, setLoaded] = useState(false)

    !loaded &&
    axios.get(`https://kvhgeronimo.herokuapp.com/calendar`)
        .then(res => {
            (res.data[res.data.length-1] &&
            setCalendar(res.data[res.data.length-1]));
        })
        .catch(err => {
            console.log(err)
        })

    !loaded &&
    axios.get(`https://kvhgeronimo.herokuapp.com/reports`)
        .then(res => {
            setLoaded(true);
            (res.data[res.data.length-1] &&
            setReport(res.data[res.data.length-1]));
        })
        .catch(err => {
            console.log(err)
        })

    const getCarousel = (rep) => {
        let output = []
        rep.links.map((link, i) => {
            output.push(
                <Carousel.Item key={i}>
                    <img
                        style={{
                            maxHeight: "350px",
                            width: "auto",
                            objectFit: "cover",
                            objectPosition: "center",
                            borderRadius: "5px",
                            border: "4px solid whitesmoke"}}
                        className="d-block w-100"
                        alt={link}
                        src={link}
                    />
                </Carousel.Item>
            )
        })
        return output
    }

    return (
        <Fragment>
            <Row>
                <Col lg={6}>
                    <h3 style={{textAlign: "center"}}>LATEST REPORT</h3>
                    <Card className="block-background" style={{marginBottom:"15px", borderRadius:"5px"}}>
                        <Card.Header>
                            <Carousel interval={null}>
                                {(loaded && report.links !== undefined) && getCarousel(report)}
                            </Carousel>
                            <Image style={{position: "absolute", top:"-41px"}} src="https://i.imgur.com/jawkXJV.png?3" fluid/>
                        </Card.Header>
                        <Card.Body style={{textAlign:"center"}}>
                            <h3>{report.name}</h3>
                            <p>{report.text}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <h3 style={{textAlign: "center"}}>UPCOMING EVENT</h3>
                    <Card className="block-background" style={{marginBottom:"15px", borderRadius:"5px"}}>
                        <Card.Header style={{textAlign:"center", height: "325px"}}>
                            <Image style={{position: "absolute", top:"-41px"}} src="https://i.imgur.com/jawkXJV.png?3" fluid/>
                            <Image style={{
                                height: "300px",
                                width: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                                borderRadius: "5px",
                                border: "0.5px solid whitesmoke"}} src={calendar.link} thumbnail fluid/>
                        </Card.Header>
                        <Card.Body style={{textAlign:"center"}}>
                            <h3>{calendar.name}</h3>
                            <p>{calendar.text}</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

export default MainLatest;
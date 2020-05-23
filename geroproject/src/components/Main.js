import React, { Component } from 'react';

import MainCarousel from './MainCarousel';
import MainAboutUs from './MainAboutUs';
import { Container } from 'react-bootstrap';

class Main extends Component {
    // constructor() {
    //     super()
    //     this.state = {
    //     }
    // }

    render() {
        return (
            <Container>
                <MainCarousel />
                <MainAboutUs />
            </Container>
        )
    }
}

export default Main;
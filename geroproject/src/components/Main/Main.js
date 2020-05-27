import React from 'react';

import MainCarousel from './MainCarousel';
import MainAboutUs from './MainAboutUs';
import MainLatest from './MainLatest';
import { Container } from 'react-bootstrap';

const Main = () => {
    return (
        <Container>
            <MainCarousel />
            <MainAboutUs />
            <MainLatest />
        </Container>
    )
}

export default Main;
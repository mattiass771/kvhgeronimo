import React from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";

function Navibar() {

    const clearLocal = () => {
        localStorage.clear()
    }

    return (
        <Container>
            <Navbar style={{borderRadius:"5px"}} className="block-background" variant="light" bg="light" expand="lg">
                <Navbar.Brand href="/">KVH Geronimo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/platoon">Platoon</Nav.Link>
                        <Nav.Link href="/gallerycli">Gallery</Nav.Link>
                        <Nav.Link href="/reportscli">Reports</Nav.Link>
                        {localStorage.getItem("logged") && 
                        <Nav.Link href="/calendarcli">Calendar</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {localStorage.getItem("logged") ?
                    <Nav>
                        <Nav.Link href="/soldiers">Compare Equipment</Nav.Link>
                        <Nav.Link href="/user">{localStorage.getItem("nameFull")}</Nav.Link>
                        <Button href="/" onClick={clearLocal} variant="outline-dark">Sign Out</Button>
                    </Nav> :
                    <Nav>
                        <Button href="/login" onClick={clearLocal} variant="outline-dark">Sign In</Button>
                    </Nav>}
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}
 
export default Navibar;
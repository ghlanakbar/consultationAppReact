import React from 'react';

import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Link to={""} className="navbar-brand">
                App
            </Link>
            <Nav className="mr-auto">
                <Link to={"add"} className="nav-link">Consultation</Link>
                <Link to={"list"} className="nav-link">Liste des Consultations</Link>
                
            </Nav>
        </Navbar>
    );
}
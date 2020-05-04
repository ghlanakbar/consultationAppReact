import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Consultation from './components/Consultation';
import ConsultationList from './components/ConsultationList';

import Footer from './components/Footer';

export default function App() {

  const heading = "Binvenu!";
  const quote = "Consultation.";
  const footer = "ConsultationApp";

  return (
    <Router>
        <NavigationBar/>
        <Container>
            <Row>
                <Col lg={12} className={"margin-top"}>
                    <Switch>
                        <Route path="/" exact component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                        <Route path="/add" exact component={Consultation}/>
                        <Route path="/edit/:id" exact component={Consultation}/>
                        <Route path="/list" exact component={ConsultationList}/>
                        
                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}

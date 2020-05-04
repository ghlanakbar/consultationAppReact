import React, {Component} from 'react';

import './Style.css';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from './MyToast';
import axios from 'axios';

export default class ConsultationList extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            consultations : [],
            search : '',
            currentPage : 1,
            ConsultationsPerPage : 5,
            sortToggle : true
        };
    }

    sortData = () => {
        this.setState(state => ({
            sortToggle : !state.sortToggle 
        }));
        this.findAllConsultations(this.state.currentPage);
    }

    componentDidMount() {
        this.findAllConsultations(this.state.currentPage);
    }

    

    findAllConsultations(currentPage) {
        currentPage -= 1;
        let sortDir = this.state.sortToggle ? "asc" : "desc";
        axios.get("http://localhost:8081/rest/consultations?pageNumber="+currentPage+"&pageSize="+this.state.ConsultationsPerPage+"&sortBy=nom&sortDir="+sortDir)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    consultations: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    

    deleteConsultation = (consultationId) => {
        axios.delete("http://localhost:8081/rest/consultations/"+consultationId)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        consultations: this.state.consultations.filter(consultation => consultation.id !== consultationId)
                    });
                } else {
                    this.setState({"show":false});
                }
            });
    };

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        if(this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllConsultations(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if(this.state.currentPage > firstPage) {
            if(this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllConsultations(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllConsultations(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.ConsultationsPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllConsultations(condition);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.ConsultationsPerPage)) {
            if(this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllConsultations(this.state.currentPage + 1);
            }
        }
    };

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({"search" : ''});
        this.findAllConsultations(this.state.currentPage);
    };

    searchData = (currentPage) => {
        currentPage -= 1;
        axios.get("http://localhost:8081/rest/consultations/search/"+this.state.search+"?page="+currentPage+"&size="+this.state.ConsultationsPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    consultations: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    render() {
        const {consultations, currentPage, totalPages, search} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Consultation Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-white text-dark"}>
                    <Card.Header>
                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> Liste des Consultations
                        </div>
                        <div style={{"float":"right"}}>
                             <InputGroup size="sm">
                                <FormControl placeholder="Search" name="search" value={search}
                                    className={"info-border bg-white text-dark"}
                                    onChange={this.searchChange}/>
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </Button>
                                    <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </InputGroup.Append>
                             </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="white">
                            <thead>
                                <tr>
                                <th onClick={this.sortData}>Nom <div className={this.state.sortToggle ? "arrow arrow-down" : "arrow arrow-up"}> </div></th>
                                  <th>Prénom</th>
                                  <th>Poids</th>
                                  <th>Taille</th>
                                  <th>Groupe Sanguin</th>
                                  <th>Sex</th>
                                  <th>Observation</th>
                                  <th>Date de Naissance</th>
                                  
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    consultations.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="7">No Consultation Available.</td>
                                    </tr> :
                                    consultations.map((consultation) => (
                                    <tr key={consultation.id}>
                                        <td>
                                            <Image src={consultation.photoURL} roundedCircle width="25" height="25"/> {consultation.nom}
                                        </td>
                                        <td>{consultation.prenom}</td>
                                        <td>{consultation.poids}</td>
                                        <td>{consultation.taille}</td>
                                        <td>{consultation.groupe}</td>
                                        <td>{consultation.sex}</td>
                                        <td>{consultation.observation}</td>
                                        <td>{consultation.date}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit/"+consultation.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteConsultation.bind(this, consultation.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                    {consultations.length > 0 ?
                        <Card.Footer>
                            <div style={{"float":"left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float":"right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward} /> Première
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl className={"page-num bg-white"} name="currentPage" value={currentPage}
                                        onChange={this.changePage}/>
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward} /> Suivant
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward} /> Dernière
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer> : null
                     }
                </Card>
            </div>
        );
    }
}
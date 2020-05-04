import React, {Component} from 'react';



import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';

export default class Consultation extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            sexs: [],
            groupes : [],
            show : false
        };
        this.ConsultationChange = this.ConsultationChange.bind(this);
        this.submitConsultation = this.submitConsultation.bind(this);
    }

    initialState = {
        id:'', nom:'', prenom:'', photoURL:'', poids:'', taille:'', groupe:'', sex:'', observation:'', date:''
    };

    componentDidMount() {
        const consultationId = +this.props.match.params.id;
        if(consultationId) {
            this.findConsultationById(consultationId);
        }
        this.findAllGroupes();
        this.findAllSexs();
    }

    findAllGroupes = () => {
        axios.get("http://localhost:8081/rest/consultations/groupes")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                	groupes: [{value:'', display:''}]
                        .concat(data.map(groupe => {
                            return {value:groupe, display:groupe}
                        }))
                });
            });
    };

    findAllSexs = () => {
        axios.get("http://localhost:8081/rest/consultations/sexs")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                	sexs: [{value:'', display:''}]
                        .concat(data.map(sex => {
                            return {value:sex, display:sex}
                        }))
                });
            });
    };

    
    findConsultationById = (consultationId) => {
        axios.get("http://localhost:8081/rest/consultations/"+consultationId)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        id: response.data.id,
                        nom: response.data.nom,
                        prenom: response.data.prenom,
                        photoURL: response.data.photoURL,
                        poids: response.data.poids,
                        taille: response.data.taille,
                        groupe: response.data.groupe,
                        sex: response.data.sex,
                        observation: response.data.observation,
                        date: response.data.date

                    });
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    };

    resetConsultation = () => {
        this.setState(() => this.initialState);
    };

    

    submitConsultation = event => {
        event.preventDefault();

        const consultation = {
            nom: this.state.nom,
            prenom: this.state.prenom,
            photoURL: this.state.photoURL,
            poids: this.state.poids,
            taille: this.state.taille,
            groupe: this.state.groupe,
            sex: this.state.sex,
            observation: this.state.observation,
            date: this.state.date
        };

        axios.post("http://localhost:8081/rest/consultations", consultation)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    

    updateConsultation = event => {
        event.preventDefault();

        const consultation = {
            id: this.state.id,
            nom: this.state.nom,
            prenom: this.state.prenom,
            photoURL: this.state.photoURL,
            poids: this.state.poids,
            taille: this.state.taille,
            groupe: this.state.groupe,
            sex: this.state.sex,
            observation: this.state.observation,
            date: this.state.date
        };

        axios.put("http://localhost:8081/rest/consultations", consultation)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"put"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    setTimeout(() => this.ConsultationList(), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    ConsultationChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    ConsultationList = () => {
        return this.props.history.push("/list"); 
    };

    render() {
        const {nom, prenom, photoURL, poids, taille, groupe, sex, observation, date} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Consultation Updated Successfully." : "Consultation Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-white text-dark"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Consultation" : "Ajouter Nouvelle Consultation"}
                    </Card.Header>
                    <Form onReset={this.resetConsultation} onSubmit={this.state.id ? this.updateConsultation : this.submitConsultation} id="consultationFormId">
                        <Card.Body>
                        <Card className={"border border-primary text-dark" } >
                    <Card.Header> Etat civil</Card.Header>
                     <Card.Body>
                            
                               <Form.Row>
                                
                    
                                <Form.Row>
                                <Form.Group as={Col} controlId="formGridNom">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="nom"
                                        value={nom} onChange={this.ConsultationChange}
                                        className={"bg-white text-dark"}
                                        placeholder="Nom" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPrenom">
                                    <Form.Label>Prénom</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="prenom"
                                        value={prenom} onChange={this.ConsultationChange}
                                        className={"bg-white text-dark"}
                                        placeholder="Prénom" />
                                </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                <Form.Group as={Col} controlId="formGridDate">
                                    <Form.Label>Date de Naissance</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="date" name="date"
                                        value={date} onChange={this.ConsultationChange}
                                        className={"bg-white text-dark"}
                                         />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridSex">
                                    <Form.Label>Sex</Form.Label>
                                    <Form.Control required as="select"
                                        custom onChange={this.ConsultationChange}
                                        name="sex" value={sex}
                                        className={"bg-white text-dark"}>
                                        {this.state.sexs.map(sex =>
                                            <option key={sex.value} value={sex.value}>
                                                {sex.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                
                                </Form.Row>
                                
                            
                                <Form.Group as={Col} controlId="formGridPotho">
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="photoURL"
                                        value={photoURL} onChange={this.ConsultationChange}
                                        className={"bg-white text-dark"}
                                         placeholder="Enter Photo URL"/>
                                </Form.Group>
                                </Form.Row>
                                </Card.Body>
                                </Card>
                                 <Card className={"border border-primary text-dark"}  style={{ marginTop: "0.5%"}} >
                    <Card.Header style={{color: ""}}> Consultation</Card.Header>
                     <Card.Body>
                                <Form.Row>
                                
                                <Form.Group as={Col} controlId="formGridGroupe">
                                    <Form.Label>Groupe sanguin</Form.Label>
                                    <Form.Control required as="select"
                                        custom onChange={this.ConsultationChange}
                                        name="groupe" value={groupe}
                                        className={"bg-white text-dark"}>
                                        {this.state.groupes.map(groupe =>
                                            <option key={groupe.value} value={groupe.value}>
                                                {groupe.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            
                                
                                <Form.Group as={Col} controlId="formGridPoids">
                                    <Form.Label>Poids</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="poids"
                                        value={poids} onChange={this.ConsultationChange}
                                        className={"bg-white text-dark"}
                                        placeholder="Kg" />
                                </Form.Group>
                                
                                <Form.Group as={Col} controlId="formGridTaille">
                                    <Form.Label>Taille</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="taille"
                                        value={taille} onChange={this.ConsultationChange}
                                        className={"bg-white text-dark"}
                                        placeholder="Cm" />
                                </Form.Group>
                                
                                
                                <Form.Group as={Col} controlId="formGridObservation">
                                    <Form.Label>observation</Form.Label>
                                    <Form.Control required as="textarea" rows="2" autoComplete="off"
                                        type="text" name="observation"
                                        value={observation} onChange={this.ConsultationChange}
                                        className={"bg-white text-dark"}
                                        placeholder="Observation" />
                                </Form.Group>
                                </Form.Row>
                                </Card.Body>
                               </Card>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Modifier" : "Enregistrer"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Refreche
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.ConsultationList.bind()}>
                                <FontAwesomeIcon icon={faList} /> liste des Cosultations
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}
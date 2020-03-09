import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import Aux from "../../../utils/Aux/aux.js";
import Form from "../form/form.js";


class BootModal extends Component {
    render() {
        return (
            <Aux>
 				<Modal
 				  show={this.props.show} 
 				  onHide={this.props.changeModal}	
			      size="lg"
			      aria-labelledby="contained-modal-title-vcenter"
			      centered
			    >
			      <Modal.Header closeButton>
			        <Modal.Title id="contained-modal-title-vcenter">
			          Form
			        </Modal.Title>
			      </Modal.Header>
			      <Modal.Body>
			        <Form/>
			      </Modal.Body>
			      
			    </Modal>
            </Aux>
        );
    };
};    

export default BootModal;
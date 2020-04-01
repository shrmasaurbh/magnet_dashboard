import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import Aux from "../../../utils/Aux/aux.js";
import AddLeadForm from "../form/addLeadForm";
// import updateLeadForm from "../form/updateLeadForm";


class LeadModal extends Component {
    render() {

    	const FROMS_TYPES = {
			"addLead" : AddLeadForm,
			// "updateLead" : updateLeadForm,
		}
		console.log(this.props.fromType);
		const Form_name = FROMS_TYPES[this.props.fromType];

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
			          	{Form_name === AddLeadForm ? "Add Lead" : "Update Lead"}
			        </Modal.Title>
			      </Modal.Header>
			      <Modal.Body>
			        <Form_name changeModal={this.props.changeModal}/>
			      </Modal.Body>
			    </Modal>
            </Aux>
        );
    };
};    

export default LeadModal;
import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import Aux from "../../../utils/Aux/aux.js";
import AddLeadForm from "../form/addLeadForm";
import updateForm from "../form/updateForm";


class LeadModal extends Component {
    render() {
			        // <AddProjectForm changeModal={this.props.changeModal}/>

  //   	const FROMS_TYPES = {
		// 	"addProject" : AddProjectForm,
		// 	"updateProject" : updateForm,
		// }
		// const Form_name = FROMS_TYPES[this.props.fromType];
			          // {Form_name === AddProjectForm ? "Add Project" : "Update Project"}

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
			        	Add Lead
			        </Modal.Title>
			      </Modal.Header>
			      <Modal.Body>
			        <AddLeadForm changeModal={this.props.changeModal}/>
			      </Modal.Body>
			    </Modal>
            </Aux>
        );
    };
};    

export default LeadModal;
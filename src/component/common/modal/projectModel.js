import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import Aux from "../../../utils/Aux/aux.js";
import AddProjectForm from "../form/addProjectFrom";
import updateForm from "../form/updateForm";


class ProjectModal extends Component {
    render() {
			        // <AddProjectForm changeModal={this.props.changeModal}/>

    	const FROMS_TYPES = {
			"addProject" : AddProjectForm,
			"updateProject" : updateForm,
		}
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
			          {Form_name === AddProjectForm ? "Add Project" : "Update Project"}
			        </Modal.Title>
			      </Modal.Header>
			      <Modal.Body>
			        <Form_name changeModal={this.props.changeModal} formData={this.props.formData}/>
			      </Modal.Body>
			    </Modal>
            </Aux>
        );
    };
};    

export default ProjectModal;
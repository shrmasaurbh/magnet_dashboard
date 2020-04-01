import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import Aux from "../../../utils/Aux/aux.js";
import NewUpdateLeadForm from "../form/NewUpdateLeadForm"; 
import CloseupdateForm from "../form/closeUpdateForm"; 
import RemindUpdateForm from "../form/remindUpdateForm.js"; 
import OpportunityUpdateForm from "../form/opportunityUpdateFrom.js"; 
import PipelineUpdateForm from "../form/pipelineUpdateForm"; 
import EoiUpdateForm from "../form/eoiUpdateForm"; 
import CancelUpdateForm from "../form/cancelUpdateForm"; 
import BookedUpdateForm from "../form/bookedUpdateForm"; 

class LeadModal extends Component {
    render() {

    	const FROMS_TYPES = {
			"not update" : BookedUpdateForm,
			"closed" : CloseupdateForm,
			"remind me later" : RemindUpdateForm,
			"opportunity" : OpportunityUpdateForm,
			"pipeline" : PipelineUpdateForm,
			"cancel" : CancelUpdateForm,
			"booked" : BookedUpdateForm,
			"gross eoi application" : EoiUpdateForm,
		}
		console.log("this.props.fromType============>",this.props.fromType);
		const Form_name = FROMS_TYPES[this.props.fromType];

        return (
            <Aux>
 				<Modal
 				  show={this.props.show} 
 				  onHide={(value)=>this.props.changeModal(this.props.fromType)}	
			      size="lg"
			      aria-labelledby="contained-modal-title-vcenter"
			      centered
			    >
			      <Modal.Header closeButton>
			        <Modal.Title id="contained-modal-title-vcenter">
			           Update Lead
			        </Modal.Title>
			      </Modal.Header>
			      <Modal.Body>
			        <Form_name changeModal={(value)=>this.props.changeModal(this.props.fromType)}/>
			      </Modal.Body>
			    </Modal>
            </Aux>
        );
    };
};    

export default LeadModal;
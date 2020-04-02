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
import {getLeadStatusData} from "../../../dataParser/commomDataApi";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class LeadModal extends Component {

	constructor(props) {
    	super(props);
		this.state = {
			status : [],
			status_id : ''
		}
	}	

	async componentDidMount(){

		this.setState({
			status : [],
			status_id : ''	
		})

	    console.log("lead Update *************** = +++++++++++++>",this.state)

	    var getStatusData = await getLeadStatusData();
	    console.log("getStatusData*********************=+++++++++++++>",getStatusData)

	    if(getStatusData.meta.status === 200){

	    	this.setState({status : getStatusData.data})

	    }else if(getStatusData.meta.status === 401){
    		
    		localStorage.clear();
    		this.props.history.push("/login");
    		
    	}else{

	        this.setState({status : getStatusData})
	    }

	}

	handleChange = event => {
		this.setState({[event.target.name]: event.target.value});
  	};

    render() {

    	const FROMS_TYPES = {
			1 : NewUpdateLeadForm, 
			7 : CloseupdateForm,
			2 : RemindUpdateForm,
			4 : OpportunityUpdateForm,
			3 : PipelineUpdateForm,
			8 : CancelUpdateForm,
			9 : BookedUpdateForm,
			6 : EoiUpdateForm,
		}

		const {status_id,status} = this.state;
		console.log("this.props.fromType============>",this.state.status_id);
		const Form_name = FROMS_TYPES[this.state.status_id];

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
			      	{status_id === '' ? 
				        <div className="col-lg-6 col-sm-6 col-6">
							<FormControl>
								    <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
							        <Select
							          	labelId="demo-controlled-open-select-label"
							          	value={status_id}
							          	onChange={this.handleChange}
							        	inputProps={{
							            	name: 'status_id',
							            	id: 'status_id',
							          	}}
							        >
							          	<MenuItem value="">
							            	<em>None</em>
							          	</MenuItem>
							          	{status ?
				    						(status.map(reg=>
						          				<MenuItem value={reg.status_id} key={reg.status_id}>{reg.status}</MenuItem>
			    							))   	
									      	:
									      	''
									    }  	
							        </Select>
								</FormControl>
						</div>
				        :
				        <Form_name changeModal={(value)=>this.props.changeModal(this.props.fromType)} leadStatus={this.state.status_id} leadID={this.props.fromType}/>
				    }
			      </Modal.Body>
			    </Modal>
            </Aux>
        );
    };
};    

export default LeadModal;
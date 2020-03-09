import React, {Component} from "react";
import "./filter.css";
import Aux from "../../utils/Aux/aux";
import { Multiselect } from 'multiselect-react-dropdown';

class Filter extends Component { 

	constructor(props) {
    	super(props);
		this.state = {
		    objectArray: [
		        { key: "Option 1" },
		        { key: "Option 2" },
		        { key: "Option 3" },
		        { key: "Option 4" },
		        { key: "Option 5" },
		        { key: "Option 6" },
		        { key: "Option 7" }
		      ]
		};
	}

	resetValues = () =>{
	  // By calling the belowe method will reset the selected values programatically
	  this.multiselectRef.current.resetSelectedValues();
	}

	getSelectedProject = () =>{
	  let selectedProject = this.multiselectRef.getSelectedItems();
	  console.log(selectedProject);
	}

	getfilterData =() =>{
		this.getSelectedProject();

	}


	render(){


		return(

			<Aux>
				<div className="container card shadow pt-3 p-0">
					<div className="row filterRow">
						<div className="col-lg-6 col-sm-6 col-6">
							<div className="form-group">
								<label>Project Name</label>
								<div className="input-group mb-3">
									<Multiselect
									  options={this.state.objectArray}
									  displayValue="key"
									  ref= {(ref)=>this.multiselectRef=ref}
									  placeholder="Project Name"
									/>
									<span id="firstName-error" className="error invalid-feedback">Please enter First Name</span>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-sm-6 col-6">
							<div className="form-group">
								<label>Source</label>
								<div className="input-group mb-3">
									<input type="text" id="source" className="form-control rounded-right" placeholder="Source" />
									<span id="firstName-error" className="error invalid-feedback">Please enter First Name</span>
								</div>
							</div>
						</div>
					</div>
					<div className="row filterRow">
						<div className="col-lg-6 col-sm-6 col-6">
							<div className="form-group">
								<label>Assign Date</label>
								<div className="input-group mb-3">
									<input type="text" id="assign_date" className="form-control rounded-right" placeholder="Assign Date" />
									<span id="firstName-error" className="error invalid-feedback">Please enter Assign Date</span>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-sm-6 col-6">
							<div className="form-group">
								<label>Visit Date</label>
								<div className="input-group mb-3">
									<input type="text" id="visit_date" className="form-control rounded-right" placeholder="Visit Date" />
									<span id="firstName-error" className="error invalid-feedback">Please enter Visit Date</span>
								</div>
							</div>
						</div>
					</div>
					<div className="row filterRow">
						<div className="col-lg-6 col-sm-6 col-6">
							<div className="form-group">
								<label>Comming Date</label>
								<div className="input-group mb-3">
									<input type="text" id="comming_date" className="form-control rounded-right" placeholder="Comming Date" />
									<span id="firstName-error" className="error invalid-feedback">Please enter Comming Date</span>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-sm-6 col-6">
							<div className="form-group">
								<label>Follow Up Date</label>
								<div className="input-group mb-3">
									<input type="text" id="follow_up_date" className="form-control rounded-right" placeholder="Follow Up Date" />
									<span id="firstName-error" className="error invalid-feedback">Please enter Follow Up Date</span>
								</div>
							</div>
						</div>
					</div>
					<div className="row filterRow">
						<div className="col-lg-6 col-sm-6 col-6">
							<div className="form-group">
								<label>Client Type</label>
								<div className="input-group mb-3">
									<input type="text" id="client_type" className="form-control rounded-right" placeholder="Client Type" />
									<span id="firstName-error" className="error invalid-feedback">Please enter Client Type</span>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-sm-6 col-6">
							<div className="form-group">
								<label>Budget</label>
								<div className="input-group mb-3">
									<input type="text" id="budget" className="form-control rounded-right" placeholder="Budget" />
									<span id="firstName-error" className="error invalid-feedback">Please enter Budget</span>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6 text-right col-6">
							<div className="form-group">
								<button type="submit" className="btn btn-success" onClick={this.getfilterData}>Apply</button>
							</div>
						</div>
						<div className="col-sm-6 col-6">	
							<div className="form-group">
								<button type="submit" className="btn btn-danger">Reset</button>
							</div>
						</div>	
					</div>	
				</div>	
			</Aux>
		);
	};
};

export default Filter;

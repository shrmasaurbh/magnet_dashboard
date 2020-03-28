import React, {Component} from 'react';
import Aux from "../../../utils/Aux/aux.js";
import {withRouter} from "react-router-dom";
import "./form.css";
import {addProject} from "../../../dataParser/getProjectData";
import {Form} from 'react-bootstrap';
import SweetAlert from "../../../component/common/sweetAlert/sweetAlertSuccess";
import {getRegion} from "../../../dataParser/getProjectData";
import TextField from '@material-ui/core/TextField';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import ApartmentRoundedIcon from '@material-ui/icons/ApartmentRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import GpsFixedRoundedIcon from '@material-ui/icons/GpsFixedRounded';
import FormControl from '@material-ui/core/FormControl';

const validateName = RegExp(/^[a-zA-Z ]+$/);
const validateNumber = RegExp(/^(\d{6}|\d{7})$/);

class addProjectFrom extends Component {

	constructor(props) {
    	super(props);
		this.state = {
			project_addedby : '',
      		project_name : '',
      		builder_name : '',
      		region : '',
      		region_id : '',
      		location : '',
      		project_id_99 : '',
            sweetShow:false,
            type : "",
            title : "",
            errorInput: false,
            errors : {
            	project_name : '',
            	builder_name : '',
            	location : '',
            	project_id_99 : '',
            	region_id : ''
            } 
		};
	}

	async componentDidMount(){

		var homesfy_lg =(localStorage.getItem("homesfy_lg"));
		if(homesfy_lg && homesfy_lg !== ""){
	        let user = JSON.parse(window.atob(homesfy_lg));
	        var addedBy = user.id;
	        this.setState({project_addedby : addedBy})

	    }else{
	        var addedBy = '';
	        this.setState({project_addedby : addedBy})
	    }

	    var regionData = await getRegion();

	    if(regionData.meta.status === 200){

	        this.setState({region : regionData})
	    }else{

	        this.setState({region : regionData})
	    }

	}

	onChange = (e) => {

	    this.setState({ [e.target.name]: e.target.value });
 	}

 	addNewProject = async (e) =>{

 		e.preventDefault();

		const addProjectRequest = (({ project_addedby, project_name, builder_name, region_id, location, project_id_99 }) => ({
	      project_addedby,
	      project_name,
	      builder_name,
	      region_id,
	      location,
	      project_id_99
	    }))(this.state);

	    console.log("changePwdRequest XXXXXXXXXXXX",addProjectRequest)

	    if(addProjectRequest.project_addedby != "" && addProjectRequest.location != "" && validateName.test(addProjectRequest.project_name) 
	    	&&  addProjectRequest.project_name != "" &&  addProjectRequest.builder_name != "" 
	    	&& validateName.test(addProjectRequest.builder_name) && addProjectRequest.project_id_99 != "" && addProjectRequest.region_id != "" 
	    	&& validateNumber.test(addProjectRequest.project_id_99)){
	    	
	    	var addProjectRes = await addProject(addProjectRequest);
		    console.log("changePwdRequest XXXXXXXXXXXX",addProjectRes);

		    if(addProjectRes.meta.status === 201){
		    	
		    	console.log("insert successfully !!!");

		    	this.setState({
	                sweetShow:true,
	                type : "success",
	                title : "Project Added Successfully!!!"

	            });

		    }else if(addProjectRes.meta.status === 401){
        		
        		localStorage.clear();
        		this.props.history.push("/login");
        		
        	}else{
		    	
		    	this.setState({
	                sweetShow:true,
	                type : "error",
	                title : addProjectRes.meta.message
	            });
		    }
	    }else{

	    	if(this.state.project_name == "" || validateName.test(this.state.project_name)=== false){
	    		console.log("in the error log");

	            this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        project_name: '*please select valid project name'
				    }
				}))
	    	}else{

	    		this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        project_name: ''
				    }
				}))
	    	}

	    	if(this.state.builder_name == "" || validateName.test(this.state.builder_name)=== false){

	            this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        builder_name: '*please select valid builder name'
				    }
				}))
	    	}else{

	    		this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        builder_name: ''
				    }
				}))
	    	}

	    	if(this.state.location == "" || validateName.test(this.state.location)=== false){

	            this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        location: '*please select valid location'
				    }
				}))
	    	}else{

	    		this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        location: ''
				    }
				}))
	    	}

	    	if(this.state.project_id_99 == "" || validateNumber.test(this.state.project_id_99)=== false){

	            this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        project_id_99: '*please select valid 99 project Id'
				    }
				}))
	    	}else{

	    		this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        project_id_99: ''
				    }
				}))
	    	}

	    	if(this.state.region_id == ""){

	            this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        region_id: '*please select region'
				    }
				}))
	    	}else{

	    		this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        region_id: ''
				    }
				}))
	    	}

	    }
 	}

 	handleSweet=()=>{
    	this.props.changeModal()
        this.setState({sweetShow : !this.state.sweetShow});
    }

    render() {
	 	
	    const {region,sweetShow,type,title,errorInput,region_id} = this.state;
	    console.log(this.state);

        return (
            <Aux>
            	<div className="projectForm">
                    <SweetAlert show={sweetShow} type={type} title={title} changeSweet={this.handleSweet}/>
					<form role="form">
						<div className="card-body">
							<div className="row">
								<div className="col-sm-6 mb-3">
									<div className="form-group">
										<TextField
											error = {this.state.errors.builder_name !== '' ? 'error' : ''}
											required
									        id="builder_name"
									        name="builder_name"
									        label="Builder Name"
									        helperText={this.state.errors.builder_name !== '' ? this.state.errors.builder_name : ''}
									        onChange={this.onChange}
									        InputProps={{
									          startAdornment: (
									            <InputAdornment position="start">
									              <ApartmentRoundedIcon />
									            </InputAdornment>
									          ),
									        }}
								      	/>	
									</div>
								</div>
								<div className="col-sm-6 mb-1">
									<div className="form-group">
										<TextField
											error = {this.state.errors.project_name !== '' ? 'error' : ''}
											required
									        id="project_name"
									        name="project_name"
									        label="Project Name"
									        helperText={this.state.errors.project_name !== '' ? this.state.errors.project_name : ''}
									        onChange={this.onChange}
									        InputProps={{
									          startAdornment: (
									            <InputAdornment position="start">
									              <BusinessRoundedIcon />
									            </InputAdornment>
									          ),
									        }}
								      	/>		
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6 mb-3">
								  	<FormControl>
									    <InputLabel id="demo-controlled-open-select-label">Select Region</InputLabel>
								        <Select
											error = {this.state.errors.region_id !== '' ? 'error' : ''}
								          labelId="demo-controlled-open-select-label"
								          value={region_id}
								          onChange={this.onChange}
								          inputProps={{
								            name: 'region_id',
								            id: 'region_id',
								          }}
									      helperText={this.state.errors.region_id !== '' ? this.state.errors.region_id : ''}
								        >
								          <MenuItem value="">
								            <em>None</em>
								          </MenuItem>
								          {region.data ?
					    						(region.data.map(reg=>
							          				<MenuItem value={reg.region_id} key={reg.region_id}>{reg.region_name}</MenuItem>
				    							))   	
										      	:
										      	''
										    }  	
								        </Select>
									</FormControl>
								</div>
								<div className="col-sm-6 mb-3">
									<div className="form-group">
										<TextField
											error = {this.state.errors.location !== '' ? 'error' : ''}
											required
									        id="location"
									        name="location"
									        label="Location"
									        helperText={this.state.errors.location !== '' ? this.state.errors.location : ''}
									        onChange={this.onChange}
									        InputProps={{
									          startAdornment: (
									            <InputAdornment position="start">
									              <GpsFixedRoundedIcon />
									            </InputAdornment>
									          ),
									        }}
								      	/>	
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6 mb-3">
									<div className="form-group">
										<TextField
											error = {this.state.errors.project_id_99 !== '' ? 'error' : ''}
											required
									        id="project99"
									        name="project_id_99"
									        helperText={this.state.errors.project_id_99 !== '' ? this.state.errors.project_id_99 : ''}
									        label="99 Project ID"
									        onChange={this.onChange}
									        InputProps={{
									          startAdornment: (
									            <InputAdornment position="start">
									              <BusinessRoundedIcon />
									            </InputAdornment>
									          ),
									        }}
								      	/>	
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12 col-sm-12 text-center col-12">
									<div className="form-group">
										<button type="submit" className="btn btn-success" onClick={this.addNewProject}>Submit</button>
									</div>
								</div>
							</div>	
						</div>
					</form>
	            </div>
            </Aux>
        );
    };
};

export default withRouter(addProjectFrom);

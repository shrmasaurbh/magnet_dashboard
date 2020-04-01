import React, {Component} from 'react';
import Aux from "../../../utils/Aux/aux.js";
import {withRouter} from "react-router-dom";
import "./form.css";
import {getRegion} from "../../../dataParser/getProjectData";
import SweetAlert from "../../../component/common/sweetAlert/sweetAlertSuccess";
import {updateProject, getAutoCompleteProject} from "../../../dataParser/getProjectData";
import {Form} from 'react-bootstrap';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import InputAutoComplete from "../../common/material/inputAutoComplete";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
// import {getAutoCompleteProject} from "../../../dataParser/getProjectData";
import CircularProgress from "@material-ui/core/CircularProgress";
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import ApartmentRoundedIcon from '@material-ui/icons/ApartmentRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import GpsFixedRoundedIcon from '@material-ui/icons/GpsFixedRounded';

const validateName = RegExp(/^[a-zA-Z ]+$/);
const validateNumber = RegExp(/^(\d{6}|\d{7})$/);

class updateForm extends Component {

	constructor(props) {
    	super(props);
		this.state = {
			project_addedby : '',
			project_id : '',
      		project_name : '',
      		builder_name : '',
      		region : '',
      		region_id : '',
      		region_name : '',
      		location : '',
      		project_id_99 : '',
      		project_status : false,
            sweetShow:false,
            type : "success",
            title : "",
            option: [] ,
            isLoading : false,
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

	    console.log("in the 11111111111111111111111111111111111",this.props.formData);
	    if(this.props.formData !== undefined){
		    if(this.props.formData.meta.status === 200){
		    	console.log("YeSSSSSSSSSSSSSSSSS");
		    	let autoFill = this.props.formData.data;
		    	console.log("XXXXXXXXXXXXXXXXXXXXXXX",autoFill);
		    	console.log("XXXXXXXXXXXXXXXXXXXXXXX",autoFill.location);

		    	this.setState({
		    		project_name : autoFill.project_name, 
		    		project_id : autoFill.project_id,
		    		option : [{project_id : autoFill.project_id,project_name : autoFill.project_name}], 
		    		builder_name : autoFill.builder_name, 
		    		location : autoFill.location, 
		    		project_status : autoFill.project_status, 
		    		project_id_99 : autoFill.project_id_99, 
		    		region_id : autoFill.region.region_id, 
		    	})
		    }
		}else{
			return 0
		}    

	}

	// componentDidUpdate(prevProps,nextProps){
	    

	//     if(prevProps.formData.data.project_name !== nextProps.project_name){
	//     	console.log("YeSSSSSSSSSSSSSSSSS");
	//     	let autoFill = prevProps.formData.data;
	//     	console.log("XXXXXXXXXXXXXXXXXXXXXXX",autoFill);
	//     	console.log("XXXXXXXXXXXXXXXXXXXXXXX",autoFill.location);

	//     	this.setState({
	//     		project_name : autoFill.project_name, 
	//     		project_id : autoFill.project_id,
	//     		option : [{project_id : autoFill.project_id,project_name : autoFill.project_name}], 
	//     		builder_name : autoFill.builder_name, 
	//     		location : autoFill.location, 
	//     		project_status : autoFill.project_status, 
	//     		project_id_99 : autoFill.project_id_99, 
	//     	})
	//     }
	// }	

	onChange = (e) => {

	    this.setState({ [e.target.name]: e.target.value });
 	}

 	updateProjectForm = async (e) =>{

 		e.preventDefault();
 		var allUpdateProject = {};
		const updateProjectRequest = (({project_addedby, project_name, builder_name, region_id, location, project_id_99, project_status}) => ({
	      project_addedby,
	      project_name,
	      builder_name,
	      region_id,
	      location,
	      project_id_99,
	      project_status
	    }))(this.state);

	    allUpdateProject.value = updateProjectRequest; 
	    allUpdateProject.id = this.state.project_id; 

	    console.log("changePwdRequest XXXXXXXXXXXX",allUpdateProject)

	    if(updateProjectRequest.project_addedby != "" && updateProjectRequest.location != "" && validateName.test(updateProjectRequest.project_name) 
	    	&&  updateProjectRequest.project_name != "" &&  updateProjectRequest.builder_name != "" 
	    	&& validateName.test(updateProjectRequest.builder_name) && updateProjectRequest.project_id_99 != "" && updateProjectRequest.region_id != "" 
	    	&& validateNumber.test(updateProjectRequest.project_id_99)){
	    		
	    	var updateProjectRes = await updateProject(allUpdateProject);
		    console.log("changePwdRequest XXXXXXXXXXXX",updateProjectRes);

		    if(updateProjectRes.meta.status === 200){
		    	
		    	console.log("insert successfully !!!");

		    	this.setState({
	                sweetShow:true,
	                type : "success",
	                title : "Project Updated Successfully!!!"

	            });

		    }else if(updateProjectRes.meta.status === 401){
        		
        		localStorage.clear();
        		this.props.history.push("/login");
        		
        	}else{
		    	
		    	this.setState({
	                sweetShow:true,
	                type : "error",
	                title : updateProjectRes.meta.message
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

 	handleChange = (event) => {
	    this.setState({ project_status: !this.state.project_status});
  	};

  	handleAutoChange = async (e) =>{
		this.setState({isLoading:true});
		let value = e.target.value 
		console.log("valueXXXXXXXXXXXXXXXX",value);

	    var regionData = await getAutoCompleteProject(value);

		console.log("regionData.dataXXXXXXXXXXXXXXXX",regionData.data);
	    if(regionData.meta.status === 200){

			this.setState({isLoading:false});
	        this.setState({option : regionData.data})
	    }else if(regionData.meta.status === 401){
    		
    		localStorage.clear();
    		this.props.history.push("/login");
    		
    	}else{

			this.setState({isLoading:false});
	        this.setState({option : regionData})
	    }

	}

	handleSweet=()=>{
    	this.props.changeModal()
        this.setState({sweetShow : !this.state.sweetShow});
    }

    render() {

	    const {region, sweetShow, type, title, option, isLoading,region_id,region_name} = this.state;
	    console.log("in the render", this.state);

        return (
            <Aux>
            	<div className="projectForm">
                    <SweetAlert show={sweetShow} type={type} title={title} changeSweet={this.handleSweet}/>
					<form role="form">
						<div className="card-body">
							<div className="row">
								<div className="col-sm-6 project_name">
									<div className="form-group">
										<div className="input-group mb-3">
											<Autocomplete
										      id="asynchronous-demo"
										      getOptionSelected={(option, value) => option.project_name === value.project_name}
										      getOptionLabel={option => option.project_name}
										      options={option}
										      loading={isLoading}
										      onChange={(_event, option) => {
										        console.log(option);
										        if (option === null) {
										        	this.setState({
										        		option: [],
											        	project_name : '',
											        	project_id : '',
										        	})
										        }else{
										        	this.setState({
											        	project_name : option.project_name,
											        	project_id : option.project_id
											        })
										        }
										      }}
										      renderInput={params => (
										        <TextField
										  	  		error = {this.state.errors.project_name !== '' ? 'error' : ''}
										          {...params}
										          label="Project Name"
										          fullWidth
										          onChange={this.handleAutoChange}
								          	  		helpertext={this.state.errors.project_name !== '' ? this.state.errors.project_name : ''} 
										          InputProps={{
										            ...params.InputProps,
										            startAdornment: (
											            <InputAdornment position="start">
											              <BusinessRoundedIcon />
											            </InputAdornment>
											          ),
										            endAdornment: (
										              <React.Fragment>
										                {isLoading ? (
										                  <CircularProgress color="inherit" size={20} />
										                ) : null}
										                {params.InputProps.endAdornment}
										              </React.Fragment>
										            )
										          }}
										        />
										      )}
										    />
										</div>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<div className="input-group mb-3">
											<TextField
										  	  	error = {this.state.errors.builder_name !== '' ? 'error' : ''}
												required
										        id="builder_name"
										        name="builder_name"
										        label="Builder Name"
									        	helpertext={this.state.errors.builder_name !== '' ? this.state.errors.builder_name : ''}
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
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6 mb-3">
									  <FormControl>
										    <InputLabel id="demo-controlled-open-select-label">Project City</InputLabel>
									        <Select
												error = {this.state.errors.region_id !== '' ? 'error' : ''}
									          	labelId="demo-controlled-open-select-label"
									          	value={region_id}
									          	onChange={this.onChange}
									      		helpertext={this.state.errors.region_id !== '' ? this.state.errors.region_id : ''}
									        	inputProps={{
									            	name: 'region_id',
									            	id: 'region_id',
									          	}}
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

								<div className="col-sm-6">
									<div className="form-group">
										<div className="input-group mb-3">
											<TextField
												error = {this.state.errors.location !== '' ? 'error' : ''}
												required
										        id="location"
										        name="location"
										        label="Location"
									        	helpertext={this.state.errors.location !== '' ? this.state.errors.location : ''}
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
							</div>
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<div className="input-group mb-3">
											<TextField
												error = {this.state.errors.project_id_99 !== '' ? 'error' : ''}
												required
										        id="project99"
										        name="project_id_99"
										        label="99 Project ID"
									        	helpertext={this.state.errors.project_id_99 !== '' ? this.state.errors.project_id_99 : ''}
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
								</div>
								<div className="col-sm-6">
								    <div className="form-group">
										<FormControlLabel
								          value={this.state.project_status}
								          checked={ this.state.project_status}
								          name="project_status"
								          control={<Switch color="primary" />}
								          label="Project Status"
								          labelPlacement="top"
								          onChange={this.handleChange}
								        />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12 col-sm-12 text-center col-12">
									<div className="form-group">
										<button type="submit" className="btn btn-success" onClick={this.updateProjectForm}>Submit</button>
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

export default withRouter(updateForm);

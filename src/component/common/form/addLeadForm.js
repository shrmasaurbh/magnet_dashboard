import React, {Component} from 'react';
import Aux from "../../../utils/Aux/aux.js";
import {withRouter} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserSecret, faBuilding, faUser, faTimes, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import "./form.css";
import {Form} from 'react-bootstrap';
import SweetAlert from "../../../component/common/sweetAlert/sweetAlertSuccess";
import {getRegion, getAutoCompleteProject} from "../../../dataParser/getProjectData";
import {getAddLeadData} from "../../../dataParser/getListData";
import {getUserListData} from "../../../dataParser/getListUserData";
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
// import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIphoneRoundedIcon from '@material-ui/icons/PhoneIphoneRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from "@material-ui/core/CircularProgress";
import ApartmentRoundedIcon from '@material-ui/icons/ApartmentRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';


const validateEmail = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
const validateName = RegExp(/^[a-zA-Z ]+$/);
const validateNumber = RegExp(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/);

class addLeadForm extends Component {

	constructor(props) {
    	super(props);
		this.state = {
			p_lead_added_by : '',
			p_leadtype : '',
			p_projectid : '',
            sweetShow:false,
            type : "",
            title : "",
            p_city : '',
            p_assignby : '',
            p_assignstatus : false,
            p_nationality : 'indian',
            p_magnetlead : 0,
            p_message : '',
            project : [],
            isLoading : false,
            userName : [],
            p_teamid : '',
            p_username: "",
			p_mobilenumber: "",
			p_source: "",
			p_campaigntype: "",
			showHideFileds : false,
			errors:{
               	p_leadtype : '',
				p_username : '',
				p_projectid : '',
				p_mobilenumber : '',
				p_source : '',
				p_city : '',
				p_message : '',
           	}, 
		};
	}

	async componentDidMount(){

		var homesfy_lg =(localStorage.getItem("homesfy_lg"));
		if(homesfy_lg && homesfy_lg !== ""){
	        let user = JSON.parse(window.atob(homesfy_lg));
	        var addedBy = user.id;
	        this.setState({p_lead_added_by : addedBy})

	    }else{
	        var addedBy = '';
	        this.setState({p_lead_added_by : addedBy})
	    }

	    // var regionData = await getRegion();

	    // if(regionData.meta.status === 200){

	    //     this.setState({region : regionData})
	    // }else{

	    //     this.setState({region : regionData})
	    // }

	}

	onChange = (e) => {
		console.log(e.target.name);
		console.log(e.target.value);
	    this.setState({ [e.target.name]: e.target.value });
 	}

 	addNewLead = async (e) =>{

 		e.preventDefault();

		const addLeadRequest = (({p_leadtype,p_lead_added_by,p_assignby,p_username,p_projectid,p_mobilenumber,p_source,p_city,p_message,p_nationality,p_assignstatus,p_teamid,p_campaigntype}) => ({
			p_username,
			p_mobilenumber,
			p_leadtype,
			p_lead_added_by,
			p_source,
			p_city,
			p_projectid,
			p_message,
			p_nationality,
			p_assignstatus,
			p_assignby,
			p_teamid,
			p_campaigntype,
	    }))(this.state);

	    console.log("addLeadRequest XXXXXXXXXXXX",addLeadRequest)

	    if(addLeadRequest.p_leadtype != "" && validateName.test(addLeadRequest.p_leadtype) &&  addLeadRequest.p_username != "" &&  addLeadRequest.p_projectid != "" &&  addLeadRequest.p_mobilenumber != "" && validateNumber.test(addLeadRequest.p_mobilenumber) &&  addLeadRequest.p_source != ""){

	    	var addLeadRes = await getAddLeadData(addLeadRequest);
		    console.log("addLeadRes XXXXXXXXXXXX",addLeadRes);

		    if(addLeadRes.meta.status === 201){
		    	
		    	console.log("Lead insert successfully !!!");

		    	this.setState({
	                sweetShow:true,
	                type : "success",	
	                title : "Lead Added Successfully!!!"

	            });

		    }else if(addLeadRes.meta.status === 401){
        		
        		localStorage.clear();
        		this.props.history.push("/login");
        		
        	}else{
		    	
		    	this.setState({
	                sweetShow:true,
	                type : "error",
	                title : addLeadRes.meta.message
	            });
		    }
	    }else{

	    	// console.log("in the error log ", this.state);

	    	if(this.state.p_leadtype == "" || validateName.test(this.state.p_leadtype)=== false){
	    		console.log("in the error log");

	            this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        p_leadtype: '*please select valid project name'
				    }
				}))
	    	}else{

	    		this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        p_leadtype: ''
				    }
				}))
	    	}

	    	if(this.state.p_username == ""){
	    		
	            this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        p_username:"*please enter valid client name"
				    }
				}))
	    	}

	    	if(this.state.p_mobilenumber == "" || validateNumber.test(this.state.p_mobilenumber)=== false){
	    		
	            this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        p_mobilenumber:"*please enter valid client number"
				    }
				}))
	    	}else{

	    		this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        p_mobilenumber:""
				    }
				}))
	    	}

	    	if(this.state.p_source == ""){
	    		
	            this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        p_source:"*please enter valid source"
				    }
				}))
	    	}else{

	    		this.setState(prevState => ({
				    errors: {                
				        ...prevState.errors,    
				        p_source:""
				    }
				}))
	    	}
	    }
 	}

 	handleSweet=()=>{
    	this.props.changeModal()
        this.setState({sweetShow : !this.state.sweetShow});
    }

    handleChange = (event) => {
	    this.setState({ p_assignstatus: !this.state.p_assignstatus});
  	};

  	handleAutoChange = async (e) =>{
		this.setState({isLoading:true});
		let value = e.target.value 
		console.log("valueXXXXXXXXXXXXXXXX",value);

	    var regionData = await getAutoCompleteProject(value);

		console.log("regionData.dataXXXXXXXXXXXXXXXX",regionData.data);
	    if(regionData.meta.status === 200){

			this.setState({isLoading:false});
	        this.setState({project : regionData.data})
	    }else if(regionData.meta.status === 401){
    		
    		localStorage.clear();
    		this.props.history.push("/login");
    		
    	}else{

			this.setState({isLoading:false});
	        this.setState({project : regionData})
	    }

	}

	handleAutoUserChange = async (e) =>{
		this.setState({isLoading:true});
		let value = e.target.value 
		console.log("valueXXXXXXXXXXXXXXXX",value);

	    var getUserData = await getUserListData(value);

		console.log("getUserData.dataXXXXXXXXXXXXXXXX",getUserData.data);
	    if(getUserData.meta.status === 200){

			this.setState({isLoading:false});
	        this.setState({userName : getUserData.data})
	    }else if(getUserData.meta.status === 401){
    		
    		localStorage.clear();
    		this.props.history.push("/login");
    		
    	}else{

			this.setState({isLoading:false});
	        this.setState({userName : getUserData})
	    }

	}

	showHideLead = () =>{

		this.setState({showHideFileds : true});
	}

    render() {
	 	
	    const {region,sweetShow,type,title,p_city,p_assignstatus,p_nationality,p_magnetlead,project,isLoading,userName,p_lead_added_by} = this.state;
	    console.log("this.state leadAddFormXXXXXXXXXXXXXXXX",this.state);

        return (
            <Aux>
            	<div className="projectForm">
                    <SweetAlert show={sweetShow} type={type} title={title} changeSweet={this.handleSweet}/>
					<form role="form">
						<div className="card-body">
							<div className="row mb-3">
								<div className="col-sm-6">
									<div className="form-group">
										<TextField
											error = {this.state.errors.p_username !== '' ? 'error' : ''}
											required
									        id="p_username"
									        name="p_username"
									        label="Client Name"
									        helperText={this.state.errors.p_username !== '' ? this.state.errors.p_username : ''}
									        onChange={this.onChange}
									        InputProps={{
									          startAdornment: (
									            <InputAdornment position="start">
									              <AccountCircle />
									            </InputAdornment>
									          ),
									        }}
									      />
									</div>
								</div>
								<div className="col-sm-6 mb-3">
									<TextField
										error = {this.state.errors.p_mobilenumber !== '' ? 'error' : ''}
										required
								        id="p_mobilenumber"
								        name="p_mobilenumber"
								        label="Client Number"
								        helperText={this.state.errors.p_mobilenumber !== '' ? this.state.errors.p_mobilenumber : ''}
								        onChange={this.onChange}
								        InputProps={{
								          startAdornment: (
								            <InputAdornment position="start">
								              <PhoneIphoneRoundedIcon />
								            </InputAdornment>
								          ),
								        }}
							      	/>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6 mb-3">
							      	<Autocomplete
								      id="asynchronous-demo"
								      getOptionSelected={(project, value) => project.project_name === value.project_name}
								      getOptionLabel={project => project.project_name}
								      options={project}
								      loading={isLoading}
								      onChange={(_event, project) => {
								        console.log(project);
								        if (project === null) {
								        	this.setState({project: []})
								        }else{
								        	this.setState({
									        	p_leadtype : project.project_name,
									        	p_projectid : project.project_id,
									        })
								        }
								      }}
								      renderInput={params => (
								        <TextField
										  error = {this.state.errors.p_leadtype !== '' ? 'error' : ''}
								          {...params}
								          label="Interest in Project"
								          helperText={this.state.errors.p_leadtype !== '' ? this.state.errors.p_leadtype : ''} 
								          fullWidth
								          onChange={this.handleAutoChange}
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
								<div className="col-sm-6">
									<div className="form-group">
										<TextField
										error = {this.state.errors.p_source !== '' ? 'error' : ''}
										required
								        id="p_source"
								        name="p_source"
								        helperText={this.state.errors.p_source !== '' ? this.state.errors.p_source : ''} 
								        onChange={this.onChange}
								        label="Project Source"
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
							{this.state.showHideFileds === false ? 
								<div className="row mb-3">
									<div className="col-sm-12 text-right col-12">
										<div className="form-group">
											<a className="showFildes" onClick={this.showHideLead}>show hide fields</a>
										</div>
									</div>
								</div>
								:
								''
							}
							
							{this.state.showHideFileds === true ?
							<Aux>	 
								<div className="row">
									<div className="col-sm-6 mb-3">
										<FormControl>
										    <InputLabel id="demo-controlled-open-select-label">Project C
										    ity</InputLabel>
									        <Select
											  error = {this.state.errors.p_city !== '' ? 'error' : ''}
									          labelId="demo-controlled-open-select-label"
									          value={p_city}
									          onChange={this.onChange}
									          inputProps={{
									            name: 'p_city',
									            id: 'project_city',
									          }}
									          helpertext={this.state.errors.p_city!== '' ? this.state.errors.p_city: ''} 
									        >
									          <MenuItem value="">
									            <em>None</em>
									          </MenuItem>
									          <MenuItem value="mumbai">Mumbai</MenuItem>
									          <MenuItem value="pune">Pune</MenuItem>
									          <MenuItem value="bangalore">Bangalore</MenuItem>
									          <MenuItem value="delhi">Delhi</MenuItem>
									          <MenuItem value="kolkata">Kolkata</MenuItem>
									          <MenuItem value="goa">Goa</MenuItem>
									        </Select>
										</FormControl>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<TextField
												required
									        id="p_campaigntype"
									        name="p_campaigntype"
									        label="Campaign Type"
									        onChange={this.onChange}
									        InputProps={{
									          startAdornment: (
									            <InputAdornment position="start">
									              <AccountCircle />
									            </InputAdornment>
									          ),
									        }}
								      	/>
										</div>
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-sm-4">
										<div className="form-group">
											<FormLabel component="legend">Nationality</FormLabel>
										      <RadioGroup row aria-label="p_nationality" name="p_nationality" value={p_nationality} onChange={this.onChange}>
										        <FormControlLabel value="indian" control={<Radio color="primary"/>} label="Indian" />
										        <FormControlLabel value="nri" control={<Radio color="primary" />} label="NRI" />
										      </RadioGroup> 
										</div>
									</div>
									<div className="col-sm-4">
										<div className="form-group">
											<FormLabel component="legend">Magnet Lead</FormLabel>
										      <RadioGroup row aria-label="p_magnetlead" name="p_magnetlead" value={p_magnetlead} onChange={this.onChange}>
										        <FormControlLabel value="1" control={<Radio color="primary" />} label="Yes" />
										        <FormControlLabel value="0" control={<Radio color="primary" />} label="No" />
										      </RadioGroup> 
										</div>
									</div>
									<div className="col-sm-4">
										<div className="form-group">
											<FormControlLabel
									          value={p_assignstatus}
									          name="p_assignstatus"
									          control={<Switch color="primary" />}
									          label="Assign to RM"
									          labelPlacement="top"
									          onChange={this.handleChange}
									        />
										</div>
									</div>
								</div>
								<div className="row mb-3">
									{p_assignstatus === true ? 
										<div className="col-sm-6">
											<Autocomplete
									      id="asynchronous-demo"
									      getOptionSelected={(userName, value) => userName.name === value.name}
									      getOptionLabel={userName => userName.name}
									      options={userName}
									      loading={isLoading}
									      onChange={(_event, userName) => {
									        console.log(userName);
									        if (userName === null) {
									        	this.setState({
									        		userName: [],
									        		p_assignby : '', 
									        	})
									        }else{
									        	this.setState({
										        	p_teamid : userName.user_id,
									        		p_assignby : p_lead_added_by, 
										        })
									        }
									      }}
									      renderInput={params => (
									        <TextField
									          {...params}
									          label="Select RM"
									          fullWidth
									          onChange={this.handleAutoUserChange}
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
										: 
										''
									}
									<div className="col-sm-6 col-12">
										<div className="form-group">
											<TextField
												error = {this.state.errors.p_message !== '' ? 'error' : ''}
									        	id="standard-multiline-flexible"
									          	label="Comments"
									          	name="p_message"
									          	helpertext={this.state.errors.p_message !== '' ? this.state.errors.p_message : ''} 
									          	multiline
									          	rowsMax="4"
									          	value={this.state.p_message}
									          	onChange={this.onChange}
									        />
										</div>
									</div>
								</div>
							</Aux>	
								:
								''
							}	

							<div className="row">
								<div className="col-sm-12 text-center col-12">
									<div className="form-group">
										<button type="submit" className="btn btn-success" onClick={this.addNewLead}>Submit</button>
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

export default withRouter(addLeadForm);

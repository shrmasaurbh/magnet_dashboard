import React, {Component} from "react";
import "./filter.css";
import Aux from "../../utils/Aux/aux";
import {withRouter} from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {getAutoCompleteProject,getRegion} from "../../dataParser/getProjectData";
import {getLeadStatusData,getLeadSourceData} from "../../dataParser/commomDataApi";
import {getUserListData} from "../../dataParser/getListUserData";
import CircularProgress from "@material-ui/core/CircularProgress";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';

class Filter extends Component { 

	constructor(props) {
    	super(props);
		this.state = {
			option: [] ,
			userName: [] ,
			status: [] ,
			status_ids: '' ,
			source_ids: [] ,
			source: [] ,
            isLoading : false,
            assignedDate_from : null,
            assignedDate_to : null,
            commingDate_from : null,
            commingDate_to : null,
            closedDate_from : null,
            closedDate_to : null,
            visitDate_from : null,
            visitDate_to : null,
            hpOpDate_from : null,
            hpOpDate_to : null,
            followDate_from : null,
            followDate_to : null,
            lastUpdateDate_from : null,
            lastUpdateDate_to : null,
            city : '',
            closeReason : '',
            project_name : '',
            project_ids : [],
            lead_id : '',
            region : '',
            region_id : '',
            client_number : '',
            client_id : '',
            magnet_lead_rm : '',
            pre_sale_rm : '',
            visit_status : '',
            hpOpStaus : '',
            is_magnet : '',
            is_presale : '',
            client_type : ''
		};
	}

	async componentDidMount(){

		var regionData = await getRegion();
	    console.log("getStatusData=+++++++++++++>",regionData)

	    if(regionData.meta.status === 200){

	        this.setState({region : regionData})
	    }else if(regionData.meta.status === 401){
    		
    		localStorage.clear();
    		this.props.history.push("/login");
    		
    	}else{

	        this.setState({region : regionData})
	    }


	    var getStatusData = await getLeadStatusData();

	    if(getStatusData.meta.status === 200){

	    	this.setState({status : getStatusData.data})

	    }else if(getStatusData.meta.status === 401){
    		
    		localStorage.clear();
    		this.props.history.push("/login");
    		
    	}else{

	        this.setState({status : getStatusData})
	    }

	    var getSourceData = await getLeadSourceData();
	    console.log("getSourceData=+++++++++++++>",getSourceData)

	    if(getSourceData.meta.status === 200){

	    	this.setState({source : getSourceData.data})

	    }else if(getSourceData.meta.status === 401){
    		
    		localStorage.clear();
    		this.props.history.push("/login");
    		
    	}else{

	        this.setState({source : getSourceData})
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


	handleAutoChange = async (e) =>{
		this.setState({isLoading:true});
		let value = e.target.value 
		console.log("valueXXXXXXXXXXXXXXXX",value);

	    var projectListData = await getAutoCompleteProject(value);

		console.log("projectListData.dataXXXXXXXXXXXXXXXX",projectListData.data);
	    if(projectListData.meta.status === 200){

			this.setState({isLoading:false});
	        this.setState({option : projectListData.data})
	    }else if(projectListData.meta.status === 401){
    		
    		localStorage.clear();
    		this.props.history.push("/login");
    		
    	}else{

			this.setState({isLoading:false});
	        this.setState({option : projectListData})
	    }

	}

	handleDateChange = (key, date) =>{

		console.log("XXXXXXXXXXXXXX",key);
		console.log(date);
		this.setState({[key] : date});
	}

	handleChange = event => {
		this.setState({[event.target.name]: event.target.value});
  	};

  	applyFilter= ()=>{

    	let filterData = {};

		if(this.state.project_ids.length > 0){
        	
        	filterData["project_ids"] = this.state.project_ids;
    	}
    	if(this.state.status_ids.length > 0){
        	
        	filterData["status_ids"] = this.state.status_ids;
    	}
    	if(this.state.source_ids.length > 0){
        	
        	filterData["source_ids"] = this.state.source_ids;
    	}
    	if(this.state.lead_id){
        	
        	filterData["lead_id"] = this.state.lead_id;
    	}
    	if(this.state.region_id){
        	
        	filterData["region_id"] = this.state.region_id;
    	}
    	if(this.state.is_magnet){
        	
        	filterData["is_magnet"] = this.state.is_magnet;
    	}
    	if(this.state.is_presale){
        	
        	filterData["is_presale"] = this.state.is_presale;
    	}
    	if(this.state.client_number){
        	
        	filterData["client_number"] = this.state.client_number;
    	}
    	if(this.state.commingDate_from && this.state.commingDate_to){
        	
        	filterData["coming_date"] ={"to":this.state.commingDate_to,"from":this.state.commingDate_from};
    	}
    	if(this.state.magnet_lead_rm.length > 0){
        	
        	filterData["magent_rm_ids"] = this.state.magnet_lead_rm;
    	}
    	if(this.state.pre_sale_rm.length > 0){
        	
        	filterData["presale_rm_ids"] = this.state.pre_sale_rm;
    	}

    	if(this.state.hpOpDate_from && this.state.hpOpDate_to){
        	
        	filterData["hpop_date"] ={"to":this.state.hpOpDate_to,"from":this.state.hpOpDate_from};
    	}

    	if(this.state.visitDate_from && this.state.visitDate_to){
        	
        	filterData["revisit_date"] ={"to":this.state.visitDate_to,"from":this.state.visitDate_from};
    	}

    	if(this.state.lastUpdateDate_from && this.state.lastUpdateDate_to){
        	
        	filterData["updated_at"] ={"to":this.state.lastUpdateDate_to,"from":this.state.lastUpdateDate_from};
    	}
    	

    	
    	// this.setState({activeClear : false});
    	this.props.changeFilter();
        console.log("=== state of the filter ====",filterData);
        this.props.filterData(filterData);  

    }

  	resetFilter = () =>{

  		this.setState({
  			option: [] ,
            isLoading : false,
            assignedDate_from : null,
            assignedDate_to : null,
            commingDate_from : null,
            commingDate_to : null,
            closedDate_from : null,
            closedDate_to : null,
            visitDate_from : null,
            visitDate_to : null,
            hpOpDate_from : null,
            hpOpDate_to : null,
            followDate_from : null,
            followDate_to : null,
            lastUpdateDate_from : null,
            lastUpdateDate_to : null,
            city : '',
            closeReason : '',
            project_name : '',
            project_ids : '',
            lead_id : '',
            source : '',
            region : '',
            client_number : '',
            client_id : '',
            magnet_lead_rm : '',
            pre_sale_rm : '',
            visit_status : '',
            hpOpStaus : '',
            is_magnet : '',
            is_presale : '',
            client_type : ''
  		})
  	}

	render(){

		const {option,client_type,userName,source,status,isLoading,region_id,region,assignedDate_from,assignedDate_to,commingDate_from,commingDate_to,closedDate_from,closedDate_to,visitDate_from,visitDate_to,hpOpDate_from,hpOpDate_to,followDate_from,followDate_to,lastUpdateDate_from,lastUpdateDate_to,city,closeReason,visit_status,hpOpStaus,is_magnet,is_presale} = this.state;
		console.log("cityXXXXXXXXXXXX",this.state)
		// console.log("closeReasonXXXXXXXXXXXX",closeReason)

		return(

			<Aux>
				<PerfectScrollbar>
					<div className="container filter_lead filterMenuCard pt-3 p-0">
						<div className="row filterRow">
							<div className="col-lg-6 col-sm-6 col-6">
								<div className="form-group">
									<Autocomplete
									  multiple	
								      id="projectData"
								      getOptionSelected={(option, value) => option.project_name === value.project_name}
								      getOptionLabel={option => option.project_name}
								      options={option}
								      loading={isLoading}
								      renderTags={(value, getTagProps) =>
									    value.map((option, index) => (
									      <Chip label={option.project_name} {...getTagProps({ index })}/>
									    ))
									  }
								      onChange={(_event, option) => {
								        console.log(option);
								        var projectId = option.map((ops) => ops.project_id);
								        this.setState({
								        	project_ids : projectId,
								        })

								        if (option === null) {
								        	this.setState({option: []})
								        }
								      }}
								      renderInput={params => (
								        <TextField
								          {...params}
								          label="Project Name"
								          fullWidth
								          onChange={this.handleAutoChange}
								          InputProps={{
								            ...params.InputProps,
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
									<span id="firstName-error" className="error invalid-feedback">Please enter First Name</span>
								</div>
							</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<div className="form-group">
									<TextField
							          required
							          value={this.state.lead_id}
							          id="lead_id"
							          name="lead_id"
							          label="Lead ID"
							          onChange={this.handleChange}
							          defaultValue=""
							          helperText=""
							        />
								</div>
							</div>
						</div>
						<div className="row filterRow">
							<div className="col-lg-6 col-sm-6 col-6 mb-3">
								<Autocomplete
								  multiple	
							      id="source-demo"
							      getOptionSelected={(source, value) => source.source === value.source}
							      getOptionLabel={source => source.source}
							      options={source}
							      loading={isLoading}
							      renderTags={(value, getTagProps) =>
								    value.map((source, index) => (
								      <Chip label={source.source} {...getTagProps({ index })}/>
								    ))
								  }
							      onChange={(_event, source) => {
							        console.log(source);
							        var projectId = source.map((ops) => ops.source_id);
							        this.setState({
							        	source_ids : projectId,
							        })

							        if (source === null) {
							        	this.setState({source: []})
							        }
							      }}
							      renderInput={params => (
							        <TextField
							          {...params}
							          label="Source"
							          fullWidth
							          onChange={this.handleAutoUserChange}
							          InputProps={{
							            ...params.InputProps,
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
							<div className="col-lg-6 col-sm-6 col-6 mb-3">
								<FormControl>
								    <InputLabel id="demo-controlled-open-select-label">City</InputLabel>
							        <Select
							          labelId="demo-controlled-open-select-label"
							          value={city}
							          onChange={this.handleChange}
							          inputProps={{
							            name: 'city',
							            id: 'city',
							          }}
							        >
							          	<MenuItem value="">
							            	<em>None</em>
							          	</MenuItem>
							          	<MenuItem selected="" value="Mumbai">Mumbai</MenuItem>
										<MenuItem selected="" value="Pune">Pune</MenuItem>
										<MenuItem value="Bangalore">Bangalore</MenuItem>
										<MenuItem value="Delhi">Delhi</MenuItem>
										<MenuItem value="Kolkata">Kolkata</MenuItem>
										<MenuItem value="Goa">Goa</MenuItem>
							        </Select>
								</FormControl>
							</div>
						</div>
						<div className="row filterRow">
							<div className="col-lg-6 col-sm-6 col-6">
								<FormControl>
								    <InputLabel id="demo-controlled-open-select-label">Region</InputLabel>
							        <Select
							          	labelId="demo-controlled-open-select-label"
							          	value={region_id}
							          	onChange={this.handleChange}
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
							<div className="col-lg-6 col-sm-6 col-6">
								<div className="form-group">
									<TextField
							          required
							          value={this.state.client_number}
							          id="client_number"
							          name="client_number"
							          onChange={this.handleChange}
							          label="Mobile Number"
							          defaultValue=""
							         
							          helperText=""
							        />
								</div>
							</div>
						</div>
						<div className="row filterRow">
							<div className="col-lg-6 col-sm-6 col-6">
								<Autocomplete
								  multiple	
							      id="staus-demo"
							      getOptionSelected={(status, value) => status.status === value.status}
							      getOptionLabel={status => status.status}
							      options={status}
							      loading={isLoading}
							      renderTags={(value, getTagProps) =>
								    value.map((status, index) => (
								      <Chip label={status.status} {...getTagProps({ index })}/>
								    ))
								  }
							      onChange={(_event, status) => {
							        console.log(status);
							        var projectId = status.map((ops) => ops.status_id);
							        this.setState({
							        	status_ids : projectId,
							        })

							        if (status === null) {
							        	this.setState({status: []})
							        }
							      }}
							      renderInput={params => (
							        <TextField
							          {...params}
							          label="Status"
							          fullWidth
							          onChange={this.handleAutoUserChange}
							          InputProps={{
							            ...params.InputProps,
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
							<div className="col-lg-6 col-sm-6 col-6">
								<div className="form-group">
							        <FormControl>
									    <InputLabel id="demo-controlled-open-select-label">Visit Status</InputLabel>
								        <Select
								          labelId="demo-controlled-open-select-label"
								          value={visit_status}
								          onChange={this.handleChange}
								          inputProps={{
								            name: 'visit_status',
								            id: 'visit_status',
								          }}
								        >
							          	<MenuItem value="">
							            	<em>None</em>
							          	</MenuItem>
							          	<MenuItem value="Visit Confirmed">Visit Confirmed</MenuItem>
										<MenuItem value="Visit Confirmed Not Done">Visit Confirmed Not Done</MenuItem>
										<MenuItem value="Revisit Confirmed">Revisit Confirmed</MenuItem>
										<MenuItem value="Revisit Confirmed Not Done">Revisit Confirmed Not Done</MenuItem>
										<MenuItem value="Visit Done Not Booked">Visit Done Not Booked</MenuItem>
										<MenuItem value="Visit Done Booked">Visit Done Booked</MenuItem>
										<MenuItem value="Revisit Done Not Booked">Revisit Done Not Booked</MenuItem>
										<MenuItem value="Revisit Done Booked">Revisit Done Booked</MenuItem>

								        </Select>
									</FormControl>
								</div>
							</div>
						</div>
						<div className="row filterRow">
							<div className="col-lg-6 col-sm-6 col-6">
								<FormControl>
								    <InputLabel id="demo-controlled-open-select-label">HP/OP Staus</InputLabel>
							        <Select
							          labelId="demo-controlled-open-select-label"
							          value={hpOpStaus}
							          onChange={this.handleChange}
							          inputProps={{
							            name: 'hpOpStaus',
							            id: 'hpOpStaus',
							          }}
							        >
							          <MenuItem value="">
							            <em>None</em>
							          </MenuItem>
							          	<MenuItem value="HP/OP Confirmed">HP/OP Confirmed</MenuItem>  
										<MenuItem value="HP/OP Confirmed Not Done">HP/OP Confirmed Not Done</MenuItem>  
										<MenuItem value="HP/OP Done">HP/OP Done</MenuItem>  
										<MenuItem value="HP/OP Done Booked">HP/OP Done Booked</MenuItem> 
							        </Select>
								</FormControl>
							</div>
					        <div className="col-lg-6 col-sm-6 col-6">
								<div className="form-group">
									<TextField
							          required
							          value={this.state.client_id}
							          id="client_id"
							          name="client_id"
							          onChange={this.handleChange}
							          label="Client ID"
							          defaultValue=""
							          helperText=""
							        />
								</div>
							</div>
						</div>
						<div className="row filterRow">
							<div className="col-lg-6 col-sm-6 col-6 mb-3">
								<Autocomplete
								  multiple	
							      id="magnetRmName"
							      getOptionSelected={(userName, value) => userName.name === value.name}
							      getOptionLabel={userName => userName.name}
							      options={userName}
							      loading={isLoading}
							      renderTags={(value, getTagProps) =>
								    value.map((userName, index) => (
								      <Chip label={userName.name} {...getTagProps({ index })}/>
								    ))
								  }
							      onChange={(_event, userName) => {
							        console.log(userName);
							        var projectId = userName.map((ops) => ops.user_id);
							        this.setState({
							        	magnet_lead_rm : projectId,
							        })

							        if (option === null) {
							        	this.setState({option: []})
							        }
							      }}
							      renderInput={params => (
							        <TextField
							          {...params}
							          label="Magnet Lead Rm"
							          fullWidth
							          onChange={this.handleAutoUserChange}
							          InputProps={{
							            ...params.InputProps,
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
							<div className="col-sm-6 col-6 mb-3">	
								<Autocomplete
								  multiple	
							      id="asynchronous-demo"
							      getOptionSelected={(userName, value) => userName.name === value.name}
							      getOptionLabel={userName => userName.name}
							      options={userName}
							      loading={isLoading}
							      renderTags={(value, getTagProps) =>
								    value.map((userName, index) => (
								      <Chip label={userName.name} {...getTagProps({ index })}/>
								    ))
								  }
							      onChange={(_event, userName) => {
							        console.log(userName);
							        var projectId = userName.map((ops) => ops.user_id);
							        this.setState({
							        	pre_sale_rm : projectId,
							        })

							        if (option === null) {
							        	this.setState({option: []})
							        }
							      }}
							      renderInput={params => (
							        <TextField
							          {...params}
							          label="PreSale RM"
							          fullWidth
							          onChange={this.handleAutoUserChange}
							          InputProps={{
							            ...params.InputProps,
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
						<div className="row filterRow mb-2">
							<div className="col-lg-6 col-sm-6 col-6">
								<FormControl>
								    <InputLabel id="demo-controlled-open-select-label">Magnet Lead</InputLabel>
							        <Select
							          labelId="demo-controlled-open-select-label"
							          value={is_magnet}
							          onChange={this.handleChange}
							          inputProps={{
							            name: 'is_magnet',
							            id: 'is_magnet_status',
							          }}
							        >
							          <MenuItem value="">
							            <em>None</em>
							          </MenuItem>
										<MenuItem value="1">Yes</MenuItem>  
										<MenuItem value="0">No</MenuItem> 
							        </Select>
								</FormControl>
							</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<FormControl>
								    <InputLabel id="demo-controlled-open-select-label">PreSale Lead</InputLabel>
							        <Select
							          labelId="demo-controlled-open-select-label"
							          value={is_presale}
							          onChange={this.handleChange}
							          inputProps={{
							            name: 'is_presale',
							            id: 'is_presale_status',
							          }}
							        >
							          <MenuItem value="">
							            <em>None</em>
							          </MenuItem>
										<MenuItem value="1">Yes</MenuItem>  
										<MenuItem value="0">No</MenuItem> 
							        </Select>
								</FormControl>
							</div>
						</div>
						{client_type === "close" ? 
							<div className="row filterRow mb-2">
								<div className="col-lg-6 col-sm-6 col-6">
									<div className="form-group">
										<FormControl>
									    <InputLabel id="demo-controlled-open-select-label">Close Reason</InputLabel>
								        <Select
								          labelId="demo-controlled-open-select-label"
								          value={closeReason}
								          onChange={this.handleChange}
								          inputProps={{
								            name: 'closeReason',
								            id: 'closeReason',
								          }}
								        >
									        <MenuItem value="">
								          		<em>None</em>
									        </MenuItem>
								          	<MenuItem value="Broking Advisor">Broking Advisor</MenuItem>
											<MenuItem value="Low Budget">Low Budget</MenuItem>
											<MenuItem value="Invalid Number">Invalid Number</MenuItem>
											<MenuItem value="Not Enquired">Not Enquired</MenuItem>
											<MenuItem value="Wrong Number">Wrong Number</MenuItem>
											<MenuItem value="Already Bought">Already Bought</MenuItem>
											<MenuItem value="Duplicate Lead">Duplicate Lead</MenuItem>
											<MenuItem value="Budget Issue">Budget Issue</MenuItem>
											<MenuItem value="Location Issue">Location Issue</MenuItem>
											<MenuItem value="Layout Issue">Layout Issue</MenuItem>
											<MenuItem value="Possession Issue">Possession Issue</MenuItem>
											<MenuItem value="Payment Plane">Payment Plane</MenuItem>
											<MenuItem value="Decision Delayed">Decision Delayed</MenuItem>
											<MenuItem value="Looking in Resale">Looking in Resale</MenuItem>
											<MenuItem value="Not Contactable">Not Contactable</MenuItem>
											<MenuItem value="Looking in Rental">Looking in Rental</MenuItem>
											<MenuItem value="Looking in Commercial">Looking in Commercial</MenuItem>
											<MenuItem value="Builder's Employee">Builder's Employee</MenuItem>
											<MenuItem value="Not Responding (4 Weeks)">Not Responding (4 Weeks)</MenuItem>
											<MenuItem value="Interested In Other Location">Interested In Other Location</MenuItem>
											<MenuItem value="Interested In Other Project">Interested In Other Project</MenuItem>
								        </Select>
									</FormControl>
									</div>
								</div>
							</div>
							:
							''
						}	
						
						<div className="row filterRow mb-2">
							<div className="col-md-12 text-center">Assigned Date</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="assigned_date_form"
							          label="From"
							          format="yyyy/MM/dd"
							          maxDate={new Date()}
							          name="assignedDate_from"
							          value={assignedDate_from}
							          onChange={(key,date)=>this.handleDateChange('assignedDate_from',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="assigned_date_to"
							          label="to"
							          format="yyyy/MM/dd"
										maxDate={new Date()}						          
										name="assignedDate_to"
							          value={assignedDate_to}
							          onChange={(key,date)=>this.handleDateChange('assignedDate_to',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
						</div>
						<div className="row filterRow mb-2">
							<div className="col-md-12 text-center">Close Date</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="close_date_form"
							          label="From"
							          format="yyyy/MM/dd"
										maxDate={new Date()}						          
										name="closedDate_from"
							          value={closedDate_from}
							          onChange={(key,date)=>this.handleDateChange('closedDate_from',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="close_date_to"
							          label="to"
							          format="yyyy/MM/dd"
										maxDate={new Date()}				          
										name="closedDate_to"
							          value={closedDate_to}
							          onChange={(key,date)=>this.handleDateChange('closedDate_to',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
						</div>
						<div className="row filterRow mb-2">
							<div className="col-md-12 text-center">Comming Date</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="comming_date_form"
							          label="From"
					          		  format="yyyy/MM/dd"											
						          	  maxDate={new Date()}							          
						          	  name="commingDate_from"
							          value={commingDate_from}
							          onChange={(key,date)=>this.handleDateChange('commingDate_from',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="comming_date_to"
							          label="to"
							          format="yyyy/MM/dd"
										maxDate={new Date()}					          
										name="commingDate_to"
							          value={commingDate_to}
							          onChange={(key,date)=>this.handleDateChange('commingDate_to',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
						</div>
						<div className="row filterRow mb-2">
							<div className="col-md-12 text-center">Visit Date</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="visit_date_form"
							          label="From"
							          format="yyyy/MM/dd"
										maxDate={new Date()}					          
										name="visitDate_from"
							          value={visitDate_from}
							          onChange={(key,date)=>this.handleDateChange('visitDate_from',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="visit_date_to"
							          label="to"
							          format="yyyy/MM/dd"
										maxDate={new Date()}			          
										name="visitDate_to"
							          value={visitDate_to}
							          onChange={(key,date)=>this.handleDateChange('visitDate_to',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
						</div>
						<div className="row filterRow mb-2">
							<div className="col-md-12 text-center">HP/OP Date</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="hpOp_date_form"
							          label="From"
							          format="yyyy/MM/dd"
										maxDate={new Date()}				          
										name="hpOpDate_from"
							          value={hpOpDate_from}
							          onChange={(key,date)=>this.handleDateChange('hpOpDate_from',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="hpOp_date_to"
							          label="to"
							          format="yyyy/MM/dd"
										maxDate={new Date()}			          
										name="hpOpDate_to"
							          value={hpOpDate_to}
							          onChange={(key,date)=>this.handleDateChange('hpOpDate_to',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
						</div>
						<div className="row filterRow mb-2">
							<div className="col-md-12 text-center">Follow Date</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="follow_date_form"
							          label="From"
							          format="yyyy/MM/dd"
										maxDate={new Date()}						          
										name="followDate_from"
							          value={followDate_from}
							          onChange={(key,date)=>this.handleDateChange('followDate_from',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="follow_date_to"
							          label="to"
							          format="yyyy/MM/dd"
										maxDate={new Date()}				          
										name="followDate_to"
							          value={followDate_to}
							          onChange={(key,date)=>this.handleDateChange('followDate_to',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
						</div>
						<div className="row filterRow mb-2">
							<div className="col-md-12 text-center">Last Update Date</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="lastUpdate_date_form"
							          label="From"
							          format="yyyy/MM/dd"
							          maxDate={new Date()}
							          name="lastUpdateDate_from"
							          value={lastUpdateDate_from}
							          onChange={(key,date)=>this.handleDateChange('lastUpdateDate_from',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
							          margin="normal"
							          id="lastUpdate_date_to"
							          label="to"
							          format="yyyy/MM/dd"
							          maxDate={new Date()}
							          name="lastUpdateDate_to"
							          value={lastUpdateDate_to}
							          onChange={(key,date)=>this.handleDateChange('lastUpdateDate_to',date)}
							          KeyboardButtonProps={{
							            'aria-label': 'change date',
							          }}
							        />
							    </MuiPickersUtilsProvider> 
							</div>
						</div>
					</div>	
				</PerfectScrollbar>	
						<div className="row">
							<div className="col-sm-6 text-right col-6">
								<div className="form-group">
									<button type="submit" className="btn btn-success" onClick={this.applyFilter}>Apply</button>
								</div>
							</div>
							<div className="col-sm-6 col-6">	
								<div className="form-group">
									<button type="submit" className="btn btn-danger" onClick={this.resetFilter}>Reset</button>
								</div>
							</div>	
						</div>	
			</Aux>
		);
	};
};

export default withRouter(Filter);

import React, {Component} from "react";
import "./filter.css";
import Aux from "../../utils/Aux/aux";
import { Multiselect } from 'multiselect-react-dropdown';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {getAutoCompleteProject} from "../../dataParser/getProjectData";
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

class Filter extends Component { 

	constructor(props) {
    	super(props);
		this.state = {
			option: [] ,
            isLoading : false,
            assignedDate_from : new Date(),
            assignedDate_to : new Date(),
            commingDate_from : new Date(),
            commingDate_to : new Date(),
            closedDate_from : new Date(),
            closedDate_to : new Date(),
            visitDate_from : new Date(),
            visitDate_to : new Date(),
            hpOpDate_from : new Date(),
            hpOpDate_to : new Date(),
            followDate_from : new Date(),
            followDate_to : new Date(),
            lastUpdateDate_from : new Date(),
            lastUpdateDate_to : new Date(),
            city : '',
            closeReason : '',
            visit_status : '',
            hpOpStaus : '',
            magnet_lead : '',
            presale_lead : '',
            client_type : ''
		};
	}

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

	handleDateChange = (key, date) =>{

		console.log("XXXXXXXXXXXXXX",key);
		console.log(date);
		this.setState({[key] : date});
	}

	handleChange = event => {
		this.setState({[event.target.name]: event.target.value});
  	};

	render(){

		const {option,client_type,isLoading,assignedDate_from,assignedDate_to,commingDate_from,commingDate_to,closedDate_from,closedDate_to,visitDate_from,visitDate_to,hpOpDate_from,hpOpDate_to,followDate_from,followDate_to,lastUpdateDate_from,lastUpdateDate_to,city,closeReason,visit_status,hpOpStaus,magnet_lead,presale_lead} = this.state;
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
								      id="asynchronous-demo"
								      getOptionSelected={(option, value) => option.project_name === value.project_name}
								      getOptionLabel={option => option.project_name}
								      options={option}
								      loading={isLoading}
								      renderTags={(value, getTagProps) =>
									    value.map((option, index) => (
									      <Chip label={option.project_name} {...getTagProps({ index })} disabled={index === 0} />
									    ))
									  }
								      onChange={(_event, option) => {
								        console.log(option);
								        this.setState({
								        	project_name : option.project_name,
								        	project_id : option.project_id
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
							<div className="col-lg-6 col-sm-6 col-6">
								<div className="form-group">
									<TextField
							          required
							          id="source"
							          name="source"
							          onChange={this.handleChange}
							          label="Source"
							          defaultValue=""
							          helperText=""
							        />
								</div>
							</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<div className="form-group">
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
								          <MenuItem value="mumbai">Mumbai</MenuItem>
								          <MenuItem value="pune">Pune</MenuItem>
								          <MenuItem value="bangalore">Bangalore</MenuItem>
								          <MenuItem value="delhi">Delhi</MenuItem>
								          <MenuItem value="kolkata">Kolkata</MenuItem>
								          <MenuItem value="goa">Goa</MenuItem>
								        </Select>
									</FormControl>
								</div>
							</div>
						</div>
						<div className="row filterRow">
							<div className="col-lg-6 col-sm-6 col-6">
								<div className="form-group">
									<TextField
							          required
							          id="region"
							          name="region"
							          onChange={this.handleChange}
							          label="Region"
							          defaultValue=""
							          helperText=""
							        />
								</div>
							</div>
							<div className="col-lg-6 col-sm-6 col-6">
								<div className="form-group">
									<TextField
							          required
							          id="mobile_num"
							          name="mobile_num"
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
								<div className="form-group">
							        <FormControl>
									    <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
								        <Select
								          labelId="demo-controlled-open-select-label"
								          value={client_type}
								          onChange={this.handleChange}
								          inputProps={{
								            name: 'client_type',
								            id: 'client_type',
								          }}
								        >
							          	<MenuItem value="">
							            	<em>None</em>
							          	</MenuItem>
							          	<MenuItem value="not update">not update</MenuItem>
										<MenuItem value="remind me later">remind me later</MenuItem>
										<MenuItem value="opportunity">opportunity</MenuItem>  
										<MenuItem value="pipeline">pipeline</MenuItem>
										<MenuItem value="gross eoi application">gross eoi application</MenuItem>
										<MenuItem value="decision delayed">decision delayed</MenuItem>
										<MenuItem value="Booked">Booked</MenuItem>
										<MenuItem value="close">close</MenuItem>
							        </Select>
								</FormControl>
								</div>
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
							<div className="col-lg-6 col-sm-6 col-6">
								<div className="form-group">
									<TextField
							          required
							          id="magnet_lead_rm"
							          name="magnet_lead_rm"
							          onChange={this.handleChange}
							          label="Magnet Lead Rm"
							          defaultValue=""
							         
							          helperText=""
							        />
								</div>
							</div>
							<div className="col-sm-6 col-6">	
								<div className="form-group">
									<TextField
							          required
							          id="pre_sale_rm"
							          name="pre_sale_rm"
							          onChange={this.handleChange}
							          label="PreSale Rm"
							          defaultValue=""
							          helperText=""
							        />
								</div>
							</div>
						</div>
						<div className="row filterRow mb-2">
							<div className="col-lg-6 col-sm-6 col-6">
								<FormControl>
								    <InputLabel id="demo-controlled-open-select-label">Magnet Lead</InputLabel>
							        <Select
							          labelId="demo-controlled-open-select-label"
							          value={magnet_lead}
							          onChange={this.handleChange}
							          inputProps={{
							            name: 'magnet_lead',
							            id: 'magnet_lead_status',
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
							          value={presale_lead}
							          onChange={this.handleChange}
							          inputProps={{
							            name: 'presale_lead',
							            id: 'presale_lead_status',
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
							          format="MM/dd/yyyy"
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
							          format="MM/dd/yyyy"
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
							          format="MM/dd/yyyy"
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
							          format="MM/dd/yyyy"
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
					          		  format="MM/dd/yyyy"											
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
							          format="MM/dd/yyyy"
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
							          format="MM/dd/yyyy"
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
							          format="MM/dd/yyyy"
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
							          format="MM/dd/yyyy"
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
							          format="MM/dd/yyyy"
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
							          format="MM/dd/yyyy"
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
							          format="MM/dd/yyyy"
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
							          format="MM/dd/yyyy"
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
							          format="MM/dd/yyyy"
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
									<button type="submit" className="btn btn-success" onClick={this.getfilterData}>Apply</button>
								</div>
							</div>
							<div className="col-sm-6 col-6">	
								<div className="form-group">
									<button type="submit" className="btn btn-danger">Reset</button>
								</div>
							</div>	
						</div>	
			</Aux>
		);
	};
};

export default Filter;

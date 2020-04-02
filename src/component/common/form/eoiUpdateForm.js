import React, {Component} from 'react';
import Aux from "../../../utils/Aux/aux.js";
import {withRouter} from "react-router-dom";
import "./form.css";
import SweetAlert from "../../../component/common/sweetAlert/sweetAlertSuccess";
import {Form} from 'react-bootstrap';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from "@material-ui/core/CircularProgress";
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import ApartmentRoundedIcon from '@material-ui/icons/ApartmentRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import GpsFixedRoundedIcon from '@material-ui/icons/GpsFixedRounded';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {getUpdateLeadData} from "../../../dataParser/getListData";


const validateName = RegExp(/^[a-zA-Z ]+$/);
const validateNumber = RegExp(/^(\d{6}|\d{7})$/);

class eoiUpdateForm extends Component {

	constructor(props) {
    	super(props);
		this.state = {
			project_addedby: '',
			lead_status_id : '',
			leadId : '',
            sitevisit_date :null,
            followup_date :null,
            booking_date :null,
            lead_sattus :'',
            property_type :'',
            interested_area :'',
            current_locality :'',
            sweetShow:false,
            type : "success",
            title : "",
            errors : {
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

	    console.log("NEw Form=======_------------>", this.props.leadStatus);
	    console.log("NEw Form=======_------------>", this.props.leadID);
	    let leadStatus = this.props.leadStatus;
	    let leadId = this.props.leadID;
	    this.setState({
	    	lead_status_id : leadStatus,
	    	leadId : leadId 
	    })
	}

	updateLeadFrom = async (e) =>{

 		e.preventDefault();
 		let upadateLeadReq = {};
		let leadId = this.state.leadId;

		const addLeadRequest = (({lead_status_id,lead_sattus,sitevisit_date,current_locality,interested_area,followup_date,booking_date,property_type}) => ({
			sitevisit_date,
			followup_date,
			lead_sattus,
			lead_status_id,
			booking_date,
			property_type,
			interested_area,
			current_locality
	    }))(this.state);

	    console.log("addLeadRequest XXXXXXXXXXXX",addLeadRequest)

	    if(addLeadRequest.lead_sattus != "" &&  addLeadRequest.followup_date != null){

	    	upadateLeadReq.id = leadId;
		    upadateLeadReq.data = addLeadRequest;

		    if(addLeadRequest.lead_sattus != "" &&  addLeadRequest.followup_date != null){

		    	var addLeadRes = await getUpdateLeadData(upadateLeadReq);
			    console.log("addLeadRes XXXXXXXXXXXX",addLeadRes);

			    if(addLeadRes.meta.status === 200){
			    	
			    	console.log("Lead insert successfully !!!");

			    	this.setState({
		                sweetShow:true,
		                type : "success",	
		                title : "Lead Updated Successfully!!!"

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

		    }
		}    
	}

	onChange = (e) => {

	    this.setState({ [e.target.name]: e.target.value });
 	}

	handleSweet=()=>{
    	this.props.changeModal()
        this.setState({sweetShow : !this.state.sweetShow});
    }

    handleDateChange = (key, date) =>{

		this.setState({[key] : date});
	}

    render() {

	    const {sweetShow, type, title,sitevisit_date,lead_sattus,followup_date,property_type,booking_date} = this.state;
	    console.log("in the render", this.state);

        return (
            <Aux>
            	<div className="projectForm">
                    <SweetAlert show={sweetShow} type={type} title={title} changeSweet={this.handleSweet}/>
					<form role="form">
						<div className="card-body">
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<TextField
								          required
								          id="interested_area"
								          name="interested_area"
								          onChange={this.onChange}
								          label="Area Interested"
								          defaultValue=""
								          helperText=""
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
								<div className="col-sm-6">
									<div className="form-group">
										<TextField
								          required
								          id="current_locality"
								          name="current_locality"
								          onChange={this.onChange}
								          label="Current Locality"
								          defaultValue=""
								          helperText=""
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
								<div className="col-sm-6">
									<FormControl>
									    <InputLabel id="demo-controlled-open-select-label">Property Type</InputLabel>
								        <Select
								          labelId="demo-controlled-open-select-label"
								          value={property_type}
								          onChange={this.onChange}
								          inputProps={{
								            name: 'property_type',
								            id: 'property_type',
								          }}
								        >
								          <MenuItem value="">
								            <em>None</em>
								          </MenuItem>
								          	<MenuItem value="New Development-Ready to move">New Development-Ready to move</MenuItem>
											<MenuItem value="New Development-Under Constrution">New Development-Under Constrution</MenuItem>
											<MenuItem value="Resale">Resale</MenuItem>
											<MenuItem value="Rental">Rental</MenuItem> 
								        </Select>
									</FormControl>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<FormControl>
									    <InputLabel id="demo-controlled-open-select-label">Site Visit status</InputLabel>
								        <Select
								          labelId="demo-controlled-open-select-label"
								          value={lead_sattus}
								          onChange={this.onChange}
								          inputProps={{
								            name: 'lead_sattus',
								            id: 'lead_sattus',
								          }}
								        >
								          <MenuItem value="">
								            <em>None</em>
								          </MenuItem>
											<MenuItem value="Visit Confirmed">Visit Confirmed</MenuItem>
											<MenuItem value="Visit Confirmed Not Done">Visit Confirmed Not Done</MenuItem>
											<MenuItem value="Visit Done Not Booked">Visit Done Not Booked</MenuItem>
											<MenuItem value="Visit Done Booked">Visit Done Booked</MenuItem>
											<MenuItem value="Revisit Confirmed">Revisit Confirmed</MenuItem>
											<MenuItem value="Revisit Confirmed Not Done">Revisit Confirmed Not Done</MenuItem>
											<MenuItem value="Revisit Done Not Booked">Revisit Done Not Booked</MenuItem>
											<MenuItem value="Revisit Done Booked">Revisit Done Booked</MenuItem>
								        </Select>
									</FormControl>
								</div>
								<div className="col-sm-6">
									<FormControl>
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<KeyboardDatePicker
									          margin="normal"
									          id="assigned_date_form"
									          label="Site Visit Date"
									          format="MM/dd/yyyy"
									          maxDate={new Date()}
									          name="sitevisit_date"
									          value={sitevisit_date}
									          onChange={(key,date)=>this.handleDateChange('sitevisit_date',date)}
									          KeyboardButtonProps={{
									            'aria-label': 'change date',
									          }}
									        />
								    	</MuiPickersUtilsProvider> 
									</FormControl>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<FormControl>
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<KeyboardDatePicker
									          margin="normal"
									          id=""
									          label="Follow Up Date"
									          format="MM/dd/yyyy"
									          maxDate={new Date()}
									          name="followup_date"
									          value={followup_date}
									          onChange={(key,date)=>this.handleDateChange('followup_date',date)}
									          KeyboardButtonProps={{
									            'aria-label': 'Follow Up Date',
									          }}
									        />
								    	</MuiPickersUtilsProvider> 
									</FormControl>
								</div>
								<div className="col-sm-6">
									<FormControl>
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<KeyboardDatePicker
									          margin="normal"
									          id=""
									          label="Booking Date"
									          format="MM/dd/yyyy"
									          maxDate={new Date()}
									          name="booking_date"
									          value={booking_date}
									          onChange={(key,date)=>this.handleDateChange('booking_date',date)}
									          KeyboardButtonProps={{
									            'aria-label': 'booking_date',
									          }}
									        />
								    	</MuiPickersUtilsProvider> 
									</FormControl>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12 col-sm-12 text-center col-12">
									<div className="form-group">
										<button type="submit" className="btn btn-success" onClick={this.updateLeadFrom}>Submit</button>
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

export default withRouter(eoiUpdateForm);

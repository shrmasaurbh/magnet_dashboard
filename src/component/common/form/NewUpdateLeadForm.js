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
import TranslateIcon from '@material-ui/icons/Translate';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const validateName = RegExp(/^[a-zA-Z ]+$/);
const validateNumber = RegExp(/^(\d{6}|\d{7})$/);

class newUpdateLeadForm extends Component {

	constructor(props) {
    	super(props);
		this.state = {
			project_addedby: '',
			visit_status : '',
			ethinicity : '',
			marital_status : '',
			flat_type : '',
			flat_number : '',
			wing_number : '',
			booking_amonut : '',
			special_discount : '',
			carpet_area : '',
            sweetShow:false,
            assignedDate_from :null,
			followup_date : null,
			closed_lead_time_date : null,
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
	}

	addNewLead = async (e) =>{

 		e.preventDefault();

		const addLeadRequest = (({visit_status,marital_status,carpet_area,special_discount,booking_amonut,flat_type,wing_number,flat_number,ethinicity,assignedDate_from,followup_date,closed_lead_time_date}) => ({
			visit_status,
			marital_status,
			ethinicity,
			assignedDate_from,
			followup_date,
			closed_lead_time_date,
			flat_type,
			flat_number,
			wing_number,
			booking_amonut,
			carpet_area,
			special_discount
	    }))(this.state);

	    console.log("addLeadRequest XXXXXXXXXXXX",addLeadRequest)

	    if(addLeadRequest.visit_status != "" &&  addLeadRequest.followup_date != null){

	    	// var addLeadRes = await getAddLeadData(addLeadRequest);
		    // console.log("addLeadRes XXXXXXXXXXXX",addLeadRes);

		    // if(addLeadRes.meta.status === 201){
		    	
		    // 	console.log("Lead insert successfully !!!");

		    // 	this.setState({
	     //            sweetShow:true,
	     //            type : "success",	
	     //            title : "Lead Added Successfully!!!"

	     //        });

		    // }else if(addLeadRes.meta.status === 401){
        		
      //   		localStorage.clear();
      //   		this.props.history.push("/login");
        		
      //   	}else{
		    	
		    // 	this.setState({
	     //            sweetShow:true,
	     //            type : "error",
	     //            title : addLeadRes.meta.message
	     //        });
		    // }
	    }else{

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

	    const {sweetShow, type, title,assignedDate_from,visit_status,ethinicity,marital_status,followup_date,closed_lead_time_date} = this.state;
	    console.log("in the render", this.state);

        return (
            <Aux>
            	<div className="projectForm">
                    <SweetAlert show={sweetShow} type={type} title={title} changeSweet={this.handleSweet}/>
					<form role="form">
						<div className="card-body">
							<div className="row">
								<div className="col-sm-6">
									<FormControl>
									    <InputLabel id="demo-controlled-open-select-label">Ethinicity</InputLabel>
								        <Select
								          labelId="demo-controlled-open-select-label"
								          value={ethinicity}
								          onChange={this.onChange}
								          inputProps={{
								            name: 'ethinicity',
								            id: 'ethinicity',
								            startAdornment: (
									            <InputAdornment position="start">
									              <TranslateIcon />
									            </InputAdornment>
									        ),
								          }}
								        >
								          <MenuItem value="">
								            <em>None</em>
								          </MenuItem>
								          	<MenuItem value="Bengali">Bengali</MenuItem>
											<MenuItem value="Gujrati">Gujrati</MenuItem>
											<MenuItem value="Hindi">Hindi</MenuItem>
											<MenuItem value="Punjabi">Punjabi</MenuItem>
											<MenuItem value="Sindhi">Sindhi</MenuItem>
											<MenuItem value="Tamil">Tamil</MenuItem>
											<MenuItem value="Kannada">Kannada</MenuItem>
											<MenuItem value="Malyalam">Malyalam</MenuItem>
											<MenuItem value="Marathi">Marathi</MenuItem>
											<MenuItem value="Telugu">Telugu</MenuItem>
											<MenuItem value="Marwadi">Marwadi</MenuItem>
											<MenuItem value="Muslim">Muslim</MenuItem>
											<MenuItem value="Christian">Christian</MenuItem>
								        </Select>
									</FormControl>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<TextField
								          required
								          id="flat_type"
								          name="flat_type"
								          onChange={this.onChange}
								          label="Flat type"
								          defaultValue=""
								          helperText=""
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
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<TextField
								          required
								          id="flat_number"
								          name="flat_number"
								          onChange={this.onChange}
								          label="Flat Number"
								          defaultValue=""
								          helperText=""
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
								<div className="col-sm-6">
									<div className="form-group">
										<TextField
								          required
								          id="wing_number"
								          name="wing_number"
								          onChange={this.onChange}
								          label="Wing Number"
								          defaultValue=""
								          helperText=""
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
								<div className="col-sm-6">
									<div className="form-group">
										<TextField
								          required
								          id="booking_amonut"
								          name="booking_amonut"
								          onChange={this.onChange}
								          label="Booking Amonut"
								          defaultValue=""
								          helperText=""
								          InputProps={{
								          	startAdornment: (
								            	<InputAdornment position="start">
								              		<AttachMoneyIcon />
								            	</InputAdornment>
								          	),
									      }}
								        />
									</div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<TextField
								          required
								          id="carpet_area"
								          name="carpet_area"
								          onChange={this.onChange}
								          label="Carpet Area"
								          defaultValue=""
								          helperText=""
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
							<div className="row">
								<div className="col-sm-6">
									<FormControl>
									    <InputLabel id="demo-controlled-open-select-label">Marital Status</InputLabel>
								        <Select
								          labelId="demo-controlled-open-select-label"
								          value={marital_status}
								          onChange={this.onChange}
								          inputProps={{
								            name: 'marital_status',
								            id: 'marital_status',
								          }}
								        >
								          <MenuItem value="">
								            <em>None</em>
								          </MenuItem>
								          	<MenuItem value="Married">Married</MenuItem>
											<MenuItem value="Unmarried">Unmarried</MenuItem>
								        </Select>
									</FormControl>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<TextField
								          required
								          id="special_discount"
								          name="special_discount"
								          onChange={this.onChange}
								          label="Special Discount"
								          defaultValue=""
								          helperText=""
								          InputProps={{
									          startAdornment: (
									            <InputAdornment position="start">
									              <MoneyOffIcon />
									            </InputAdornment>
									          ),
									      }}
								        />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<FormControl>
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<KeyboardDatePicker
									          margin="normal"
									          id="assigned_date_form"
									          label="Site Visit Date"
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
									</FormControl>
								</div>
								<div className="col-sm-6">
									<FormControl>
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<KeyboardDatePicker
									          margin="normal"
									          id="followup_date"
									          label="Follow Up Date"
									          format="MM/dd/yyyy"
									          maxDate={new Date()}
									          name="followup_date"
									          value={followup_date}
									          onChange={(key,date)=>this.handleDateChange('followup_date',date)}
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
									    <InputLabel id="demo-controlled-open-select-label">Site Visit status</InputLabel>
								        <Select
								          labelId="demo-controlled-open-select-label"
								          value={visit_status}
								          onChange={this.onChange}
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
									          id="closed_lead_time_date"
									          label="Closed Lead Time Date"
									          format="MM/dd/yyyy"
									          maxDate={new Date()}
									          name="closed_lead_time_date"
									          value={closed_lead_time_date}
									          onChange={(key,date)=>this.handleDateChange('closed_lead_time_date',date)}
									          KeyboardButtonProps={{
									            'aria-label': 'change date',
									          }}
									        />
								    	</MuiPickersUtilsProvider> 
									</FormControl>
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

export default withRouter(newUpdateLeadForm);

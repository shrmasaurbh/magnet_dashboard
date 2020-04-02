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
import TranslateIcon from '@material-ui/icons/Translate';
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

class cancelUpdateForm extends Component {

	constructor(props) {
    	super(props);
		this.state = {
			project_addedby: '',
			lead_status_id : '',
			leadId : '',
            sitevisit_date :null,
            closed_date :null,
            lead_sattus  :'',
            opccuption :'',
            ethinicity :'',
            max_budget :'',
            min_budget :'',
            cancellation_reason :'',
            required_bhk :'',
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

		const addLeadRequest = (({lead_status_id,cancellation_reason,lead_sattus ,marital_status,current_locality,opccuption,property_type,required_bhk,max_budget,min_budget,carpet_area,special_discount,booking_amonut,flat_type,wing_number,flat_number,ethinicity,sitevisit_date,closed_date}) => ({
			lead_sattus ,
			sitevisit_date,
			lead_status_id,
			closed_date,
			ethinicity,
			required_bhk,
			max_budget,
			min_budget,
			cancellation_reason,
			opccuption
	    }))(this.state);

	    console.log("addLeadRequest XXXXXXXXXXXX",addLeadRequest)

	    if(addLeadRequest.lead_sattus  != "" &&  addLeadRequest != null){

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

	    const {sweetShow, type, title,sitevisit_date,lead_sattus ,required_bhk,max_budget,min_budget,opccuption,closed_date,ethinicity} = this.state;
	    console.log("in the render", this.state);

        return (
            <Aux>
            	<div className="projectForm">
                    <SweetAlert show={sweetShow} type={type} title={title} changeSweet={this.handleSweet}/>
					<form role="form">
						<div className="card-body">
							<div className="row">
								<div className="col-sm-6 mb-3">
									<FormControl>
									    <InputLabel id="demo-controlled-open-select-label">Bed Config</InputLabel>
								        <Select
								          labelId="demo-controlled-open-select-label"
								          value={required_bhk}
								          onChange={this.onChange}
								          inputProps={{
								            name: 'required_bhk',
								            id: 'required_bhk',
								          }}
								        >
								          <MenuItem value="">
								            <em>None</em>
								          </MenuItem>
											<MenuItem value="1 bhk">1 BHK</MenuItem>
											<MenuItem value="2 bhk">2 BHK</MenuItem>
											<MenuItem value="3 bhk">3 BHK</MenuItem>
											<MenuItem value="4 bhk">4 BHK</MenuItem>
											<MenuItem value="5 bhk">5 BHK</MenuItem>
											<MenuItem value="6 bhk">6 BHK</MenuItem>
											<MenuItem value="7 bhk">7 BHK</MenuItem>
											<MenuItem value="8 bhk">8 BHK</MenuItem>
											<MenuItem value="9 bhk">9 BHK</MenuItem>
											<MenuItem value="10 bhk">10 BHK</MenuItem>
								        </Select>
									</FormControl>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-6 mb-3">
									<FormControl>
									    <InputLabel id="demo-controlled-open-select-label">Min budget</InputLabel>
								        <Select
								          labelId="demo-controlled-open-select-label"
								          value={min_budget}
								          onChange={this.onChange}
								          inputProps={{
								            name: 'min_budget',
								            id: 'min_budget',
								          }}
								        >
								          <MenuItem value="">
								            <em>None</em>
								          </MenuItem>
											<MenuItem selected="" value="20 Lacs">20 Lacs</MenuItem>
											<MenuItem value="25 Lacs">25 Lacs</MenuItem>
											<MenuItem value="30 Lacs">30 Lacs</MenuItem>
											<MenuItem value="35 Lacs">35 Lacs</MenuItem>
											<MenuItem value="40 Lacs">40 Lacs</MenuItem>
											<MenuItem value="45 Lacs">45 Lacs</MenuItem>
											<MenuItem value="50 Lacs">50 Lacs</MenuItem>
											<MenuItem value="55 Lacs">55 Lacs</MenuItem>
											<MenuItem value="60 Lacs">60 Lacs</MenuItem>
											<MenuItem value="65 Lacs">65 Lacs</MenuItem>
											<MenuItem value="70 Lacs">70 Lacs</MenuItem>
											<MenuItem value="75 Lacs">75 Lacs</MenuItem>
											<MenuItem value="80 Lacs">80 Lacs</MenuItem>
											<MenuItem value="85 Lacs">85 Lacs</MenuItem>
											<MenuItem value="90 Lacs">90 Lacs</MenuItem>
											<MenuItem value="1 Crores">1 Crores</MenuItem>
											<MenuItem value="1.2 Crores">1.2 Crores</MenuItem>
											<MenuItem value="1.5 Crores">1.5 Crores</MenuItem>
											<MenuItem value="2 Crores">2 Crores</MenuItem> 
											<MenuItem value="2.3  Crores">2.3  Crores</MenuItem>  
											<MenuItem value="2.6 Crores">2.6 Crores</MenuItem> 
											<MenuItem value="3 Crores">3 Crores</MenuItem>   
											<MenuItem value="3.5 Crores">3.5 Crores</MenuItem> 
											<MenuItem value="4 Crores">4 Crores</MenuItem>   
											<MenuItem value="4.5 Crores">4.5 Crores</MenuItem>                                                 
											<MenuItem value="5 Crores">5 Crores</MenuItem>   
											<MenuItem value="10 Crores">10 Crores</MenuItem> 
											<MenuItem value="20 Crores">20 Crores</MenuItem> 
								        </Select>
									</FormControl>
								</div>
								<div className="col-sm-6">
									<FormControl>
									    <InputLabel id="demo-controlled-open-select-label">Max budget</InputLabel>
								        <Select
								          labelId="demo-controlled-open-select-label"
								          value={max_budget}
								          onChange={this.onChange}
								          inputProps={{
								            name: 'max_budget',
								            id: 'max_budget',
								          }}
								        >
								          <MenuItem value="">
								            <em>None</em>
								          </MenuItem>
											<MenuItem selected="" value="20 Lacs">20 Lacs</MenuItem>
											<MenuItem value="25 Lacs">25 Lacs</MenuItem>
											<MenuItem value="30 Lacs">30 Lacs</MenuItem>
											<MenuItem value="35 Lacs">35 Lacs</MenuItem>
											<MenuItem value="40 Lacs">40 Lacs</MenuItem>
											<MenuItem value="45 Lacs">45 Lacs</MenuItem>
											<MenuItem value="50 Lacs">50 Lacs</MenuItem>
											<MenuItem value="55 Lacs">55 Lacs</MenuItem>
											<MenuItem value="60 Lacs">60 Lacs</MenuItem>
											<MenuItem value="65 Lacs">65 Lacs</MenuItem>
											<MenuItem value="70 Lacs">70 Lacs</MenuItem>
											<MenuItem value="75 Lacs">75 Lacs</MenuItem>
											<MenuItem value="80 Lacs">80 Lacs</MenuItem>
											<MenuItem value="85 Lacs">85 Lacs</MenuItem>
											<MenuItem value="90 Lacs">90 Lacs</MenuItem>
											<MenuItem value="1 Crores">1 Crores</MenuItem>
											<MenuItem value="1.2 Crores">1.2 Crores</MenuItem>
											<MenuItem value="1.5 Crores">1.5 Crores</MenuItem>
											<MenuItem value="2 Crores">2 Crores</MenuItem> 
											<MenuItem value="2.3  Crores">2.3  Crores</MenuItem>  
											<MenuItem value="2.6 Crores">2.6 Crores</MenuItem> 
											<MenuItem value="3 Crores">3 Crores</MenuItem>   
											<MenuItem value="3.5 Crores">3.5 Crores</MenuItem> 
											<MenuItem value="4 Crores">4 Crores</MenuItem>   
											<MenuItem value="4.5 Crores">4.5 Crores</MenuItem>                                                 
											<MenuItem value="5 Crores">5 Crores</MenuItem>   
											<MenuItem value="10 Crores">10 Crores</MenuItem> 
											<MenuItem value="20 Crores">20 Crores</MenuItem> 
								        </Select>
									</FormControl>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<TextField
								        	id="standard-multiline-flexible"
								          	label="Cancel Reason"
								          	name="cancellation_reason"
								          	multiline
								          	rowsMax="4"
								          	value={this.state.cancellation_reason}
								          	onChange={this.onChange}
								        />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<FormControl>
									    <InputLabel id="demo-controlled-open-select-label">Occuption</InputLabel>
								        <Select
								          labelId="demo-controlled-open-select-label"
								          value={opccuption}
								          onChange={this.onChange}
								          inputProps={{
								            name: 'opccuption',
								            id: 'opccuption',
								          }}
								        >
								          <MenuItem value="">
								            <em>None</em>
								          </MenuItem>
								          	<MenuItem value="Admin/Secretarial">Admin/Secretarial</MenuItem>
											<MenuItem value="Advertising/ Entertainment/ Media">Advertising/ Entertainment/ Media</MenuItem>
											<MenuItem value="Agriculture">Agriculture</MenuItem>
											<MenuItem value="Architecture and Design">Architecture and Design</MenuItem>
											<MenuItem value="Artists,">Artists,</MenuItem>
											<MenuItem value="Animators and Web Designers">Animators and Web Designers</MenuItem>
											<MenuItem value="Banking,">Banking,</MenuItem>
											<MenuItem value="Insurance and Financial Services">Insurance and Financial Services</MenuItem>
											<MenuItem value="Beauty">Beauty</MenuItem>
											<MenuItem value="Fashion and Jewellery Designers">Fashion and Jewellery Designers</MenuItem>
											<MenuItem value="Business Owner / Entrepreneur">Business Owner / Entrepreneur</MenuItem>
											<MenuItem value="Civil Services / Law Enforcement">Civil Services / Law Enforcement</MenuItem>
											<MenuItem value="Construction">Construction</MenuItem>
											<MenuItem value="Customer Service/ Call Centre/BPO">Customer Service/ Call Centre/BPO</MenuItem>
											<MenuItem value="Defence">Defence</MenuItem>
											<MenuItem value="Education/ Training">Education/ Training</MenuItem>
											<MenuItem value="Electronics">Electronics</MenuItem>
											<MenuItem value="Export/ Import">Export/ Import</MenuItem>
											<MenuItem value="Finance and Accounts">Finance and Accounts</MenuItem>
											<MenuItem value="Government Employee">Government Employee</MenuItem>
											<MenuItem value="Health Care">Health Care</MenuItem>
											<MenuItem value="Hotels/ Restaurants">Hotels/ Restaurants</MenuItem>
											<MenuItem value="Human Resource">Human Resource</MenuItem>
											<MenuItem value="IT">IT</MenuItem>
											<MenuItem value="Legal">Legal</MenuItem>
											<MenuItem value="Loss Prevention Manager">Loss Prevention Manager</MenuItem>
											<MenuItem value="Management / Corporate Professionals">Management / Corporate Professionals</MenuItem>
											<MenuItem value="Manufacturing/ Engineering/ R&amp;D">Manufacturing/ Engineering/ R&amp;D</MenuItem>
											<MenuItem value="Marketing and Communications">Marketing and Communications</MenuItem>
											<MenuItem value="Merchant Navy">Merchant Navy</MenuItem>
											<MenuItem value="Non Working">Non Working</MenuItem>
											<MenuItem value="Oil &amp; Gas">Oil &amp; Gas</MenuItem>
											<MenuItem value="Others">Others</MenuItem>
											<MenuItem value="Pharmaceutical/ Biotechnology">Pharmaceutical/ Biotechnology</MenuItem>
											<MenuItem value="Purchase/ Logistics/ Supply chain">Purchase/ Logistics/ Supply chain</MenuItem>
											<MenuItem value="Real Estate">Real Estate</MenuItem>
											<MenuItem value="Retail Chains">Retail Chains</MenuItem>
											<MenuItem value="Sales/ Business Development">Sales/ Business Development</MenuItem>
											<MenuItem value="Science">Science</MenuItem>
											<MenuItem value="Telecom/ ISP">Telecom/ ISP</MenuItem>
											<MenuItem selected="" value="Travel/ Airlines">Travel/ Airlines</MenuItem>
								        </Select>
									</FormControl>
								</div>
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
									          id="closed_date"
									          label="Closed Lead Time Date"
									          format="MM/dd/yyyy"
									          maxDate={new Date()}
									          name="closed_date"
									          value={closed_date}
									          onChange={(key,date)=>this.handleDateChange('closed_date',date)}
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

export default withRouter(cancelUpdateForm);

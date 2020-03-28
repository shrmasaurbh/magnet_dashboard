import React, {Component} from "react";

import siteImage from "../../assets/image/HomesfyLogo.jpg";
import "./forget.css";
import {Link} from "react-router-dom";
import "../../assets/css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import {getFrogetPwd, getChangePwdRes} from "../../dataParser/auth";

class Forget extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	      mobile_number: "",
	      showLoader: false,
	      error : false,
	      meta :  "",
	      password : "",
	      confirmpassword : ""
	    };
 	}

 	onChange = (e) => {

	    this.setState({ [e.target.name]: e.target.value });

 	}

	getForgetRes = async e =>{
		e.preventDefault();

	    this.setState({ showLoader : true});
	   	let forgetData = {};
	   	forgetData.mobile_number = this.state.mobile_number;

	    let resData = await getFrogetPwd(forgetData);
    	if(resData.meta.status === 200){
	    	this.setState({ 
	    		showLoader : false,
	    		meta : resData.meta
	    	});
	    }else{
	    	this.setState({
	    		showLoader : false,
	    		error : resData.meta.message
	    	})
	    }
	}


	getChangeRes = async e =>{
		e.preventDefault();

		const changePwdRequest = (({ mobile_number, password, confirmpassword }) => ({
	      mobile_number,
	      password,
	      confirmpassword
	    }))(this.state);

	    if(changePwdRequest.password != "" && changePwdRequest.confirmpassword != "" && changePwdRequest.password === changePwdRequest.confirmpassword){
	    	let resData = await getChangePwdRes(changePwdRequest);

	    	if(resData.meta.status === 200){
		    	this.setState({ showLoader : false});
		      	this.props.history.push("/login");
	    	}
		    else{
		    	this.setState({
		    		showLoader : false,
		    		error : resData.meta.message
		    	})
		    }
	    }else{
	    	this.setState({
	    		showLoader : false,
	    		error : "please enter same password as above !!!",
	    	})
	    }

	}

	render(){

		const {error, meta} = this.state;

		return(
			<div className="login-page">
				<div className="login-box">
					<div className="card">
						<div className="card-header p-0">
		            		<div className="login-logo pt-3 pb-3">
				              	<img className="site_img" src={siteImage} alt="site-image" />
				            </div>
		            	</div>
	    		{meta.status === 200 ? 

	    				<div className="card-body login-card-body">
						    <p className="login-box-msg">You are only one step a way from your new password, recover your password now.</p>

						    <form action="login.html" method="post">
						        <div className="input-group mb-3">
						          	<input 
						          		type="text" 
						          		className="form-control" 
						          		placeholder="Email Or mobile" 
						          		value = {this.state.mobile_number}
						          		name="mobile_number"
						          		required
						          		autoComplete="off"
					          		/>
					        	  	<div className="input-group-append">
							            <div className="input-group-text">
							              <FontAwesomeIcon icon={faEnvelope} className="text-success" />
							            </div>
						          	</div>
						        </div>
						        <div className="input-group mb-3">
						          	<input 
						          		type="password" 
						          		name="password" 
						          		className="form-control" 
						          		placeholder="New Password"
		                            	onChange={this.onChange}
						          		required
						          		autoComplete="off" 
					          		/>
						          	<div className="input-group-append">
							            <div className="input-group-text">
							              <FontAwesomeIcon icon={faLock} className="text-success" />
							            </div>
						          	</div>
						        </div>
						        <div className="input-group mb-3">
						          	<input 
						          		type="password" 
						          		name="confirmpassword" 
		                            	onChange={this.onChange}
						          		className="form-control" 
						          		placeholder="Confirm Password"
						          		required
						          		autoComplete="off" 
					          		/>
							        <div className="input-group-append">
							            <div className="input-group-text">
							              <FontAwesomeIcon icon={faLock} className="text-success" />	
							            </div>
							        </div>
						        </div>
						        <div className="row">
						          <div className="col-12">
						            <button type="submit" className="btn btn-success btn-block" onClick={this.getChangeRes}>Change password</button>
						          </div>
						        </div>
						    </form>

						    <p className="mt-3 mb-1">
						        <Link to="/login">Login</Link>
						    </p>
							<p className="mb-0">
						        <span className="text-center">{error}</span>
						    </p>
					    </div>
	    				:
					    <div className="card-body login-card-body">
					      <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>

					      <form action="#" method="#">
					        <div className="input-group mb-3">
					          	<input 
					          		type="email" 
					          		className="form-control" 
					          		placeholder="Email Or Mobile" 
					          		name = "mobile_number"
		                            onChange={this.onChange}
                          			value={this.state.mobile_number} 
                          			required	
				          		/>
					          <div className="input-group-append">
					            <div className="input-group-text">
					              <FontAwesomeIcon icon={faEnvelope} className="text-success" />
					            </div>
					          </div>
					        </div>
					        <div className="row">
					          <div className="col-12">
					            <button type="submit" className="btn btn-success btn-block" onClick={this.getForgetRes}>Request new password</button>
					          </div>
					        </div>
					      </form>

					      <p className="mt-3 mb-1">
					        <Link to="/login">Login</Link>
					      </p>
					      <p className="mb-0">
					        <a href="#" className="text-center">Register a new member</a>
					      </p>
					      <p className="mb-0">
					        <span className="text-center">{error != '' ? error : ''}</span>
					      </p>
					    </div>
					}    
					 </div>
				</div>	 
			</div>	 
		);

	};
};

export default Forget;
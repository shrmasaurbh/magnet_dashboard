import React, {Component} from "react";

import siteImage from "../../assets/image/HomesfyLogo.jpg";
import "./reset_pass.css";
import {Link} from "react-router-dom";
import "../../assets/css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";

class ResetPass extends Component {

	render(){

		return(
			<div className="login-page">
				<div className="login-box">
					<div className="card">
						<div className="card-header p-0">
		            		<div className="login-logo pt-3 pb-3">
				              	<img className="site_img" src={siteImage} alt="site-image" />
				            </div>
		            	</div>
					    <div className="card-body login-card-body">
					      <p className="login-box-msg">You are only one step a way from your new password, recover your password now.</p>

					      <form action="login.html" method="post">
					        <div className="input-group mb-3">
					          <input type="password" className="form-control" placeholder="Old Password" />
					          <div className="input-group-append">
					            <div className="input-group-text">
					              <FontAwesomeIcon icon={faLock} className="text-success" />
					            </div>
					          </div>
					        </div>
					        <div className="input-group mb-3">
					          <input type="password" className="form-control" placeholder="New Password" />
					          <div className="input-group-append">
					            <div className="input-group-text">
					              <FontAwesomeIcon icon={faLock} className="text-success" />
					            </div>
					          </div>
					        </div>
					        <div className="input-group mb-3">
					          <input type="password" className="form-control" placeholder="Confirm Password" />
					          <div className="input-group-append">
					            <div className="input-group-text">
					              <FontAwesomeIcon icon={faLock} className="text-success" />	
					            </div>
					          </div>
					        </div>
					        <div className="row">
					          <div className="col-12">
					            <button type="submit" className="btn btn-success btn-block">Change password</button>
					          </div>
					        </div>
					      </form>

					      <p className="mt-3 mb-1">
					        <Link to="/login">Login</Link>
					      </p>
					    </div>
					  </div>
				</div>
			</div>	

		);
	};
};

export default ResetPass;
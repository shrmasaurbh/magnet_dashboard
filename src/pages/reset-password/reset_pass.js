import React, {Component} from "react";

import siteImage from "../../assets/image/HomesfyLogo.jpg";
import "./reset_pass.css";
import "../../assets/css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";

class ResetPass extends Component {

	render(){

		return(
			<div className="login-page">
				<div className="login-box">
					<div class="card">
						<div className="card-header p-0">
		            		<div className="login-logo pt-3 pb-3">
				              	<img className="site_img" src={siteImage} alt="site-image" />
				            </div>
		            	</div>
					    <div class="card-body login-card-body">
					      <p class="login-box-msg">You are only one step a way from your new password, recover your password now.</p>

					      <form action="login.html" method="post">
					        <div class="input-group mb-3">
					          <input type="password" class="form-control" placeholder="Old Password" />
					          <div class="input-group-append">
					            <div class="input-group-text">
					              <FontAwesomeIcon icon={faLock} className="text-success" />
					            </div>
					          </div>
					        </div>
					        <div class="input-group mb-3">
					          <input type="password" class="form-control" placeholder="New Password" />
					          <div class="input-group-append">
					            <div class="input-group-text">
					              <FontAwesomeIcon icon={faLock} className="text-success" />
					            </div>
					          </div>
					        </div>
					        <div class="input-group mb-3">
					          <input type="password" class="form-control" placeholder="Confirm Password" />
					          <div class="input-group-append">
					            <div class="input-group-text">
					              <FontAwesomeIcon icon={faLock} className="text-success" />	
					            </div>
					          </div>
					        </div>
					        <div class="row">
					          <div class="col-12">
					            <button type="submit" class="btn btn-success btn-block">Change password</button>
					          </div>
					        </div>
					      </form>

					      <p class="mt-3 mb-1">
					        <a href="#">Login</a>
					      </p>
					    </div>
					  </div>
				</div>
			</div>	

		);
	};
};

export default ResetPass;
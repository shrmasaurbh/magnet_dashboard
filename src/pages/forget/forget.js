import React, {Component} from "react";

import siteImage from "../../assets/image/HomesfyLogo.jpg";
import "./forget.css";
import "../../assets/css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";

class Forget extends Component {

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
					      <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>

					      <form action="#" method="#">
					        <div class="input-group mb-3">
					          <input type="email" class="form-control" placeholder="Email" />
					          <div class="input-group-append">
					            <div class="input-group-text">
					              <FontAwesomeIcon icon={faEnvelope} className="text-success" />
					            </div>
					          </div>
					        </div>
					        <div class="row">
					          <div class="col-12">
					            <button type="submit" class="btn btn-success btn-block">Request new password</button>
					          </div>
					        </div>
					      </form>

					      <p class="mt-3 mb-1">
					        <a href="#">Login</a>
					      </p>
					      <p class="mb-0">
					        <a href="#" class="text-center">Register a new membership</a>
					      </p>
					    </div>
					 </div>
				</div>	 
			</div>	 
		);

	};
};

export default Forget;
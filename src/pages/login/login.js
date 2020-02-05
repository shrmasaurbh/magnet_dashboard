import React, {Component} from "react";

import siteImage from "../../assets/image/HomesfyLogo.jpg";
import "./login.css";
import "../../assets/css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";

class Login extends Component {

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
		                    <p className="login-box-msg">Sign in to start your session</p>
		                    <form action="#" method="post">
		                        <div className="input-group mb-3">
		                            <input type="email" className="form-control" placeholder="Email" />
		                            <div className="input-group-append">
		                                <div className="input-group-text">
		                                    <FontAwesomeIcon icon={faEnvelope} className="text-success" />
		                                </div>
		                            </div>
		                        </div>
		                        <div className="input-group mb-3">
		                            <input type="password" className="form-control" placeholder="Password" />
		                            <div className="input-group-append">
		                                <div className="input-group-text">
		                                    <FontAwesomeIcon icon={faLock} className="text-success" />
		                                </div>
		                            </div>
		                        </div>
		                        <div className="row pb-2">
		                            <div className="col-8">
		                                <div className="icheck-primary">
		                                    <input type="checkbox" id="remember" />
		                                    <label for="remember">
		                                        Remember Me
		                                    </label>
		                                </div>
		                            </div>
		                            <div className="col-4">
		                                <button type="submit" className="btn btn-success btn-block">Sign In</button>
		                            </div>
		                        </div>
		                    </form>
		                    <p className="mb-1">
		                        <a href="#">I forgot my password</a>
		                    </p>
		                    <p className="mb-0">
		                        <a href="#" className="text-center">Register a new membership</a>
		                    </p>
		                </div>
		            </div>
	        	</div>
			</div>
		);
	};
	
};	

export default Login;	
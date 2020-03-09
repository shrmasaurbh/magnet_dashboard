import React, {Component} from "react";

import siteImage from "../../assets/image/HomesfyLogo.jpg";
import Loading from "../../component/common/loader/loader.js";
import {getAdminData} from "../../dataParser/auth.js";
import { Redirect } from "react-router-dom";
import "./login.css";
import {Link} from "react-router-dom";
import "../../assets/css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {getCookie, setCookie, eraseCookie} from "../../utils/cookie.js";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";

class Login extends Component {

	constructor(props) {
	    super(props);

	    let login = getCookie("login");
	    let password = getCookie("pwd");
	    let remember = getCookie("remember");

	    this.state = {
	      loggedIn: false,
	      mobile_number: login !== "" && login !== null ? login : "",
	      password: password !== "" && password !== null ? password : "",
	      rememberMe: remember === "1" ? true : false,
	      loginError: false,
	      loginErrorMessage: "",
	      showLoader: false
	    };

	    let homesfy_lg = localStorage.getItem("homesfy_lg");
	    if (homesfy_lg && homesfy_lg !== "") {
	      this.props.history.push("/");
	    }
 	}

 	
 	onChange = e => {
	    if (e.target.name === "rememberMe") {
	      this.setState({ rememberMe: !this.state.rememberMe });
	    } else {
	      this.setState({ [e.target.name]: e.target.value });
	    }
  	};


	onLogin = async e => {
	    e.preventDefault();
	    const loginRequest = (({ mobile_number, password }) => ({
	      mobile_number,
	      password,
	    }))(this.state);

	    if (loginRequest.mobile_number !== "" && loginRequest.password !== "") {
	      if (this.state.rememberMe) {
	        setCookie("login", loginRequest.mobile_number, 1);
	        setCookie("pwd", loginRequest.password, 1);
	        setCookie("remember", 1, 1);
	      }
	      loginRequest.mobile_number = parseInt(loginRequest.mobile_number)
	      this.setState({ showLoader: true });
	      var resData = await getAdminData(loginRequest);
	      console.log(resData);
	      if (resData.meta.status === 200 && resData.meta.error === 0) {
			      localStorage.setItem(
			        "homesfy_lg",
			        window.btoa(JSON.stringify(resData.data))
			      );
			      this.setState({ showLoader: false, loggedIn: true });
		    } else if (resData.meta.status === 400 || resData.meta.status === 300) {
			      this.toggleLoginError(resData.meta.message);
		    }
	    }else {
	      this.toggleLoginError();
	    }

	    // e.preventDefault();
  	};

  	toggleLoginError = message => {
	    if (message && message !== "") {
	      this.setState({
	        loginErrorMessage: message,
	        showLoader: false,
	        loginError: true
	      });
	    } else {
	      this.setState({
	        loginErrorMessage: "",
	        showLoader: false,
	        loginError: true
	      });
	    }

	    // let loginFailedInterval = setInterval(() => {
	    //   this.setState({ loginError: false });
	    //   clearInterval(loginFailedInterval);
	    // }, 5000);
  	};

	render(){
		let errorMessageElement;

		if (this.state.loggedIn) {
	      return <Redirect to="/" />;
	    }

	    if (this.state.loginError) {
	      let message =
	        this.state.loginErrorMessage !== ""
	          ? this.state.loginErrorMessage
	          : "Please enter a valid username and password.";
	      errorMessageElement = (
	        <div className="col-12 text-center mt-2">
	          <small className="text-danger font-weight-bold">{message}</small>
	        </div>
	      );
	    }

	    console.log(this.state.loginError);

		return(
			<div className="login-page">
				<div className="login-box">
		            <Loading show={this.state.showLoader} />
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
		                            <input 
		                            	type="email" 
		                            	id="mobile_number"
                      					name="mobile_number"
		                            	className="form-control"
		                            	onChange={this.onChange}
                          				value={this.state.mobile_number} 
		                            	placeholder="Email or Mobile" 
		                            	required
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
		                            	id="password"
                      					name="password"
		                            	className={"form-control"+" "+(this.state.loginError ? "is-invalid" : "")}
		                            	onChange={this.onChange}
                          				value={this.state.password}  
		                            	className="form-control" 
		                            	placeholder="Password"
		                            	required	 
	                            	/>
		                            <div className="input-group-append">
		                                <div className="input-group-text">
		                                    <FontAwesomeIcon icon={faLock} className="text-success" />
		                                </div>
		                            </div>
		                        {errorMessageElement}
		                        </div>
		                        <div className="row pb-2">
		                            <div className="col-8">
		                                <div className="icheck-primary">
		                                    <input type="checkbox" id="remember" />
		                                    <label>
		                                        Remember Me
		                                    </label>
		                                </div>
		                            </div>
		                            <div className="col-4">
		                                <button type="submit" onClick={this.onLogin} className="btn btn-success btn-block">Sign In</button>
		                            </div>
		                        </div>
		                    </form>
		                    <p className="mb-1">
		                        <Link to="/forget_password">I forgot my password</Link>
		                    </p>
		                    <p className="mb-0">
		                        <a href="#" className="text-center">Register a new member</a>
		                    </p>
		                </div>
		            </div>
	        	</div>
			</div>
		);
	};
	
};	

export default Login;	
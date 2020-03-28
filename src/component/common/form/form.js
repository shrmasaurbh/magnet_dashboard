import React, {Component} from 'react';
import Aux from "../../../utils/Aux/aux.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faUser, faTimes} from "@fortawesome/free-solid-svg-icons";
import "./form.css";

class BasicForm extends Component {
    render() {
        return (
            <Aux>
            	<div className="formContainer">
					
					<form role="form">
						<div className="card-body">
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<label>First Name</label>
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<FontAwesomeIcon icon={faUser} className="text-success" />
												</span>
											</div>
											<input type="text" id="firstName" className="form-control rounded-right" placeholder="First Name" />
											<span id="firstName-error" className="error invalid-feedback">Please enter First Name</span>
										</div>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<label>Last Name</label>
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<FontAwesomeIcon icon={faUser} className="text-success" />
												</span>
											</div>
											<input type="text" id="lastName" className="form-control rounded-right" placeholder="Last Name" />
											<span id="lastName-error" className="error invalid-feedback">Please enter Last Name</span>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
										<label>Email Address</label>
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<FontAwesomeIcon icon={faEnvelope} className="text-success" />
												</span>
											</div>
											<input type="email" id="email" className="form-control rounded-right" placeholder="Email" />
											<span id="email-error" className="error invalid-feedback">Please enter a email address</span>
										</div>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<label>Password</label>
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<FontAwesomeIcon icon={faLock} className="text-success" />
												</span>
											</div>
											<input type="password" id="pasword" className="form-control rounded-right" placeholder="Password" />
											<span id="password-error" className="error invalid-feedback">Please enter Password</span>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12 col-12">
									<div className="form-check">
										<input type="checkbox" className="form-check-input" id="exampleCheck1" />
										<label className="form-check-label">Check me out</label>
									</div>
								</div>	
							</div>
							<div className="row">
								<div className="col-sm-6 text-right col-6">
									<div className="form-group">
										<button type="submit" className="btn btn-success">Submit</button>
									</div>
								</div>
								<div className="col-sm-6 col-6">	
									<div className="form-group">
										<button type="submit" className="btn btn-danger">Cancel</button>
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

export default BasicForm;

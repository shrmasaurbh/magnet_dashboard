import React, {Component} from "react";

import BootstrapTable from "../../common/table/table.js"
import Chart from "../../common/chart/donut_chart.js"
import BasicForm from "../../common/form/form.js"
import FileUpload from "../../common/form/file_upload.js"
import "./dashboard_body.css";
import "../../assets/css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingBag, faArrowCircleRight, faBars, faBell} from "@fortawesome/free-solid-svg-icons";


class DashboardBody extends Component {

	render(){

		return( 

			<div className={"content-wrapper"+" "+(this.props.expand ? 'main-header-collapsed' : '')}>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                            	<h1 className="m-0 text-dark header_title">Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                	<div className="container-fluid">
                		<div className="row">
			        		<div className="col-lg-3 col-6">
								<div className="small-box bg-info">
									<div className="inner">
										<h3>150</h3>
										<p>New Orders</p>
									</div>
									<div className="icon">
										<FontAwesomeIcon icon={faShoppingBag} className="dash_card_icon" />
									</div>
									<a href="#" className="small-box-footer">More info 
										<FontAwesomeIcon icon={faArrowCircleRight} className="dash_card_icon ml-1" />
									</a>
								</div>
							</div>
							<div className="col-lg-3 col-6">
								<div className="small-box bg-success">
									<div className="inner">
										<h3>53<sup>%</sup></h3>
										<p>Bounce Rate</p>
									</div>
									<div className="icon">
										<i className="ion ion-stats-bars"></i>
									</div>
									<a href="#" className="small-box-footer">More info 
										<FontAwesomeIcon icon={faArrowCircleRight} className="dash_card_icon ml-1" />
									</a>
								</div>
							</div>
							<div className="col-lg-3 col-6">
								<div className="small-box bg-warning">
									<div className="inner">
										<h3>44</h3>
										<p>User Registrations</p>
									</div>
									<div className="icon">
										<i className="ion ion-person-add"></i>
									</div>
									<a href="#" className="small-box-footer">More info 
										<FontAwesomeIcon icon={faArrowCircleRight} className="dash_card_icon ml-1" />
									</a>
								</div>
							</div>
							<div className="col-lg-3 col-6">
								<div className="small-box bg-danger">
									<div className="inner">
										<h3>65</h3>
										<p>Unique Visitors</p>
									</div>
									<div className="icon">
										<i className="ion ion-pie-graph"></i>
									</div>
									<a href="#" className="small-box-footer">More info 
										<FontAwesomeIcon icon={faArrowCircleRight} className="dash_card_icon ml-1" />
									</a>
								</div>
							</div>
						</div>  
						<BootstrapTable />
						<div className="row">
							<div className="col-md-6 col-12">
								<div className="card">
									<div className="card-header">
										<h5>Donut Chart</h5>
									</div>
									<div className="card-body">
										<Chart />
									</div>
								</div>
							</div>
							<div className="col-md-6 col-md-6">
								<BasicForm />
								<FileUpload />
							</div>
						</div>
                	</div>
                </section>
            </div>                    

		);
	};
};

export default DashboardBody;
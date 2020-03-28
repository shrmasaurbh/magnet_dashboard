import React, {Component} from "react";

import BootstrapTable from "../../component/common/table/table.js"
import Chart from "../../component/common/chart/donut_chart.js"
import "./dashboard_body.css";
import "../../assets/css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingBag, faArrowCircleRight, faBars, faBell} from "@fortawesome/free-solid-svg-icons";
import {getDashboardData} from "../../dataParser/getDashboardData"; 
import CircularProgress from "@material-ui/core/CircularProgress";

class DashboardBody extends Component {

	constructor(props) {
    	super(props);
		this.state = {
			showLoader : false,
			homeData : {},
		};
	}

	async componentDidMount () {
		this.setState({showLoader : true})
        var resData = await getDashboardData();
        console.log("========================================");
        console.log(resData);
        setTimeout(()=>{
        	if(resData.meta.status === 200){
        		
       			this.setState({homeData : resData.data}) ;
		        this.setState({showLoader : false})
        		window.scrollTo(0, 0);
        	}else if(resData.meta.status === 401){
        		
        		localStorage.clear();
        		this.props.history.push("/login");
        		
        	}
        	else{
                this.setState({homeData : resData}) ;
                this.setState({showLoader : false})
                window.scrollTo(0, 0);
            }
        },500)
    }

	render(){

		const {homeData, showLoader} = this.state;
		console.log(typeof homeData);

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
									{showLoader ? 
										(<CircularProgress color="primary" size={30} />
										): null
									}
									<div className="inner">
										<h3>{homeData.total_leads}</h3>
										<p>Total leads</p>
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
									{showLoader ? 
										(<CircularProgress color="secondary" size={30} />
										): null
									}
									<div className="inner">
										{/*<h3>53<sup>%</sup></h3>*/}
										<h3>{homeData.not_update}</h3>
										<p>New Lead</p>
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
									{showLoader ? 
										(<CircularProgress color="warning" size={30} />
										): null
									}
									<div className="inner">
										<h3>{homeData.booked}</h3>
										<p>Booked Lead</p>
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
									{showLoader ? 
										(<CircularProgress color="danger" size={30} />
										): null
									}
									<div className="inner">
										<h3>{homeData.closed}</h3>
										<p>Closed Lead</p>
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
                	</div>
                	<div className="container-fluid">
						<BootstrapTable />
						<div className="row">
							<div className="col-md-12 col-12">
								<div className="card">
									<div className="card-header">
										<h5>Donut Chart</h5>
									</div>
									<div className="card-body">
										<Chart />
									</div>
								</div>
							</div>
						</div>
					</div>	
                </section>
            </div>                    

		);
	};
};

export default DashboardBody;
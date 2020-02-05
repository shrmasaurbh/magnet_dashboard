import React, {Component} from "react";

import Header from "../../component/header/header.js";
import SideBar from "../../component/side-header/side_header.js";
import Footer from "../../component/footer/footer.js";
import DashboardBody from "../../component/dashboard-body/dashboard_body.js";

class Dashboard extends Component {

	constructor(props){
		super(props);
		this.state = {
      		sideBar: false,
      		mobileSideBar: false
    	};
	}

	changeButtonState(event) {
	    this.setState({sideBar: !this.state.sideBar})
	}

	changeSideBarState(event) {
	    this.setState({mobileSideBar: !this.state.mobileSideBar})
	}

	render(){
		console.log("sidebarrrrrr");
		console.log(this.state.mobileSideBar);

		return( 

				<div>
					<SideBar sideBar ={this.state.sideBar} mobileBar = {this.state.mobileSideBar} mobileBarClick={this.changeSideBarState.bind(this)}/>
					<Header buttonClick={this.changeButtonState.bind(this)} expand ={this.state.sideBar} mobileBarClick={this.changeSideBarState.bind(this)}/>
					<DashboardBody expand ={this.state.sideBar} />
					<Footer expand ={this.state.sideBar} />
				</div>	
		);
	};
};	

export default Dashboard;	
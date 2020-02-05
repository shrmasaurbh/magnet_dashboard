import React, {Component} from "react";

import Header from "../../component/header/header.js";
import SideBar from "../../component/side-header/side_header.js";
import Footer from "../../component/footer/footer.js";
import List from "../../component/magnetList/magnetList.js"

class list extends Component {

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
		return(
			<div>
				<Header buttonClick={this.changeButtonState.bind(this)} expand ={this.state.sideBar}/>
				<SideBar sideBar ={this.state.sideBar} mobileBar = {this.state.mobileSideBar} mobileBarClick={this.changeSideBarState.bind(this)}/>
				<List expand ={this.state.sideBar}/>
				<Footer expand ={this.state.sideBar}/>
			</div>

		);
	};
};

export default list;
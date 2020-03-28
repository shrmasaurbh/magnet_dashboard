import React, {Component} from "react";
import {getAllProjectData} from "../../dataParser/getProjectData";
import Header from "../../component/header/header";
import SideBar from "../../component/side-header/side_header";
import Footer from "../../component/footer/footer";
import ProjectDetail from "../../component/projetDetail/projetDetail";
import Loader from "../../component/common/loader/loader";
import Aux from "../../utils/Aux/aux";

class projectList extends Component {

	constructor(props) {
    	super(props);
		this.state = {
		    projectDetail : '',
        	showLoader : false,
        	sideBar: false,
      		mobileSideBar: false,
		};
	}

	async componentDidMount () {
		this.setState({showLoader : true});
		var projectData = {};
        projectData.size = 8;
        projectData.pageId = 1;
        projectData.filters = [];

        var resData = {};
        resData = await getAllProjectData(projectData);
        console.log("========================================");
        console.log(resData);
        setTimeout(()=>{
        	
        	if(resData.meta.count >= 0 && resData.meta.status == 200){
        		
		        this.setState({
		        	projectDetail : resData,
		        	showLoader : false,
		        }) ;
        		window.scrollTo(0, 0);
		        this.setState({})

        	}else if(resData.meta.status == 401){
        		localStorage.clear();
        		this.props.history.push("/login");
        	}else{
        		this.setState({
		        	projectDetail: resData,
		        	showLoader : false
		        })
        	}
        },500)
		
	}

	changeButtonState(event) {
	    this.setState({sideBar: !this.state.sideBar})
	}

	changeSideBarState(event) {
	    this.setState({mobileSideBar: !this.state.mobileSideBar})
	}


	render(){

		return(
			<Aux>
				<Loader show={this.state.showLoader}/>
				<SideBar sideBar ={this.state.sideBar} mobileBar = {this.state.mobileSideBar} mobileBarClick={this.changeSideBarState.bind(this)} leadInfo = {this.state.leadInfo} />
				<Header buttonClick={this.changeButtonState.bind(this)} expand ={this.state.sideBar} mobileBarClick={this.changeSideBarState.bind(this)}/>
				{this.state.projectDetail.meta &&
					<ProjectDetail expand ={this.state.sideBar} projectDataValue = {this.state.projectDetail}/>
				}
				<Footer expand ={this.state.sideBar} />
			</Aux>
		);

	};
};

export default projectList;

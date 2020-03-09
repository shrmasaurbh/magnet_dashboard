import React, {Component} from "react";

import Header from "../../component/header/header";
import SideBar from "../../component/side-header/side_header";
import Footer from "../../component/footer/footer";
import List from "../../component/magnetList/magnetList";
import {getListData} from "../../dataParser/getListData";
import Loader from "../../component/common/loader/loader";


class list extends Component {

	constructor(props){
		super(props);
		this.state = {
      		sideBar: false,
      		mobileSideBar: false,
      		listDetail : {},
      		leadInfo : ''
    	};
	}

	async componentDidMount () {
        console.log("wwwwwwwwwwwwwwwwwwwwwwwwwww");
        var leadDataType = {};
		let leadName = this.props.match.params.leadType;
        console.log("44444444444444444444444", leadName);
		this.setState({
			showLoader : true,
			leadInfo : leadName
		})
        // let leadType  = queryString.parse(this.props.location.search);
        // leadType = leadType.q;
        // this.setState({listTitle : leadType});

        var listData = {};
        listData.size = 4;
        listData.pageId = 1;
        listData.filters = [];

        leadDataType.name = leadName;
        leadDataType.data = listData;

        var resData = {};
        resData = await getListData(leadDataType);
        console.log("========================================");
        console.log(resData);
        setTimeout(()=>{
        	
        	if(resData.meta.count >= 0 && resData.meta.status == 200){
        		
		        this.setState({
		        	listDetail : resData,
		        	showLoader : false,
		        }) ;
        		window.scrollTo(0, 0);
		        this.setState({})

        	}else if(resData.meta.status == 401){
        		localStorage.clear();
        		this.props.history.push("/login");
        	}
        },500)
    }

    async componentDidUpdate(prevProps) {
    	console.log("prevProps", prevProps.location.pathname);
    	console.log("prevProps", this.props.location.pathname);
		if (this.props.location.pathname !== prevProps.location.pathname) {
			
			console.log("wwwwwwwwwwwwwwwwwwwwwwwwwww");
	        var leadDataType = {};
			
			let leadName = this.props.match.params.leadType;
	        console.log("44444444444444444444444", leadName);

	        this.setState({
				showLoader : true,
				leadInfo : leadName
			})
	        // let leadType  = queryString.parse(this.props.location.search);
	        // leadType = leadType.q;
	        // this.setState({listTitle : leadType});

	        var listData = {};
	        listData.size = 4;
	        listData.pageId = 1;
	        listData.filters = [];

	        leadDataType.name = leadName;
	        leadDataType.data = listData;

	        var resData = {};
	        resData = await getListData(leadDataType);
	        console.log("========================================");
	        console.log(resData);
	        setTimeout(()=>{
	        	
	        	if(resData.meta.count >= 0 && resData.meta.status == 200){
	        		
			        this.setState({listDetail : resData}) ;
	        		window.scrollTo(0, 0);
			        this.setState({showLoader : false})

	        	}else if(resData.meta.status == 401){
	        		localStorage.clear();
	        		this.props.history.push("/login");
	        	}
	        },500)
		}
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
					<Loader show={this.state.showLoader}/>
					<SideBar sideBar ={this.state.sideBar} mobileBar = {this.state.mobileSideBar} mobileBarClick={this.changeSideBarState.bind(this)} leadInfo = {this.state.leadInfo} />
					<Header buttonClick={this.changeButtonState.bind(this)} expand ={this.state.sideBar} mobileBarClick={this.changeSideBarState.bind(this)}/>
					{this.state.listDetail.meta &&
						<List expand ={this.state.sideBar} listValue = {this.state.listDetail} leadInfo = {this.state.leadInfo}/>
					}
					<Footer expand ={this.state.sideBar} />
				</div>	
		);
	};
};

export default list;
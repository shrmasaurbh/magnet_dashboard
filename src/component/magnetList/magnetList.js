import React, {Component} from "react";

import "./magnetList.css";
import Aux from "../../utils/Aux/aux.js";
import {getListData, getFullLeadData} from "../../dataParser/getListData";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faFilter,faInfo,faUserSecret, faCalendarAlt, faMapMarkerAlt, faAd, faUser, faBuilding, faCommentAlt, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {faUsertie} from "@fortawesome/free-regular-svg-icons";
import DetailLead from "../detailLead/detailLead";
import Loader from "../../component/common/loader/loader";
import SpeedDialLead from "../../component/common/material/leadSpeedDail";
import LeadUpdateModel from "../../component/common/modal/leadUpdateMOdal";
import Filter from "../filter/filter";

class magnetList extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
      		listDetail: false,
      		formType: '',
      		meta : props.listValue.meta,
      		data : props.listValue.data,
      		activePage : 1,
      		filters : [],
      		modalShow : false,
      		modalLeadShow : false,
      		fullDetail : '',
      		showLoader : false,
      		showFilter : false,
    	};
  	}

  	
  	componentDidUpdate(nextProps) {
	 console.log('componentWillReceiveProps xxxxxxxxxx', nextProps);
	 	if (this.props !== nextProps) {
	  	// this.setState({nextProps});
	  	this.setState({
	  		meta:nextProps.listValue.meta,
	  		data:nextProps.listValue.data,
	  		activePage : 1,
	  		listDetail: false,
	 	 });
		// console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx',nextProps);
		}
	}

  	detailView (id){

  		if(this.state.listDetail == id){
  			this.setState({listDetail : null})

  		}else{
  			this.setState({listDetail : id})
  		}

  	}

  	genericGetListData = async (...params) =>{
        var leadDataType = {};
        this.setState({showLoader : true});
        let leadName = this.props.leadInfo;
		console.log("genericGetListData......",params)

        // console.log("this.state.filters",this.state.filters);
    	var listData = {};
        listData.size = 4;
        listData.pageId = params[0].pageNumber || params[0].pageId || 1;
        listData.filters = params[0].filters || [];

        leadDataType.name = leadName;
        leadDataType.data = listData;

        var resData = {};
        resData = await getListData(leadDataType);
        // console.log("========================================");
        // console.log(resData);
        setTimeout(()=>{
        	if(resData.meta.status == 200){
        		
		        this.setState({
		        	meta: resData.meta,
		        	data : resData.data,
		        	showLoader : false
		        })
        		window.scrollTo(0, 0);
        	}else if(resData.meta.status == 401){
        		localStorage.clear();
        		this.props.history.push("/login");
        	}else{
        		this.setState({
		        	meta: resData.meta,
		        	data : resData.data,
		        	showLoader : false
		        })
        	}
        },500)
	}

  	handleChangePage= async (pageNumber)=>{
		// console.log(`active page is ${pageNumber}`);
		// console.log("this.state.filters pagination", this.state.filters);
        this.setState({
        	showLoader : true,
        	activePage: pageNumber
        })
    	var listData = {};
    	listData.filters = [];
        listData.size = 4;
        listData.pageId = pageNumber;
        listData.filters = [this.state.filters] || [];
        
        this.genericGetListData(listData);
	}

	fullLeadDetail = async (id)=>{
        this.setState({showLoader : true});
        console.log("leadIdXXXXXXXXXX",id);

        var resData = {};
        resData = await getFullLeadData(id);

        setTimeout(()=>{
        	if(resData.meta.status === 200){
        		
		        this.setState({
		        	fullDetail: resData,
		        	showLoader : false
		        })
        		window.scrollTo(0, 0);
        	}else if(resData.meta.status === 401){
        		localStorage.clear();
        		this.props.history.push("/login");
        	}else{
        		this.setState({
		        	fullDetail: resData,
		        	showLoader : false
		        })
        	}
        },500)
	}

	handleModal=(value)=>{
        this.setState({modalShow : !this.state.modalShow});
    }

    handleLeadModal=(value)=>{
        console.log("value=================>",value);
        this.setState({modalLeadShow : !this.state.modalLeadShow});
        this.setState({formType : value});
    }

    handlePopUp =()=> {
        this.setState(prevState => ({
           showFilter: !prevState.showFilter,
        }));
    }

    handleFilter = async (filterData) => {
        this.setState({showLoader : true})
        this.setState({filters : filterData})
		// console.log("===========FilterVal==========");
		// console.log(filterData);
        // let filters = [];
        // const procName = this.props.inputValue
    	let listData = {};
    	listData.filters = [];
        listData.query = this.props.inputValue;
        listData.size = 8;
        listData.pageId = 1;
        listData.filters = [filterData];

    	// console.log("listData.filters",listData.filters);
        this.genericGetListData(listData);

    }

	render(){

		console.log("in the magnet list");
		const {count, size, status, pageId} = this.state.meta;
		console.log("in the magnet list",this.state.meta.status);
		let leadFullData = this.state.fullDetail;

		return(

			<Aux>
				<div className={"content-wrapper"+" "+(this.props.expand ? 'main-header-collapsed' : '')}>
				<Loader show={this.state.showLoader}/>
				{status === 200 ?
					<div className="listContainer">
						<SpeedDialLead />
						<div className="p-2 pt-3 pb-3 leadMainHeader">
							<span className="totalCount">Total Leads : </span>
							<span>{count}</span>
							<div className="d-inline ml-3 filterHeader">
		                            <span className="filter" onClick ={this.handlePopUp}>
		                            	<FontAwesomeIcon icon={faFilter} className="nav-icon" />
		                            </span>
		                            <div className={"filterMenu" + " "+ (this.state.showFilter ? 'filterMenuShow' : '')} ref={node => { this.node = node; }}>
		                                <Filter filterData = {this.handleFilter}/>
		                            </div>
							</div>
						</div>
							{this.state.data.map((listVal,index) => 
								<div className="MainList mt-2" key={listVal.lead_id}>
							        <div className="container-fluid">
							            <div className="ListContent card mb-2" onClick={() => this.detailView(index)}>
							                <div className="row mb-1">
							                    <div className="col-md-3 col-sm-12 col-12  mb-2">
							                        <div className="row">
							                            <div className="col-md-12 col-sm-6 col-4">
							                                <h6><b>ID:</b> {listVal.lead_id}</h6>
							                            </div>
							                            <div className="col-md-12 col-sm-6 col-8">
							                                <h6 className="textRight"><b>Date:</b> {listVal.createdAt}</h6>
							                            </div>
							                        </div>
							                    </div>
							                    <div className="col-md-9 col-sm-12 col-12">
							                        <div className="row">
							                            <div className="col-md-3 col-sm-12 col-12 mb-1">
							                                <h3 className="textEllipsis text-capitalize">
							                                	<FontAwesomeIcon icon={faUser} className="text-info mr-2"/>
						                                		{listVal.client_id  ? 
								                                	<b>{listVal.client_details.client_name}</b>
								                                	:
								                                	<b>-</b>
						                                		}	
						                                	</h3>
							                            </div>
							                            <div className="col-md-4 col-sm-12 col-12 mb-2">
							                                <h3>
							                                	<FontAwesomeIcon icon={faBuilding} className="text-info mr-2"/>
							                                	{listVal.project_details  ? 
								                                	<b>{listVal.project_details.project_name}</b>
								                                	:
								                                	<b>-</b>
						                                		}
						                                	</h3>
							                            </div>
							                            <div className="col-md-3 col-sm-12 col-12 mb-2">
							                                <h3 className="text-capitalize">
							                                	<FontAwesomeIcon icon={faUserSecret} className="text-info mr-2"/>
							                                	{listVal.team_id  ? 
								                                	<span className="text-capitalize">{listVal.team.name}</span>
								                                	:
								                                	<span>-</span>
				                                				}	
						                                	</h3>
							                            </div>
							                            <div className="col-md-2 col-sm-12 col-12 mb-2">
							                                <h3 className="text-capitalize">
							                                	<FontAwesomeIcon icon={faBuilding} className="text-info mr-2"/>
							                                	{listVal.lead_id  ? 
								                                	<b>{listVal.lead_status.status}</b>
								                                	:
								                                	<b>-</b>
						                                		}	
						                                	</h3>
							                            </div>
							                        </div>
							                    </div>
							                </div>
							                <a className="Action" data-toggle="tooltip" data-placement="bottom" title="View detail" onClick={(value)=>this.handleLeadModal(listVal.lead_status.status)}>
							                	<FontAwesomeIcon icon={faEdit} className="text-white"/>
						                	</a>
        									
								            <a className="callBG Action d-none d-md-block" data-toggle="tooltip" data-placement="bottom" title="Call">
								            	<FontAwesomeIcon icon={faPhoneAlt} className="text-white"/>
							            	</a>
								            <a className="WhatsAppBG Action d-none d-md-block" data-toggle="tooltip" data-placement="bottom" title="Whatsapp">
								            	<FontAwesomeIcon icon={faWhatsapp} className="text-white"/>
							            	</a>
								            <div className={"ShortContent"+" "+ (this.state.listDetail === index ? "show" : "hide")}>
								                <div className="row">
								                    <div className="col-md-12 col-sm-12 col-12">
								                        <div className="row">
								                            {/*<div className="col-md-2 col-sm-4 mb-2">
    								                                <FontAwesomeIcon icon={faCalendarAlt} className="text-info"/> <span> Thu,Feb 27,2020 6:44 PM</span>
    								                            </div>*/}
								                            <div className="col-md-2 col-sm-4 col-12  mb-2">
										                        <div className="row">
										                            <div className="col-md-12 col-sm-12 col-12 fold-lead">
										                                <span><b>Follow up Date</b></span>
										                            </div>
										                            <div className="col-md-12 col-sm-6 col-12 fold-lead">
										                                <span>Thu,Feb 27,2020 6:44 PM</span>
										                            </div>
										                        </div>
										                    </div>
										                    <div className="col-md-2 col-sm-4 col-12  mb-2">
										                        <div className="row">
										                            <div className="col-md-12 col-sm-12 col-12 fold-lead">
										                                <span><b>Assign Date</b></span>
										                            </div>
										                            <div className="col-md-12 col-sm-6 col-12 fold-lead">
										                                <span>Thu,Feb 27,2020 6:44 PM</span>
										                            </div>
										                        </div>
										                    </div>
										                    <div className="col-md-2 col-sm-4 col-12  mb-2">
										                        <div className="row">
										                            <div className="col-md-12 col-sm-12 col-12 fold-lead">
										                                <span><b>Visit Date</b></span>
										                            </div>
										                            <div className="col-md-12 col-sm-6 col-12 fold-lead">
										                                <span>Thu,Feb 27,2020 6:44 PM</span>
										                            </div>
										                        </div>
										                    </div>
										                    <div className="col-md-2 col-sm-4 col-12  mb-2">
										                        <div className="row">
										                            <div className="col-md-12 col-sm-12 col-12 fold-lead">
										                                <span><b>Added By</b></span>
										                            </div>
										                            <div className="col-md-12 col-sm-6 col-12 fold-lead">
										                                {listVal.lead_added_by  ? 
										                                	<span className="text-capitalize">{listVal.lead_addedby.name}</span>
										                                	:
										                                	<span>-</span>
						                                				}	
										                            </div>
										                        </div>
										                    </div>
										                    <div className="col-md-2 col-sm-4 col-12  mb-2">
										                        <div className="row">
										                            <div className="col-md-12 col-sm-12 col-12 fold-lead">
										                                <span><b>Is Magnet</b></span>
										                            </div>
										                            <div className="col-md-12 col-sm-6 col-12 fold-lead">
										                                <span>{listVal.is_magnet === 'true' ? 'Yes' : 'No'}</span>
										                            </div>
										                        </div>
										                    </div>
								                            
								                            <div className="col-md-2 col-sm-4">
								                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-info"/> <span>KDMC</span>
								                            </div>
								                        </div>
								                    </div>
								                    <div className="col-md-8 col-sm-12 col-12 mb-2">
								                        <FontAwesomeIcon icon={faCommentAlt} className="text-info"/> <span> {listVal.admin_message}</span>
								                    </div>
								                </div>
								            	<a className="leadDetail Action" 
								            		data-toggle="tooltip" data-placement="bottom" title="View full lead"
								            		onClick={()=>{this.handleModal(); this.fullLeadDetail(listVal.lead_id)}} data={listVal.lead_id} 
							            		>
								            		<FontAwesomeIcon icon={faInfo} className="text-white"/>
							            		</a>
							            		{ leadFullData.meta && 
									                <DetailLead show={this.state.modalShow} changeModal={this.handleModal} leadDetailProp = {leadFullData}/>
							            		}
								                <div className="ActionSection">
								                    <div className="row">
								                        <div className="col-sm-6 col-6">
								                            <a href="" className="WhatsAppBG">
								                            	<FontAwesomeIcon icon={faWhatsapp} className="text-white"/>
								                            </a>
								                        </div>
								                        <div className="col-sm-6 col-6">
								                            <a href="" className="ActionBg">
								                            	<FontAwesomeIcon icon={faPhoneAlt} className="text-white"/>
							                            	</a>
								                        </div>
								                    </div>
								                </div>
								            </div>
							            </div>
							        </div>
							    </div>
							  )}  
					    <div className="container-fluid">
					    	{this.state.meta['count'] > 4 ? 
								<div className="row justify-content-end">
									<div className="paginationBlock">
										<Pagination
											hideDisabled	
									        activePage={this.state.activePage}
									        itemsCountPerPage={size}
									        totalItemsCount={count}
									        pageRangeDisplayed={5}
									        onChange={this.handleChangePage}
								        />
									</div>
								</div>
								:
								''
							}
					    </div>
					    
					</div>    


			    :
			    <div className="main_area_display shadow card p-3">
					<h5>No Leads Found !!!</h5>
				</div>
			}
		    </div>
				<LeadUpdateModel show={this.state.modalLeadShow} fromType={this.state.formType} changeModal={this.handleLeadModal}/>
			</Aux>
		);
	};
};

export default magnetList;
import React, {Component} from "react";

import "./magnetList.css";
import Aux from "../../utils/Aux/aux.js";
import {getListData, getFullLeadData} from "../../dataParser/getListData";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faInfo,faUserSecret, faCalendarAlt, faChevronDown, faMapMarkerAlt, faAd, faUser, faBuilding, faCommentAlt, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {faUsertie} from "@fortawesome/free-regular-svg-icons";
import DetailLead from "../detailLead/detailLead";
import Loader from "../../component/common/loader/loader";

class magnetList extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
      		listDetail: false,
      		meta : props.listValue.meta,
      		data : props.listValue.data,
      		activePage : 1,
      		filters : [],
      		modalShow : false,
      		fullDetail : '',
      		showLoader : false
    	};
  	}

  	
  	componentDidUpdate(nextProps) {
	 console.log('componentWillReceiveProps', nextProps);
	 	if (this.props !== nextProps) {
	  	// this.setState({nextProps});
	  	this.setState({
	  		meta:nextProps.listValue.meta,
	  		data:nextProps.listValue.data,
	  		activePage : 1,
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

	fullLeadDetail = async ()=>{
        this.setState({showLoader : true});
        let leadId = this.anchor.getAttribute('data');
        console.log(leadId);

        var resData = {};
        resData = await getFullLeadData(leadId);

        setTimeout(()=>{
        	if(resData.meta.status === 200){
        		
		        this.setState({
		        	fullDetail: resData,
		        	showLoader : false
		        })
        		window.scrollTo(0, 0);
        	}else if(resData.meta.status == 401){
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


	render(){

		console.log("in the magnet list");
		const {count, size, status, pageId} = this.state.meta;
		console.log(this.state.data);
		let leadFullData = this.state.fullDetail;

		return(

			<Aux>
				<div className={"content-wrapper"+" "+(this.props.expand ? 'main-header-collapsed' : '')}>
				<Loader show={this.state.showLoader}/>
				{status === 200 ?
					<div className="listContainer">
						<div className="p-3">
							<span className="totalCount">Total Leads : </span>
							<span>{count}</span>
						</div>
							{this.state.data.map((listVal,index) => 
								<div className="MainList" key={listVal.lead_id}>
							        <div className="container-fluid">
							            <div className="ListContent card mb-2">
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
							                                <h3><FontAwesomeIcon icon={faBuilding} className="text-info mr-2"/>{listVal.project_name}</h3>
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
							                <a className="Action" data-toggle="tooltip" data-placement="bottom" title="View detail" onClick={() => this.detailView(index)}>
							                	<FontAwesomeIcon icon={this.state.listDetail === index ? faChevronDown : faChevronLeft} className="text-white"/>
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
								            	<a className="leadDetail Action d-none d-md-block" 
								            		data-toggle="tooltip" data-placement="bottom" title="View full lead"
								            		onClick={()=>{this.handleModal(); this.fullLeadDetail()}} data={listVal.lead_id} 
								            		ref={(ref) => this.anchor = ref}
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
			</Aux>
		);
	};
};

export default magnetList;
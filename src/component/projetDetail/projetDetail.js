import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Tooltip} from 'react-bootstrap';
import {getAllProjectData, getProjectDetail} from "../../dataParser/getProjectData";
import Loader from "../../component/common/loader/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserSecret, faMapMarkerAlt, faUser, faBuilding, faCheck, faTimes, faPlusSquare, faInfo,faEdit} from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";
import "./projectDetail.css";
import SpeedDialProject from "../../component/common/material/speedDial";
import ProjectModel from "../../component/common/modal/projectModel";
import DetailProjectModal from "../../component/detailLead/projectDetailModal";

class projectDetail extends Component {

	constructor(props) {
    	super(props);
		this.state = {
	  		activePage : 1,
        	showLoader : false,
        	meta : props.projectDataValue.meta,
      		data : props.projectDataValue.data,
      		modalShow : false,
      		fullDetail : ''
		};
	}

	componentDidUpdate(nextProps) {
	 console.log('componentWillReceiveProps xxxxxxxxxx', nextProps);
	 	if (this.props !== nextProps) {
	  	// this.setState({nextProps});
	  	this.setState({
	  		meta:nextProps.projectDataValue.meta,
	  		data:nextProps.projectDataValue.data,
	  		activePage : 1,
	 	 });
		// console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx',nextProps);
		}
	}


	genericGetListData = async (...params) =>{
        this.setState({showLoader : true});
		console.log("genericGetListData......",params)

        // console.log("this.state.filters",this.state.filters);
    	var listData = {};
        listData.size = 8;
        listData.pageId = params[0].pageNumber || params[0].pageId || 1;
        listData.filters = params[0].filters || [];

        var resData = {};
        resData = await getAllProjectData(listData);
        console.log("xxxxxxx resData xxxxxxx", resData);
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
        listData.size = 8;
        listData.pageId = pageNumber;
        listData.filters = [this.state.filters] || [];
        
        this.genericGetListData(listData);
	}

	fullProjectDetail = async (id)=>{
        this.setState({showLoader : true});
        // let leadId = this.anchor.getAttribute('data');
        console.log("leadId XXXXXXXXXXXXXXXXXXX",id);

        var resData = {};
        resData = await getProjectDetail(id);

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

    updateHandleModal=(value)=>{
      this.setState({updateModalShow : !this.state.updateModalShow});
	}

	render(){

		const {count, size, status, pageId} = this.state.meta;
		const {fullDetail,data} = this.state;

		return(
			<div className={"content-wrapper"+" "+(this.props.expand ? 'main-header-collapsed' : '')}>
				<SpeedDialProject/>
				<Loader show={this.state.showLoader}/>
				{status === 200 ?
					<div className="listContainer">
						<div className="container-fuild">
							<div className="p-3">
								<div className="col-md-8 col-sm-8 col-12">
									<span className="totalCount">Total Projects : </span>
									<span>{count}</span>
								</div>
							</div>
						</div>
							{this.state.data.map((projectsList,index) => 
								<div className="MainList" key={projectsList.project_id}>
							        <div className="container-fluid">
							            <div className="ListContent card mb-2">
							                <div className="row mb-1">
							                    <div className="col-md-3 col-sm-12 col-12  mb-2">
							                        <div className="row">
							                            <div className="col-md-12 col-sm-6 col-4">
							                                <h6><b>ID:</b> {projectsList.project_id}</h6>
							                            </div>
							                            <div className="col-md-12 col-sm-6 col-8">
							                                <h6 className="textRight"><b>Date:</b> {projectsList.added_date}</h6>
							                            </div>
							                        </div>
							                    </div>
							                    <div className="col-md-9 col-sm-12 col-12">
							                        <div className="row">
							                            <div className="col-md-3 col-sm-12 col-12 mb-1">
							                                <h3 className="textEllipsis text-capitalize">
							                                	<FontAwesomeIcon icon={faUser} className="text-info mr-2"/>
						                                		{projectsList.builder_name ? 
								                                	<b>{projectsList.builder_name}</b>
								                                	:
								                                	<b>-</b>
						                                		}	
						                                	</h3>
							                            </div>
							                            <div className="col-md-4 col-sm-12 col-12 mb-2">
							                                <h3>
							                                	<FontAwesomeIcon icon={faBuilding} className="text-info mr-2"/>
							                                	{projectsList.project_name  ? 
								                                	<b>{projectsList.project_name}</b>
								                                	:
								                                	<b>-</b>
						                                		}
						                                	</h3>
							                            </div>
							                            <div className="col-md-3 col-sm-12 col-12 mb-2">
							                                <h3 className="text-capitalize">
							                                	<FontAwesomeIcon icon={faBuilding} className="text-info mr-2"/>
							                                	{projectsList.project_id_99  ? 
								                                	<span className="text-capitalize">{projectsList.project_id_99}</span>
								                                	:
								                                	<span>-</span>
				                                				}	
						                                	</h3>
							                            </div>
							                            <div className="col-md-2 col-sm-12 col-12 mb-2">
							                                <h3 className="text-capitalize">
							                                	<FontAwesomeIcon icon={faMapMarkerAlt} className="text-info mr-2"/>
							                                	{projectsList.region  ? 
								                                	<b>{projectsList.region.region_name}</b>
								                                	:
								                                	<b>-</b>
						                                		}	
						                                	</h3>
							                            </div>
							                        </div>
							                    </div>
						                        <div className="col-md-12 col-sm-12 col-12">
							                        <div className="row">
							                            <div className="col-md-3 col-sm-12 col-12 mb-1">
							                                <h3 className="textEllipsis text-capitalize">
							                                	<FontAwesomeIcon icon={faUserSecret} className="text-info mr-2"/>
						                                		{projectsList.project_addedby ? 
								                                	<b>{projectsList.project_addedby}</b>
								                                	:
								                                	<b>-</b>
						                                		}	
						                                	</h3>
							                            </div>
							                            <div className="col-md-3 col-sm-12 col-12 mb-1">
							                                <h3 className="textEllipsis text-capitalize">
						                                		{projectsList.project_name  ? 
								                                	<b>Project status : <FontAwesomeIcon icon={(projectsList.project_status) === true ? faCheck : faTimes} className="text-info mr-2"/></b>
								                                	:
								                                	<b>Project status : -</b>
						                                		}	
						                                	</h3>
							                            </div>
						                            </div>
					                            </div>
							                </div>
								            <a className="ProjectDetail Action" 
							            		data-toggle="tooltip" data-placement="bottom" title="View full Project"
							            		onClick={()=>{this.handleModal(); this.fullProjectDetail(projectsList.project_id)}} 
							            		data={projectsList.project_id} 
						            		>
							            		<FontAwesomeIcon icon={faInfo} className="text-white"/>
						            		</a>
						            		<a className="ProjectUpdate Action" 
							            		data-toggle="tooltip" data-placement="bottom" title="Edit Project"
							            		onClick={()=>{this.updateHandleModal(); this.fullProjectDetail(projectsList.project_id)}} 
							            		data={projectsList.project_id} 
						            		>
							            		<FontAwesomeIcon icon={faEdit} className="text-white"/>
						            		</a>
        									{status === 200 &&
	        									<ProjectModel show={this.state.updateModalShow} formData={fullDetail} fromType="updateProject" changeModal={this.updateHandleModal}/>
        									}

						            		{fullDetail.meta &&
						            			<DetailProjectModal show={this.state.modalShow} changeModal={this.handleModal} leadDetailProp ={fullDetail}/>
							            	}
							            </div>
							        </div>
							    </div>
							)}

							<div className="container-fluid">
						    	{this.state.meta['count'] > 8 ? 
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
		);

	};
};

export default withRouter(projectDetail);

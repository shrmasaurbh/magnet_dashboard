import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import Aux from "../../utils/Aux/aux.js";
import "./detailLead.css";
import {getCommentData} from "../../dataParser/getListData";
import PerfectScrollbar from 'react-perfect-scrollbar';

class DetailProjectModal extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
      		showLoader : false,
    	};
  	}

    render() {

    	let projectDetail = this.props.leadDetailProp;
    	let projectDetailMeta = projectDetail.meta;
    	let projectDetailData = projectDetail.data;

    	// console.log("wwwwwwwwwwwwwwwwwwwwwww",projectDetailMeta.status);
        return (
            <Aux>
 				<Modal
 				  show={this.props.show} 
 				  onHide={this.props.changeModal}	
			      size="lg"
			      aria-labelledby="contained-modal-title-vcenter"
			      centered
			    >
			      <Modal.Header closeButton>
			        <Modal.Title id="contained-modal-title-vcenter">
			          Project detail
			        </Modal.Title>
			      </Modal.Header>
			      <Modal.Body>
			      	{projectDetailMeta.status == 200 ? 
			      	<div className="detailProject">
			      		<div className="row">
			      			<div className="col-md-4 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>ProjectID : </b></span>
		                                {projectDetailData.project_id !=null  ? 
		                                	<span className="font-small">{projectDetailData.project_id}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }	
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-4 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Project Name : </b></span>
		                                {projectDetailData.project_name !=null ? 
		                                	<span className="font-small text-capitalize">{projectDetailData.project_name}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }	
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-4 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Project Addedby : </b></span>
		                                {projectDetailData.project_addedby !=null ? 
		                                	<span className="font-small">{projectDetailData.project_addedby}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }	
		                            </div>
		                        </div>
		                    </div>
			      		</div>

			      		<div className="row">
			      			<div className="col-md-4 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Added Date : </b></span>
		                                {projectDetailData.added_date !=null ? 
		                                	<span className="font-small">{projectDetailData.added_date}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }	
		                            </div>
		                        </div>
		                    </div>
			      			<div className="col-md-4 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Builder Name : </b></span>
		                                {projectDetailData.builder_name !=null ? 
		                                	<span className="font-small">{projectDetailData.builder_name}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }	
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-4 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Location : </b></span>
		                                {projectDetailData.location !=null ? 
		                                	<span className="font-small">{projectDetailData.location}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
			      		</div>

			      		<div className="row">
			      			<div className="col-md-4 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>project 99 ID : </b></span>
		                                {projectDetailData.project_id_99 !=null ? 
		                                	<span className="font-small">{projectDetailData.project_id_99}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-4 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Region : </b></span>
		                                {projectDetailData.region !=null ? 
		                                	<span className="font-small">{projectDetailData.region.region_name}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-4 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Status : </b></span>
		                                {projectDetailData.project_status !=null ? 
		                                	<span className="font-small">{projectDetailData.project_status === true ? 'Yes' : 'No'}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
			      		</div>

			      	</div>  	
			      	:
			      		<div className="row">
			      			<div className="col-md-12">
			      				<span className="mr-2">Couldn't get detail, Please try again !!!</span>
		      				</div>
			      		</div>
			      	}	
			      </Modal.Body>
			      
			    </Modal>
            </Aux>
        );
    };
};    

export default DetailProjectModal;
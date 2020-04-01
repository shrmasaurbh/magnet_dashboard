import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import Aux from "../../utils/Aux/aux.js";
import {withRouter} from "react-router-dom";
import "./detailLead.css";
import {getCommentData} from "../../dataParser/getListData";
import PerfectScrollbar from 'react-perfect-scrollbar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

class DetailLead extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
      		showLoader : false,
      		commentState : '',
      		commentStuts : false,
      		pageId : ''
    	};
  	}

  	componentDidMount() {    
	    document.body.style.overflow = 'hidden';
	}

	componentWillUnmount() {
	    document.body.style.overflow = 'unset';
	}

	commentsData = async (id)=>{

      	this.setState({showLoader : true});
		let commentRes = {};
		let commentReq = {};
		let leadId = id;
		console.log("YYYYYYYYYYYYYYY=====>",leadId);

        let listData = {};
        listData.size = 4;
        listData.pageId = 0;
        listData.filters = [];

        commentReq.id = leadId;
        commentReq.data = listData;

		commentRes = await getCommentData(commentReq);

		console.log("XXXXXXXXXXXXXXXXXXXX=====>",commentRes);
		if(commentRes.meta.status === 200){

			this.setState({
	        	commentState :commentRes,
	        	showLoader : false,
	 			commentStuts : true,
	 			pageId : commentRes.meta.pageId 
	        })
		}else if(commentRes.meta.status === 401){
    		
    		localStorage.clear();
    		this.props.history.push("/login");
    		
    	}
		else{

			this.setState({
	        	commentState :commentRes,
	        	showLoader : false
	        })
		}
	}

	showMoreCommentsData = async (id)=>{

      	this.setState({showLoader : true});
		let showMoreCommentRes = {};
		let showMoreCommentReq = {};
		let leadId = id;
		console.log("YYYYYYYYYYYYYYY=====>",leadId);

        let listData = {};
        listData.size = 4;
        listData.pageId = this.state.pageId+1;
        listData.filters = [];

        showMoreCommentReq.id = leadId;
        showMoreCommentReq.data = listData;

		showMoreCommentRes = await getCommentData(showMoreCommentReq);

		console.log("XXXXXXXXXXXXXXXXXXXX=====>",showMoreCommentRes);
		if(showMoreCommentRes.meta.status === 200){

			this.setState({
	        	commentState :showMoreCommentRes,
	        	showLoader : false,
	 			commentStuts : true,
	 			pageId : showMoreCommentRes.meta.pageId 
	        })
		}else if(showMoreCommentRes.meta.status === 401){
    		
    		localStorage.clear();
    		this.props.history.push("/login");
    		
    	}
		else{

			this.setState({
	        	commentState :showMoreCommentRes,
	        	showLoader : false
	        })
		}
	}


    render() {

    	let leadDetail = this.props.leadDetailProp;
    	let leadDetailMeta = leadDetail.meta;
    	let leadDetailData = leadDetail.data;

    	const {commentState,commentStuts} = this.state;
    	console.log("wwwwwwwwwwwwwwwwwwwwwww",leadDetailMeta.status);
    	let commentStateMeta = commentState.meta;
    	let commentStateData = commentState.data;
		// {commentStateMeta.status == 200 ? 



        return (
            <Aux>
 				<Modal
 				  show={this.props.show} 
 				  onHide={this.props.changeModal}	
			      size="xl"
			      aria-labelledby="contained-modal-title-vcenter"
			      centered
			    >
			      <Modal.Header closeButton>
			        <Modal.Title id="contained-modal-title-vcenter">
			          Lead detail
			        </Modal.Title>
			      </Modal.Header>
			      <Modal.Body>
			      	{leadDetailMeta.status == 200 ? 
			      	<div className="detailLead">
			      		<div className="row">
			      			<div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>LeadID : </b></span>
		                                {leadDetailData.lead_id !=null  ? 
		                                	<span className="font-small">{leadDetailData.lead_id}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }	
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Name : </b></span>
		                                {leadDetailData.client_id !=null ? 
		                                	<span className="font-small text-capitalize">{leadDetailData.client_details.client_name}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }	
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Number : </b></span>
		                                {leadDetailData.client_details.client_number !=null ? 
		                                	<span className="font-small">{leadDetailData.client_details.client_number}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }	
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Email : </b></span>
		                                {leadDetailData.client_details.client_email !=null ? 
		                                	<span className="font-small">{leadDetailData.client_details.client_email}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }	
		                            </div>
		                        </div>
		                    </div>
			      		</div>

			      		<div className="row">
			      			<div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Assign Date : </b></span>
		                                {leadDetailData.createdAt !=null ? 
		                                	<span className="font-small">{leadDetailData.createdAt}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }	
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Comming Date : </b></span>
		                                <span className="font-small">Thu,Feb 27,2020 6:44 PM</span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>follow up Date : </b></span>
		                                <span className="font-small">Thu,Feb 27,2020 6:44 PM</span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Visit Date : </b></span>
		                                <span className="font-small">Thu,Feb 27,2020 6:44 PM</span>
		                            </div>
		                        </div>
		                    </div>
			      		</div>

			      		<div className="row">
			      			<div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Project Name : </b></span>
		                                {leadDetailData.project_name !=null ? 
		                                	<span className="font-small text-capitalize">{leadDetailData.project_name}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
			      			<div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Budget : </b></span>
		                                <span className="font-small">NaN</span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>RM Name : </b></span>
		                                {leadDetailData.team_id !=null ? 
		                                	<span className="font-small text-capitalize">{leadDetailData.team.name}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }	
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small text-capitalize"><b>Source : </b></span>
		                                {leadDetailData.source_id !=null ? 
		                                	<span className="font-small">{leadDetailData.source.source}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
			      		</div>

			      		<div className="row">
			      			<div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Added By : </b></span>
		                                {leadDetailData.lead_added_by !=null ? 
		                                	<span className="font-small text-capitalize">{leadDetailData.lead_addedby.name}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Revert By: </b></span>
		                                <span className="font-small">NaN</span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Is Active : </b></span>
		                                {leadDetailData.is_active !=null ? 
		                                	<span className="font-small">{leadDetailData.is_active}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small text-capitalize"><b>Client Type : </b></span>
		                                {leadDetailData.lead_status_id !=null ? 
		                                	<span className="font-small">{leadDetailData.lead_status.status}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
			      		</div>

			      		<div className="row">
			      			<div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Property Type : </b></span>
		                                <span className="font-small">NaN</span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Dump status : </b></span>
		                                <span className="font-small">NaN</span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Dump AssignBy : </b></span>
		                                <span className="font-small">NaN</span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Deleted By : </b></span>
		                                <span className="font-small">NaN</span>
		                            </div>
		                        </div>
		                    </div>
			      		</div>

			      		<div className="row">
			      			<div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Is Magnet : </b></span>
		                                <span className="font-small">{leadDetailData.is_magnet == true ? 'Yes' : 'No'}</span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Closed/Booked : </b></span>
		                                <span className="font-small">{/*Tue,Mar 3,2020*/}NaN</span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Visited Project : </b></span>
		                                <span className="font-small">NaN</span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Closing Reason : </b></span>
		                                <span className="font-small">NaN</span>
		                            </div>
		                        </div>
		                    </div>
			      		</div>

			      		<div className="row">
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Pre Sales lead : </b></span>
		                                <span className="font-small">NaN</span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Pre Sales RM : </b></span>
		                                {leadDetailData.presale_rm !=null ? 
		                                	<span className="font-small text-capitalize">{leadDetailData.presalerm.name}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Cross Sales Lead : </b></span>
		                                <span className="font-small">NaN</span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Cross Sales RM : </b></span>
		                                {leadDetailData.crosssale_rm !=null ? 
		                                	<span className="font-small text-capitalize">{leadDetailData.crosssalerm.name}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
			      		</div>

			      		<div className="row">
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Magent RM : </b></span>
		                                {leadDetailData.magent_rm !=null ? 
		                                	<span className="font-small">{leadDetailData.magentrm.name}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Loan Required : </b></span>
		                                <span className="font-small">{leadDetailData.loan_required === true ? 'Yes' : 'No'}</span>
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Loan Amount : </b></span>
		                                {leadDetailData.loan_amount !=null ? 
			                                <span className="font-small">{leadDetailData.loan_amount}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
		                    <div className="col-md-3 col-sm-6 col-12  mb-2">
		                        <div className="row">
		                            <div className="col-md-12 col-sm-12 col-12">
		                                <span className="font-small"><b>Is Presale : </b></span>
		                                {leadDetailData.is_presale !=null ? 
		                                	<span className="font-small">{leadDetailData.is_presale}</span>
		                                	:
		                                	<span className="font-small">-</span>
		                                }
		                            </div>
		                        </div>
		                    </div>
			      		</div>

			      		<div className="row mb-2">
			      			<div className="col-md-12 commnets" onClick={()=>this.commentsData(leadDetailData.lead_id)}>
			      				<span className="mr-3">Comments({leadDetailData.comment_count})</span>
		      				</div>
			      		</div>
			      		{commentStuts === true ? 
			      			(commentStateMeta.status === 200 ? 
					      		<PerfectScrollbar>
					      			<div className="commentBox"> 
					      				{commentStateData.map((comment,index) =>
								      		<div className="card shadow pt-2 pb-2 mb-2" key={index}>
								      			<div className="Comment_row mb-2">
								      				<div className="col-md-4 col-12">
								      					<span className="font-small"><b>User ID : </b></span>
								      					<span className="font-small">{comment.user_id}</span>
								      				</div>
								      				<div className="col-md-4 col-12">
								      					<span className="font-small"><b>Lead ID : </b></span>
								      					<span className="font-small">{comment.lead_id}</span>
								      				</div>
								      				<div className="col-md-4 col-12">
								      					<span className="font-small"><b>Date : </b></span>
								      					<span className="font-small">Thu,Feb 27,2020 6:44 PM</span>
								      				</div>
								      			</div>
								      			<div className="d-flex">
								      				<div className="col-md-12">
								      					<span className="font-small"><b>Comment : </b></span>
								      					<span className="font-small">{comment.comment}</span>
								      				</div>
								      			</div>
								      		</div>
				      					)}
				      					{commentStateMeta.total_page !== commentStateMeta.pageId ?  
								      		<div className="col-md-12 commnets" onClick={()=> this.showMoreCommentsData(leadDetailData.lead_id)}>
							      				<span className="mr-3">show more</span>
						      				</div>
						      				:
						      				''
					      				}
						      		</div>
					      		</PerfectScrollbar>
					      		:
				      			<div className="commentBox"> 
						      		<div className="card shadow pt-2 pb-2 mb-2">
						      			<div className="Comment_row d-flex mb-2">
						      				<div className="col-md-12">
						      					<span className="font-small"><b>Ooops No comments!!!</b></span>
						      				</div>
						      			</div>
						      		</div>
					      		</div>
			      			)
				      		:
				      		''
				      	}	
			      		
			      	</div>  	
			      	:
			      		<div className="row">
			      			<div className="col-md-12">
			      				<span className="mr-2">Couldn't get detail, Please try again !!!</span>
		      				</div>
			      		</div>
			      	}	
			      </Modal.Body>
			      <Backdrop className="backDoor" open={this.state.showLoader}>
			        <CircularProgress color="inherit" />
			      </Backdrop>
			    </Modal>
            </Aux>
        );
    };
};    

export default withRouter(DetailLead);
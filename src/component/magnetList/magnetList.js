import React, {Component} from "react";

import "./magnetList.css";
import Aux from "../../utils/Aux/aux.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronDown, faMapMarkerAlt, faAd, faUser, faCompass, faCommentAlt, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";

class magnetList extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
      		listDetail: false,
    	};
  	}

  	detailView (id){

  		if(this.state.listDetail == id){
  			this.setState({listDetail : null})

  		}else{
  			this.setState({listDetail : id})
  		}

  	}

	render(){
		return(

			<Aux>
				<div className={"content-wrapper"+" "+(this.props.expand ? 'main-header-collapsed' : '')}>
					<div className="listContainer">
				
						<div className="MainList">
					        <div className="container-fluid">
					            <div className="ListContent card mb-2">
					                <div className="row mb-2">
					                    <div className="col-md-2 col-sm-12 col-12  mb-2">
					                        <div className="row">
					                            <div className="col-md-12 col-sm-6 col-6">
					                                <h6><b>ID:</b> 506274</h6>
					                            </div>
					                            <div className="col-md-12 col-sm-6 col-6">
					                                <h6 className="textRight"><b>Date:</b> 20/01/20</h6>
					                            </div>
					                        </div>
					                    </div>
					                    <div className="col-md-7 col-sm-12 col-12">
					                        <div className="row">
					                            <div className="col-md-4 col-sm-12 col-12 mb-1">
					                                <h3 className="textEllipsis"><FontAwesomeIcon icon={faUser} className="text-info mr-2"/><b>Bhagyashree Krishna Ghag</b></h3>
					                            </div>
					                            <div className="col-md-4 col-sm-12 col-12 mb-2">
					                                <h3><FontAwesomeIcon icon={faPhoneAlt} className="text-info mr-2"/>1234567890</h3>
					                            </div>
					                            <div className="col-md-4 col-sm-12 col-12 mb-2">
					                                <h3><FontAwesomeIcon icon={faUser} className="text-info mr-2"/>Kalpatru Vienta Kandivali</h3>
					                            </div>
					                        </div>
					                    </div>
					                    <div className="col-md-3 col-sm-12 col-12">
					                        <div className="row">
					                            <div className="col-md-6 col-sm-6 col-6">
					                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-info mr-1"/> <span>Mumbai</span>
					                            </div>
					                        </div>
					                    </div>
					                </div>
					                <a className="Action" onClick={() => this.detailView('one')}>
					                	<FontAwesomeIcon icon={this.state.listDetail === "one" ? faChevronDown : faChevronLeft} className="text-white"/>
				                	</a>
						            <div className={"ShortContent"+" "+ (this.state.listDetail === "one" ? "show" : "hide")}>
						                <div className="row">
						                    <div className="col-md-6 col-sm-12 col-12">
						                        <div className="row">
						                            <div className="col-md-4 col-sm-4 mb-2">
						                                <FontAwesomeIcon icon={faAd} className="text-info"/> <span> Agency-MDS</span>
						                            </div>
						                            <div className="col-md-4 col-sm-4 mb-2">
						                                <FontAwesomeIcon icon={faUser} className="text-info"/> <span>Not updates</span>
						                            </div>
						                            <div className="col-md-4 col-sm-4 mb-2">
						                                <FontAwesomeIcon icon={faCompass} className="text-info"/> <span>KDMC</span>
						                            </div>
						                        </div>
						                    </div>
						                    <div className="col-md-6 col-sm-12 col-12 mb-2">
						                        <FontAwesomeIcon icon={faCommentAlt} className="text-info"/> <span> 24-1 call 2 to 3 times went ringing ,drop msg on whtsapp </span>
						                    </div>
						                </div>
						                <div className="ActionSection">
						                    <div className="row">
						                        <div className="col-sm-6 col-6">
						                            <a href="" className="WhatsAppBG"><i className="fab fa-whatsapp"></i></a>
						                        </div>
						                        <div className="col-sm-6 col-6">
						                            <a href="" className="ActionBg"><i className="fas fa-phone"></i></a>
						                        </div>
						                    </div>
						                </div>
						            </div>
					            </div>
					        </div>
					    </div>
				    
					    <div className="MainList">
					        <div className="container-fluid">
					            <div className="ListContent card mb-2">
					                <div className="row mb-2">
					                    <div className="col-md-2 col-sm-12 col-12 mb-2">
					                        <div className="row">
					                            <div className="col-md-12 col-sm-6 col-6">
					                                <h6><b>ID:</b> 506274</h6>
					                            </div>
					                            <div className="col-md-12 col-sm-6 col-6">
					                                <h6 className="textRight"><b>Date:</b> 20/01/20</h6>
					                            </div>
					                        </div>
					                    </div>
					                    <div className="col-md-7 col-sm-12 col-12">
					                        <div className="row">
					                            <div className="col-md-4 col-sm-12 col-12 mb-1">
					                                <h3 className="textEllipsis"><FontAwesomeIcon icon={faUser} className="text-info mr-2"/><b>Bhagyashree Krishna Ghag</b></h3>
					                            </div>
					                            <div className="col-md-4 col-sm-12 col-12 mb-2">
					                                <h3><FontAwesomeIcon icon={faPhoneAlt} className="text-info mr-2"/>1234567890</h3>
					                            </div>
					                            <div className="col-md-4 col-sm-12 col-12 mb-2">
					                                <h3><FontAwesomeIcon icon={faUser} className="text-info mr-2"/>Kalpatru Vienta Kandivali</h3>
					                            </div>
					                        </div>
					                    </div>
					                    <div className="col-md-3 col-sm-12 col-12">
					                        <div className="row">
					                            <div className="col-md-6 col-sm-6 col-6">
					                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-info mr-1"/> <span>Mumbai</span>
					                            </div>
					                        </div>
					                    </div>
					                </div>
					                <a className="Action" onClick={() => this.detailView('two')}>
					                	<FontAwesomeIcon icon={this.state.listDetail === "two" ? faChevronDown : faChevronLeft} className="text-white"/>
				                	</a>
					            
						            <div className={"ShortContent"+" "+ (this.state.listDetail === "two" ? "show" : "hide")}>
						                <div className="row">
						                    <div className="col-md-6 col-sm-12 col-12">
						                        <div className="row">
						                            <div className="col-md-4 col-sm-4 mb-2 mb-2">
						                                <FontAwesomeIcon icon={faAd} className="text-info"/> <span> Agency-MDS</span>
						                            </div>
						                            <div className="col-md-4 col-sm-4 mb-2 mb-2">
						                                <FontAwesomeIcon icon={faUser} className="text-info"/> <span>Not updates</span>
						                            </div>
						                            <div className="col-md-4 col-sm-4 mb-2 mb-2">
						                                <FontAwesomeIcon icon={faCompass} className="text-info"/> <span>KDMC</span>
						                            </div>
						                        </div>
						                    </div>
						                    <div className="col-md-6 col-sm-12 col-12 mb-2">
						                        <FontAwesomeIcon icon={faCommentAlt} className="text-info"/> <span> 24-1 call 2 to 3 times went ringing ,drop msg on whtsapp </span>
						                    </div>
						                </div>
						                <div className="ActionSection">
						                    <div className="row">
						                        <div className="col-sm-6 col-6">
						                            <a href="" className="WhatsAppBG"><i className="fab fa-whatsapp"></i></a>
						                        </div>
						                        <div className="col-sm-6 col-6">
						                            <a href="" className="ActionBg"><i className="fas fa-phone"></i></a>
						                        </div>
						                    </div>
						                </div>
						            </div>
					            </div>
					        </div>
					    </div>
					    
					    <div className="MainList">
					        <div className="container-fluid">
					            <div className="ListContent card mb-2">
					                <div className="row mb-2">
					                    <div className="col-md-2 col-sm-12 col-12 mb-2">
					                        <div className="row">
					                            <div className="col-md-12 col-sm-6 col-6">
					                                <h6><b>ID:</b> 506274</h6>
					                            </div>
					                            <div className="col-md-12 col-sm-6 col-6">
					                                <h6 className="textRight"><b>Date:</b> 20/01/20</h6>
					                            </div>
					                        </div>
					                    </div>
					                    <div className="col-md-7 col-sm-12 col-12">
					                        <div className="row">
					                            <div className="col-md-4 col-sm-12 col-12 mb-1">
					                                <h3 className="textEllipsis"><FontAwesomeIcon icon={faUser} className="text-info mr-2"/><b>Bhagyashree Krishna Ghag</b></h3>
					                            </div>
					                            <div className="col-md-4 col-sm-12 col-12 mb-2">
					                                <h3><FontAwesomeIcon icon={faPhoneAlt} className="text-info mr-2"/>1234567890</h3>
					                            </div>
					                            <div className="col-md-4 col-sm-12 col-12 mb-2">
					                                <h3><FontAwesomeIcon icon={faUser} className="text-info mr-2"/>Kalpatru Vienta Kandivali</h3>
					                            </div>
					                        </div>
					                    </div>
					                    <div className="col-md-3 col-sm-12 col-12">
					                        <div className="row">
					                            <div className="col-md-6 col-sm-6 col-6">
					                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-info mr-1"/> <span>Mumbai</span>
					                            </div>
					                        </div>
					                    </div>
					                </div>
					                <a className="Action" onClick={() => this.detailView('three')}>
					                	<FontAwesomeIcon icon={this.state.listDetail === "three" ? faChevronDown : faChevronLeft} className="text-white"/>
				                	</a>
					            
						            <div className={"ShortContent"+" "+ (this.state.listDetail === "three" ? "show" : "hide")}>
						                <div className="row">
						                    <div className="col-md-6 col-sm-12 col-12">
						                        <div className="row">
						                            <div className="col-md-4 col-sm-4 mb-2">
						                                <FontAwesomeIcon icon={faAd} className="text-info"/> <span> Agency-MDS</span>
						                            </div>
						                            <div className="col-md-4 col-sm-4 mb-2">
						                                <FontAwesomeIcon icon={faUser} className="text-info"/> <span>Not updates</span>
						                            </div>
						                            <div className="col-md-4 col-sm-4 mb-2">
						                                <FontAwesomeIcon icon={faCompass} className="text-info"/> <span>KDMC</span>
						                            </div>
						                        </div>
						                    </div>
						                    <div className="col-md-6 col-sm-12 col-12 mb-2">
						                        <FontAwesomeIcon icon={faCommentAlt} className="text-info"/> <span> 24-1 call 2 to 3 times went ringing ,drop msg on whtsapp </span>
						                    </div>
						                </div>
						                <div className="ActionSection">
						                    <div className="row">
						                        <div className="col-sm-6 col-6">
						                            <a href="" className="WhatsAppBG"><i className="fab fa-whatsapp"></i></a>
						                        </div>
						                        <div className="col-sm-6 col-6">
						                            <a href="" className="ActionBg"><i className="fas fa-phone"></i></a>
						                        </div>
						                    </div>
						                </div>
						            </div>
					            </div>
					        </div>
					    </div>
					    
					    <div className="MainList">
					        <div className="container-fluid">
					            <div className="ListContent card mb-2">
					                <div className="row mb-2">
					                    <div className="col-md-2 col-sm-12 col-12 mb-2">
					                        <div className="row">
					                            <div className="col-md-12 col-sm-6 col-6">
					                                <h6><b>ID:</b> 506274</h6>
					                            </div>
					                            <div className="col-md-12 col-sm-6 col-6">
					                                <h6 className="textRight"><b>Date:</b> 20/01/20</h6>
					                            </div>
					                        </div>
					                    </div>
					                    <div className="col-md-7 col-sm-12 col-12">
					                        <div className="row">
					                            <div className="col-md-4 col-sm-12 col-12 mb-1">
					                                <h3 className="textEllipsis"><FontAwesomeIcon icon={faUser} className="text-info mr-2"/><b>Bhagyashree Krishna Ghag</b></h3>
					                            </div>
					                            <div className="col-md-4 col-sm-12 col-12 mb-2">
					                                <h3><FontAwesomeIcon icon={faPhoneAlt} className="text-info mr-2"/>1234567890</h3>
					                            </div>
					                            <div className="col-md-4 col-sm-12 col-12 mb-2">
					                                <h3><FontAwesomeIcon icon={faUser} className="text-info mr-2"/>Kalpatru Vienta Kandivali</h3>
					                            </div>
					                        </div>
					                    </div>
					                    <div className="col-md-3 col-sm-12 col-12">
					                        <div className="row">
					                            <div className="col-md-6 col-sm-6 col-6">
					                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-info mr-1"/> <span>Mumbai</span>
					                            </div>
					                        </div>
					                    </div>
					                </div>
					                <a className="Action" onClick={() => this.detailView('four')}>
					                	<FontAwesomeIcon icon={this.state.listDetail === "four" ? faChevronDown : faChevronLeft} className="text-white"/>
				                	</a>
					            
						            <div className={"ShortContent"+" "+ (this.state.listDetail === "four" ? "show" : "hide")}>
						                <div className="row">
						                    <div className="col-md-6 col-sm-12 col-12">
						                        <div className="row">
						                            <div className="col-md-4 col-sm-4 mb-2">
						                                <FontAwesomeIcon icon={faAd} className="text-info"/> <span> Agency-MDS</span>
						                            </div>
						                            <div className="col-md-4 col-sm-4 mb-2">
						                                <FontAwesomeIcon icon={faUser} className="text-info"/> <span>Not updates</span>
						                            </div>
						                            <div className="col-md-4 col-sm-4 mb-2">
						                                <FontAwesomeIcon icon={faCompass} className="text-info"/> <span>KDMC</span>
						                            </div>
						                        </div>
						                    </div>
						                    <div className="col-md-6 col-sm-12 col-12 mb-2">
						                        <FontAwesomeIcon icon={faCommentAlt} className="text-info"/> <span> 24-1 call 2 to 3 times went ringing ,drop msg on whtsapp </span>
						                    </div>
						                </div>
						                <div className="ActionSection">
						                    <div className="row">
						                        <div className="col-sm-6 col-6">
						                            <a href="" className="WhatsAppBG"><i className="fab fa-whatsapp"></i></a>
						                        </div>
						                        <div className="col-sm-6 col-6">
						                            <a href="" className="ActionBg"><i className="fas fa-phone"></i></a>
						                        </div>
						                    </div>
						                </div>
						            </div>
					            </div>
					        </div>
					    </div>
					</div>    

			    </div>
			</Aux>
		);
	};
};

export default magnetList;
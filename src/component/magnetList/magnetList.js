import React, {Component} from "react";

import "./magnetList.css";
import Aux from "../../utils/Aux/aux.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

class magnetList extends Component {

	render(){
		return(

			<Aux>
				<div className={"content-wrapper"+" "+(this.props.expand ? 'main-header-collapsed' : '')}>
					<div className="listContainer">
				
						<div class="MainList">
					        <div class="container-fluid">
					            <div class="ListContent card">
					                <div class="row">
					                    <div class="col-md-2 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-12 col-sm-6 col-xs-6">
					                                <h6><b>ID:</b> 506274</h6>
					                            </div>
					                            <div class="col-md-12 col-sm-6 col-xs-6">
					                                <h6 class="textRight"><b>Date:</b> 20/01/20</h6>
					                            </div>
					                        </div>
					                    </div>
					                    <div class="col-md-7 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-4 col-sm-12 col-xs-12">
					                                <h3><b>Bhagyashree Krishna Ghag</b></h3>
					                            </div>
					                            <div class="col-md-4 col-sm-12 col-xs-12">
					                                <a href="">1234567890</a>
					                            </div>
					                            <div class="col-md-4 col-sm-12 col-xs-12">
					                                <h3>Kalpatru Vienta Kandivali</h3>
					                            </div>
					                        </div>
					                    </div>
					                    <div class="col-md-3 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-6 col-sm-6 col-xs-6">
					                                <i class="fas fa-map-marker-alt"></i> <p>Mumbai</p>
					                            </div>
					                        </div>
					                    </div>
					                </div>
					                <a class="Action"><FontAwesomeIcon icon={faChevronLeft} className="text-white"/></a>
					            </div>
					            <div class="ShortContent Hide card">
					                <div class="row">
					                    <div class="col-md-6 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-4 col-sm-4 col-xs-4">
					                                <i class="fas fa-ad"></i> <p> Agency-MDS</p>
					                            </div>
					                            <div class="col-md-4 col-sm-4 col-xs-4">
					                                <i class="fas fa-user"></i> <p>Not updates</p>
					                            </div>
					                            <div class="col-md-4 col-sm-4 col-xs-4">
					                                <i class="fas fa-compass"></i> <p>KDMC</p>
					                            </div>
					                        </div>
					                    </div>
					                    <div class="col-md-6 col-sm-12 col-xs-12">
					                        <i class="fas fa-comment-alt"></i> <p> 24-1 call 2 to 3 times went ringing ,drop msg on whtsapp </p>
					                    </div>
					                </div>
					                <div class="ActionSection">
					                    <div class="row">
					                        <div class="col-sm-6 col-xs-6">
					                            <a href="" class="WhatsAppBG"><i class="fab fa-whatsapp"></i></a>
					                        </div>
					                        <div class="col-sm-6 col-xs-6">
					                            <a href="" class="ActionBg"><i class="fas fa-phone"></i></a>
					                        </div>
					                    </div>
					                </div>
					            </div>

					        </div>
					    </div>
				    
					    <div class="MainList">
					        <div class="container-fluid">
					            <div class="ListContent card">
					                <div class="row">
					                    <div class="col-md-2 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-12 col-sm-6 col-xs-6">
					                                <h6><b>ID:</b> 506274</h6>
					                            </div>
					                            <div class="col-md-12 col-sm-6 col-xs-6">
					                                <h6 class="textRight"><b>Date:</b> 20/01/20</h6>
					                            </div>
					                        </div>
					                    </div>
					                    <div class="col-md-7 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-4 col-sm-12 col-xs-12">
					                                <h3><b>Bhagyashree Krishna Ghag</b></h3>
					                            </div>
					                            <div class="col-md-4 col-sm-12 col-xs-12">
					                                <a href="">1234567890</a>
					                            </div>
					                            <div class="col-md-4 col-sm-12 col-xs-12">
					                                <h3>Kalpatru Vienta Kandivali</h3>
					                            </div>
					                        </div>
					                    </div>
					                    <div class="col-md-3 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-6 col-sm-6 col-xs-6">
					                                <i class="fas fa-map-marker-alt"></i> <p>Mumbai</p>
					                            </div>
					                        </div>
					                    </div>
					                </div>
					                <a class="Action"><FontAwesomeIcon icon={faChevronLeft} className="text-white"/></a>
					            </div>
					            <div class="ShortContent Hide card">
					                <div class="row">
					                    <div class="col-md-6 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-4 col-sm-4 col-xs-4">
					                                <i class="fas fa-ad"></i> <p> Agency-MDS</p>
					                            </div>
					                            <div class="col-md-4 col-sm-4 col-xs-4">
					                                <i class="fas fa-user"></i> <p>Not updates</p>
					                            </div>
					                            <div class="col-md-4 col-sm-4 col-xs-4">
					                                <i class="fas fa-compass"></i> <p>KDMC</p>
					                            </div>
					                        </div>
					                    </div>
					                    <div class="col-md-6 col-sm-12 col-xs-12">
					                        <i class="fas fa-comment-alt"></i> <p> 24-1 call 2 to 3 times went ringing ,drop msg on whtsapp </p>
					                    </div>
					                </div>
					                <div class="ActionSection">
					                    <div class="row">
					                        <div class="col-sm-6 col-xs-6">
					                            <a href="" class="WhatsAppBG"><i class="fab fa-whatsapp"></i></a>
					                        </div>
					                        <div class="col-sm-6 col-xs-6">
					                            <a href="" class="ActionBg"><i class="fas fa-phone"></i></a>
					                        </div>
					                    </div>
					                </div>
					            </div>

					        </div>
					    </div>
					    
					    <div class="MainList">
					        <div class="container-fluid">
					            <div class="ListContent card">
					                <div class="row">
					                    <div class="col-md-2 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-12 col-sm-6 col-xs-6">
					                                <h6><b>ID:</b> 506274</h6>
					                            </div>
					                            <div class="col-md-12 col-sm-6 col-xs-6">
					                                <h6 class="textRight"><b>Date:</b> 20/01/20</h6>
					                            </div>
					                        </div>
					                    </div>
					                    <div class="col-md-7 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-4 col-sm-12 col-xs-12">
					                                <h3><b>Bhagyashree Krishna Ghag</b></h3>
					                            </div>
					                            <div class="col-md-4 col-sm-12 col-xs-12">
					                                <a href="">1234567890</a>
					                            </div>
					                            <div class="col-md-4 col-sm-12 col-xs-12">
					                                <h3>Kalpatru Vienta Kandivali</h3>
					                            </div>
					                        </div>
					                    </div>
					                    <div class="col-md-3 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-6 col-sm-6 col-xs-6">
					                                <i class="fas fa-map-marker-alt"></i> <p>Mumbai</p>
					                            </div>
					                        </div>
					                    </div>
					                </div>
					                <a class="Action"><FontAwesomeIcon icon={faChevronLeft} className="text-white"/></a>
					            </div>
					            <div class="ShortContent Hide card">
					                <div class="row">
					                    <div class="col-md-6 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-4 col-sm-4 col-xs-4">
					                                <i class="fas fa-ad"></i> <p> Agency-MDS</p>
					                            </div>
					                            <div class="col-md-4 col-sm-4 col-xs-4">
					                                <i class="fas fa-user"></i> <p>Not updates</p>
					                            </div>
					                            <div class="col-md-4 col-sm-4 col-xs-4">
					                                <i class="fas fa-compass"></i> <p>KDMC</p>
					                            </div>
					                        </div>
					                    </div>
					                    <div class="col-md-6 col-sm-12 col-xs-12">
					                        <i class="fas fa-comment-alt"></i> <p> 24-1 call 2 to 3 times went ringing ,drop msg on whtsapp </p>
					                    </div>
					                </div>
					                <div class="ActionSection">
					                    <div class="row">
					                        <div class="col-sm-6 col-xs-6">
					                            <a href="" class="WhatsAppBG"><i class="fab fa-whatsapp"></i></a>
					                        </div>
					                        <div class="col-sm-6 col-xs-6">
					                            <a href="" class="ActionBg"><i class="fas fa-phone"></i></a>
					                        </div>
					                    </div>
					                </div>
					            </div>

					        </div>
					    </div>
					    
					    <div class="MainList">
					        <div class="container-fluid">
					            <div class="ListContent card">
					                <div class="row">
					                    <div class="col-md-2 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-12 col-sm-6 col-xs-6">
					                                <h6><b>ID:</b> 506274</h6>
					                            </div>
					                            <div class="col-md-12 col-sm-6 col-xs-6">
					                                <h6 class="textRight"><b>Date:</b> 20/01/20</h6>
					                            </div>
					                        </div>
					                    </div>
					                    <div class="col-md-7 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-4 col-sm-12 col-xs-12">
					                                <h3><b>Bhagyashree Krishna Ghag</b></h3>
					                            </div>
					                            <div class="col-md-4 col-sm-12 col-xs-12">
					                                <a href="">1234567890</a>
					                            </div>
					                            <div class="col-md-4 col-sm-12 col-xs-12">
					                                <h3>Kalpatru Vienta Kandivali</h3>
					                            </div>
					                        </div>
					                    </div>
					                    <div class="col-md-3 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-6 col-sm-6 col-xs-6">
					                                <i class="fas fa-map-marker-alt"></i> <p>Mumbai</p>
					                            </div>
					                        </div>
					                    </div>
					                </div>
					                <a class="Action"><FontAwesomeIcon icon={faChevronLeft} className="text-white"/></a>
					            </div>
					            <div class="ShortContent Hide card">
					                <div class="row">
					                    <div class="col-md-6 col-sm-12 col-xs-12">
					                        <div class="row">
					                            <div class="col-md-4 col-sm-4 col-xs-4">
					                                <i class="fas fa-ad"></i> <p> Agency-MDS</p>
					                            </div>
					                            <div class="col-md-4 col-sm-4 col-xs-4">
					                                <i class="fas fa-user"></i> <p>Not updates</p>
					                            </div>
					                            <div class="col-md-4 col-sm-4 col-xs-4">
					                                <i class="fas fa-compass"></i> <p>KDMC</p>
					                            </div>
					                        </div>
					                    </div>
					                    <div class="col-md-6 col-sm-12 col-xs-12">
					                        <i class="fas fa-comment-alt"></i> <p> 24-1 call 2 to 3 times went ringing ,drop msg on whtsapp </p>
					                    </div>
					                </div>
					                <div class="ActionSection">
					                    <div class="row">
					                        <div class="col-sm-6 col-xs-6">
					                            <a href="" class="WhatsAppBG"><i class="fab fa-whatsapp"></i></a>
					                        </div>
					                        <div class="col-sm-6 col-xs-6">
					                            <a href="" class="ActionBg"><i class="fas fa-phone"></i></a>
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
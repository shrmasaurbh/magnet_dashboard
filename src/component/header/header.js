import React, {Component} from "react";

import Aux from "../../utils/Aux/aux.js"
import "./header.css";
// import Filter from "../filter/filter";
import chets from "../../assets/image/chets.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faComments, faSearch, faBars, faBell, faFilter} from "@fortawesome/free-solid-svg-icons";


class Header extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
      		visibility: false,
      		notify : false,
            screenWidth: 0,
            mobileSearch : false 
    	};
       window.addEventListener("resize", this.update);
		}

    componentDidMount() {
        this.update();
      }
    update = () => {
        this.setState({
          screenWidth: window.innerWidth
        });
    };

    toggleDropdown() {
        this.setState({ mobileSearch: !this.state.mobileSearch });
    }

    // handlePopUp =()=> {
    //     // if (!this.state.showFilter) {
    //     //   // attach/remove event handler
    //     //   document.addEventListener('click', this.handleOutsideClick, false);
    //     // } else {
    //     //   document.removeEventListener('click', this.handleOutsideClick, false);
    //     // }

    //     this.setState(prevState => ({
    //        showFilter: !prevState.showFilter,
    //     }));
    // }

    // handleOutsideClick=(e)=> {
        
    //     if (this.node.contains(e.target)) {
    //       return;
    //     }
    //     console.log(this.node);
    //     console.log(e.target);
    //     this.handlePopUp();
    // }

	render(){
        const isDesktop = this.state.screenWidth;
        // console.log("this.props.buttonClick");
        // console.log(this.state.mobileSearch);

		return(

            <Aux>
                {isDesktop > 991 ? 

    			<nav className={"main-header navbar sticky-top navbar-expand navbar-white navbar-light"+" "+(this.props.expand ? 'main-header-collapsed' : '')}>
                    <ul className="navbar-nav">
                        <li className="nav-item desktop" onClick ={this.props.buttonClick}>
                            <span className="nav-link" data-widget="pushmenu">
                        	   <FontAwesomeIcon icon={faBars} className="nav-icon" />
                            </span>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="/" className="nav-link">Home</a>
                        </li>
                        {/*<li className="nav-item d-none d-sm-inline-block">
                            <a href="#" className="nav-link">Contact</a>
                        </li>*/}
                    </ul>
                    <form className="form-inline ml-3">
                        <div className="input-group input-group-sm">
                            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-navbar input-group-text" type="submit">
                            		<FontAwesomeIcon icon={faSearch} className="nav-icon" />
                                </button>
                            </div>
                        </div>
                    </form>
                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item dropdown">
                            <span className="nav-link" data-toggle="dropdown" onClick ={()=> this.setState({visibility : !this.state.visibility})}>
                                <FontAwesomeIcon icon={faComments} className="nav-icon" />
                                <span className="badge badge-danger navbar-badge">3</span>
                            </span>
                            <div className={"dropdown-menu dropdown-menu-lg dropdown-menu-right messageHeader" + " "+ (this.state.visibility ? 'show' : 'hide')}>
                                <a className="dropdown-item">
                                    <div className="media">
                                        <img src={chets} alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                            Chets Varma
                                            <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                                            </h3>
                                            <p className="text-sm">Call me whenever you can...</p>
                                            <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item">
                                    <div className="media">
                                        <img src={chets} alt="User Avatar" className="img-size-50 img-circle mr-3" />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                            Saurabh Sharma
                                            <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                                            </h3>
                                            <p className="text-sm">I got your message bro</p>
                                            <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item">
                                    <div className="media">
                                        <img src={chets} alt="User Avatar" className="img-size-50 img-circle mr-3" />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                            Amol 
                                            <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                                            </h3>
                                            <p className="text-sm">The subject goes here</p>
                                            <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
                            </div>
                        </li>

                        <li className="nav-item dropdown">
                            <span className="nav-link" data-toggle="dropdown" onClick = {()=> this.setState({notify : !this.state.notify})}>
                            	<FontAwesomeIcon icon={faBell} className="nav-icon" />
                                <span className="badge badge-warning navbar-badge">15</span>
                            </span>
                            <div className={"dropdown-menu dropdown-menu-lg dropdown-menu-right" + " " + (this.state.notify ? 'show' : 'hide')}>
                                <span className="dropdown-item dropdown-header">15 Notifications</span>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item">
                                    <i className="fas fa-envelope mr-2"></i> 4 new messages
                                    <span className="float-right text-muted text-sm">3 mins</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item">
                                    <i className="fas fa-users mr-2"></i> 8 friend requests
                                    <span className="float-right text-muted text-sm">12 hours</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item">
                                    <i className="fas fa-file mr-2"></i> 3 new reports
                                    <span className="float-right text-muted text-sm">2 days</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
                                <i className="fas fa-th-large"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
                :
                <nav className={"main-header navbar sticky-top navbar-expand navbar-white navbar-light"+" "+(this.props.expand ? 'main-header-collapsed' : '')}>
                    <ul className="navbar-nav">
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="index3.html" className="nav-link">Home</a>
                        </li>
                        {/*<li className="nav-item d-none d-sm-inline-block">
                            <a href="#" className="nav-link">Contact</a>
                        </li>*/}
                        <li className="nav-item mobile" onClick ={this.props.mobileBarClick}>
                            <span className="nav-link" data-widget="pushmenu">
                               <FontAwesomeIcon icon={faBars} className="nav-icon" />
                            </span>
                        </li>
                        <li className="nav-item d-lg-none p-1" onClick={() => this.toggleDropdown()}>
                            <span className="mobileSearch">
                                <FontAwesomeIcon icon={faSearch} className="nav-icon" />
                            </span>
                        </li>
                    </ul>
                    <form className={"form-inline ml-3 mobileSearchForm" +" "+ (this.state.mobileSearch ? 'show' : 'hide')}>
                        <div className="input-group input-group-sm">
                            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-navbar input-group-text" type="submit">
                                    <FontAwesomeIcon icon={faSearch} className="nav-icon" />
                                </button>
                            </div>
                        </div>
                    </form>
                    <ul className="navbar-nav ml-auto">
                        
                        <li className="nav-item dropdown">
                            <span className="nav-link pr-3" data-toggle="dropdown" onClick ={()=> this.setState({visibility : !this.state.visibility})}>
                                <FontAwesomeIcon icon={faComments} className="nav-icon" />
                                <span className="badge badge-danger navbar-badge">3</span>
                            </span>
                            <div className={"dropdown-menu dropdown-menu-lg dropdown-menu-right" + " "+ (this.state.visibility ? 'show' : 'hide')}>
                                <a className="dropdown-item">
                                    <div className="media">
                                        <img src={chets} alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                            Chets Varma
                                            <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                                            </h3>
                                            <p className="text-sm">Call me whenever you can...</p>
                                            <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item">
                                    <div className="media">
                                        <img src={chets} alt="User Avatar" className="img-size-50 img-circle mr-3" />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                            Saurabh Sharma
                                            <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                                            </h3>
                                            <p className="text-sm">I got your message bro</p>
                                            <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item">
                                    <div className="media">
                                        <img src={chets} alt="User Avatar" className="img-size-50 img-circle mr-3" />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                            Amol 
                                            <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                                            </h3>
                                            <p className="text-sm">The subject goes here</p>
                                            <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <span className="nav-link pr-3" data-toggle="dropdown" onClick = {()=> this.setState({notify : !this.state.notify})}>
                                <FontAwesomeIcon icon={faBell} className="nav-icon" />
                                <span className="badge badge-warning navbar-badge">15</span>
                            </span>
                            <div className={"dropdown-menu dropdown-menu-lg dropdown-menu-right" + " " + (this.state.notify ? 'show' : 'hide')}>
                                <span className="dropdown-item dropdown-header">15 Notifications</span>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item">
                                    <i className="fas fa-envelope mr-2"></i> 4 new messages
                                    <span className="float-right text-muted text-sm">3 mins</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item">
                                    <i className="fas fa-users mr-2"></i> 8 friend requests
                                    <span className="float-right text-muted text-sm">12 hours</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item">
                                    <i className="fas fa-file mr-2"></i> 3 new reports
                                    <span className="float-right text-muted text-sm">2 days</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                            </div>
                        </li>
                        <li className="nav-item d-none d-lg-block">
                            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
                                <i className="fas fa-th-large"></i>
                            </a>
                        </li>
                    </ul>
                </nav>

                }
            </Aux>
		);
	};
};		

export default Header;
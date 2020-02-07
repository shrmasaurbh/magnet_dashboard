import React, {Component} from "react";

import siteImage from "../../assets/image/HomesfyLogo.png";
import smallSiteImage from "../../assets/image/homesfySmall.png";
import chets from "../../assets/image/chets.jpeg";
import "./side_header.css";
import "../../assets/css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleLeft, faCircle, faTachometerAlt, faPlusSquare, faTasks, faAngleDown ,faTimes} from "@fortawesome/free-solid-svg-icons";

class SideBar extends Component {

		constructor(props) {
	    	super(props);
	    	this.state = {
	      		visibility: false,
	      		outSideClick : false
	    	};
	    	// this.setWrapperRef = this.setWrapperRef.bind(this);
    		// this.handleClickOutside = this.handleClickOutside.bind(this);
  		}

		// componentDidMount() {
		// 	document.addEventListener('mousedown', this.handleClickOutside);
		// }
		// componentWillUnmount() {
		// 	document.removeEventListener('mousedown', this.handleClickOutside);
		// }
		// /**
		// * Set the wrapper ref
		// */
		// setWrapperRef(node) {
		// 	this.wrapperRef = node;
		// }
		/**
		* Alert if clicked on outside of element
		*/
		// handleClickOutside(event) {
		// 	if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
		// 		alert('You clicked outside of me!');
		// 		this.setState({outSideClick : !this.state.outSideClick})
		// 		this.props.mobileBarClick();
		// 	}
		// }	
	render(){

		const clickState = this.state.outSideClick;
        console.log("this.props.mobileBar",this.props.mobileBar);

		return(

			<aside className={"main-sidebar sidebar-dark-primary elevation-4" +" "+(this.props.sideBar ? 'main-sidebar-mini' : '')+" "+(this.props.mobileBar ? 'main-sidebar-open' : '')}>
                <a href="#" className="brand-link d-none d-lg-flex">
                    <img className={"site_img" +" "+ (this.props.sideBar ? 'hide' : 'Show')} src={siteImage} alt="site-image" />
                    <img className={"small_site_img" +" "+ (this.props.sideBar ? 'Show' : 'hide')} src={smallSiteImage} alt="site-image" />
                </a>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                        	<img className="img-circle elevation-2" src={chets} alt="site-image" />
                        </div>
                        <div className={"info" +" "+ (this.props.sideBar ? 'hide' : 'Show')}>
                            <a href="#" className="d-block">Chets Varma</a>
                        </div>
                        <span className="close_sideHeader d-lg-none">
							<FontAwesomeIcon icon={faTimes} className="text-muted" onClick={this.props.mobileBarClick}/>
						</span>
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item has-treeview menu-open">
                                <a href="#" className="nav-link bg-success text-white">
                                    <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
                                    <p className={this.props.sideBar ? 'hide' : 'inlineShow'}>
                                        Dashboard
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white">
                                    <FontAwesomeIcon icon={faPlusSquare} className="nav-icon" />
                                    <p className= {this.props.sideBar ? 'hide' : 'inlineShow'}>
                                        New Leads
                                        <span className="right badge badge-danger">New</span>
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item has-treeview">
                                <a className="nav-link text-white" onClick={()=>this.setState({visibility : !this.state.visibility})}>
                                    <FontAwesomeIcon icon={faTasks} className="nav-icon" />
                                    <p className= {this.props.sideBar ? 'hide' : 'inlineShow'}>
                                        	Tasks
                                        <FontAwesomeIcon icon={faAngleLeft} 
                                        	className={"right leftAngleIcon" +" "+(this.state.visibility ? 'hide' : 'show') } />
                                        <span className="badge badge-info right">6</span>
                                        <FontAwesomeIcon icon={faAngleDown} 
                                        	className={"right downAngleIcon" + " " +(this.state.visibility ? 'show' : 'hide') }/>
                                    </p>
                                </a>
                                <ul className={"nav nav-treeview"+" "+ (this.state.visibility ? 'show' : 'hide')}>
                                    <li className="nav-item">
                                        <a href="pages/layout/top-nav.html" className="nav-link">
                                            <FontAwesomeIcon icon={faCircle} className="text-white nav-icon" />
                                            <p>Top Navigation</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                                            <FontAwesomeIcon icon={faCircle} className="text-white nav-icon" />
                                            <p>Top Navigation + Sidebar</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="pages/layout/boxed.html" className="nav-link">
                                            <FontAwesomeIcon icon={faCircle} className="text-white nav-icon" />
                                            <p>Boxed</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="pages/layout/fixed-sidebar.html" className="nav-link">
                                            <FontAwesomeIcon icon={faCircle} className="text-white nav-icon" />
                                            <p>Fixed Sidebar</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="pages/layout/fixed-topnav.html" className="nav-link">
                                            <FontAwesomeIcon icon={faCircle} className="text-white nav-icon" />
                                            <p>Fixed Navbar</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="pages/layout/fixed-footer.html" className="nav-link">
                                            <FontAwesomeIcon icon={faCircle} className="text-white nav-icon" />
                                            <p>Fixed Footer</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="pages/layout/collapsed-sidebar.html" className="nav-link">
                                            <FontAwesomeIcon icon={faCircle} className="text-white nav-icon" />
                                            <p>Collapsed Sidebar</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>                	

		);
	};
};	

export default SideBar;
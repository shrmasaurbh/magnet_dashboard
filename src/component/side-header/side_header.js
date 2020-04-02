import React, {Component} from "react";

import {Link, withRouter} from "react-router-dom";
import siteImage from "../../assets/image/HomesfyLogo.png";
import smallSiteImage from "../../assets/image/homesfySmall.png";
import chets from "../../assets/image/chets.jpeg";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import "./side_header.css";
import "../../assets/css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPowerOff, faBuilding, faAngleLeft, faCircle, faTachometerAlt, faPlusSquare, faTasks, faAngleDown ,faTimes} from "@fortawesome/free-solid-svg-icons";
import {getLogout} from "../../dataParser/auth";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// const scrollbarStyle = {
//     'maxHeight': '110ev'
// };


class SideBar extends Component {

		constructor(props) {
	    	super(props);
	    	this.state = {
	      		visibility: false,
                leadShow: false,
	      		outSideClick : false,
                userName : ""
	    	};
  		}

		componentDidMount() {
			// document.addEventListener('mousedown', this.handleClickOutside);
            let homesfy_lg = window.atob(localStorage.getItem("homesfy_lg"));
            // console.log(homesfy_lg);
            if(homesfy_lg && homesfy_lg !== ""){
                // console.log("===========Local in the sidebar ==========")
                let user = JSON.parse(homesfy_lg);
                this.setState({userName: user.name});
            }
            // if (homesfy_lg && homesfy_lg !== "") {
            //   this.props.history.push("/");
            // }
		}

        logout = async () =>{

            var resData = {};
            resData = await getLogout();

            if(resData.meta.status === 200){
                localStorage.clear();
                this.props.history.push("/login");
            }
            else if(resData.meta.status === 401){
                localStorage.clear();
                this.props.history.push("/login");
            }
            else{

                alert(resData.meta.message);
            }
            
        }

        // onHoverSidebar = ()=>{

        //     this.props.buttonClick();

        // }
        // onLeaveSidebar = () =>{
        //     this.props.buttonClick();
        // }

		
	render(){

		const clickState = this.state.outSideClick;
        console.log("this.props.leadInfo00000000000",this.props.leadInfo);
        console.log(this.state.userName);
        const {userName} = this.state;
		return(

			<aside className={"main-sidebar sidebar-dark-primary elevation-4" +" "+(this.props.sideBar ? 'main-sidebar-mini' : '')+" "+(this.props.mobileBar ? 'main-sidebar-open' : '')}
                ref={this.setWrapperRef}
            >
                <div className="brand-link d-none d-lg-flex">
                {this.props.sideBar ? 
                    <Link to="/">
                        <img className="small_site_img" src={smallSiteImage} alt="site_image" />
                    </Link>    
                    :
                    <Link to="/">
                        <img className="site_img" src={siteImage} alt="small_site_logo" />
                    </Link>    
                }
                </div>
                <PerfectScrollbar >
                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                            	{/*<img className="img-circle elevation-2" src={chets} alt="user_image" />*/}
                                <AccountCircleIcon className="userIcon"/>
                            </div>
                            <div className={"info" +" "+ (this.props.sideBar ? 'hide' : 'Show')}>
                                <span className="d-block text-capitalize userName">{userName}</span>
                            </div>
                            <span className="close_sideHeader d-lg-none">
    							<FontAwesomeIcon icon={faTimes} className="text-muted" onClick={this.props.mobileBarClick}/>
    						</span>
                        </div>
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item has-treeview menu-open">
                                    <div href="#" className="nav-link bg-white text-white">
                                        <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon text-dark" />
                                        <p className={this.props.sideBar ? 'hide' : 'inlineShow'}>
                                           <Link to="/">Dashboard</Link>
                                        </p>
                                    </div>
                                </li>
                                <li className="nav-item has-treeview">
                                    <a className="nav-link text-white" onClick={()=>this.setState({leadShow : !this.state.leadShow})}>
                                        <FontAwesomeIcon icon={faPlusSquare} className="nav-icon" />
                                        <p className= {this.props.sideBar ? 'hide' : 'inlineShow'}>
                                                Leads
                                            <FontAwesomeIcon icon={this.state.leadShow ? faAngleDown : faAngleLeft} className="right leftAngleIcon" />
                                            {/*<span className="badge badge-danger right">New</span>*/}
                                        </p>
                                    </a>
                                    {this.props.sideBar ? ''
                                        : 
                                        <ul className={"nav nav-treeview"+" "+ (this.state.leadShow ? 'show' : 'hide')}>
                                            <li className="nav-item">
                                                <Link to="/leads/all" className={"nav-link"+" "+(this.props.leadInfo === 'all' ? 'active' : '')}>
                                                    <FontAwesomeIcon icon={faCircle} className="text-white nav-icon" />
                                                    <p>All Leads</p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/leads/new" className={"nav-link"+" "+(this.props.leadInfo === 'new' ? 'active' : '')}>
                                                    <FontAwesomeIcon icon={faCircle} className="text-white nav-icon" />
                                                    <p>New Leads</p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/leads/booked" className={"nav-link"+" "+(this.props.leadInfo === 'booked' ? 'active' : '')}>
                                                    <FontAwesomeIcon icon={faCircle} className="text-white nav-icon" />
                                                    <p>Booked Leads</p>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/leads/closed" className={"nav-link"+" "+(this.props.leadInfo === 'closed' ? 'active' : '')}>
                                                    <FontAwesomeIcon icon={faCircle} className="text-white nav-icon" />
                                                    <p>Closed Leads</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    }    
                                </li>
                                <li className="nav-item">
                                    <Link to="/projects" className="nav-link text-white">
                                        <FontAwesomeIcon icon={faBuilding} className="nav-icon text-white" />
                                        <p className= {this.props.sideBar ? 'hide' : 'inlineShow'}>
                                            Projects
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" onClick={this.logout}>
                                        <FontAwesomeIcon icon={faPowerOff} className="nav-icon text-danger" />
                                        <p className= {this.props.sideBar ? 'hide' : 'inlineShow'}>
                                            Log Out
                                        </p>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </PerfectScrollbar>
            </aside>                	

		);
	};
};	

export default withRouter(SideBar);
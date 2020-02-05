import React, {Component} from "react";

class Footer extends Component {

	render(){

		return(
			<footer className={"main-footer" +" "+(this.props.expand ? 'main-header-collapsed' : '')}>
                <strong>Copyright &copy; 2019-2020 <a className="text-success">Homesfy</a>.</strong>
                All rights reserved.
                <div className="float-right d-none d-sm-inline-block">
                    <b>Version</b> 1.0.0
                </div>
            </footer>
		);
	};
};		

export default Footer;
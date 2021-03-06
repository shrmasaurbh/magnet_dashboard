import React, {Component} from "react";
import SweetAlert from "../../component/common/sweetAlert/sweetAlertSuccess.js";
import SweetCancel from "../../component/common/sweetAlert/sweetAlertCancel.js";
import BootModal from "../../component/common/modal/modal.js";

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sweetShow: false,
            sweetShowCancel: false,
            modalShow: false,
        };
    }

    handleSweet=()=>{
        this.setState({sweetShow : !this.state.sweetShow});
    }

     handleSweetCancel=()=>{
        this.setState({sweetShowCancel : !this.state.sweetShowCancel});
    }

     handleModal=()=>{
        this.setState({modalShow : !this.state.modalShow});
    }


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
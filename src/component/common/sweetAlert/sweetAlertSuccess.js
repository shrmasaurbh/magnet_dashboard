import React, { Component } from 'react';
// import { renderToStaticMarkup } from 'react-dom/server';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';
import Aux from "../../../utils/Aux/aux.js";

class sweetAlert extends Component {

	// constructor(props){
	// 	super(props);
	// 	this.state = {
	//       sweetShow: false,
	// 	};
	// };

	// onOutsideClick={this.props.changeSweet} ===== For Making the alert hide onClick out Side.
   // onCancel={this.props.changeSweet}
                  // showCancelButton

	render(){
		console.log("this.props.showXXXXXXXXXXXX",this.props);
		// console.log("this.props.Sweetshow",this.props.changeSweet);

		return(

			<Aux>
				<SweetAlert
		          type={this.props.type}
		          show={this.props.show}
		          title={this.props.type}
		          html
		          text={this.props.title}
		          onConfirm={this.props.changeSweet}
		          confirmButtonColor="#a5dc85"
		        />	
			</Aux>

		);
	};

};

export default sweetAlert;
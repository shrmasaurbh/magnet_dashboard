import React, { Component } from "react";
import HomesLoader from "../../../assets/image/homesfyLoader.gif";

class Loading extends Component {
  render() {
    var html = "";

    if (this.props.show) {
      html = (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: "10000000",
            backgroundColor: "#ffffff",
            top: "0px",
            left: "0px"
          }}
        >
          <div
            className="d-flex justify-content-center"
            style={{ height: "inherit" }}
          >
            <div style={{width: "100%", height: "100%",position: "absolute",top: "12em",right:"0px",left:"0px",textAlign:"center",margin:"0 auto"}}>
              <img style={{width: "280px",}} src={HomesLoader} />
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    }

    return html;
  }
}

export default Loading;

import React, {Component} from 'react';
import Aux from "../../utils/Aux/aux.js";


class FileUpload extends Component {
    render() {
        return (
            <Aux>
	            <div className="card">
	            	<form role="form">
						<div className="card-body">
							<div className="row">
								<div className="col-md-12 col-12">
									<div className="form-group">
										<label >File input</label>
										<div className="input-group">
											<div className="custom-file">
												<input type="file" className="custom-file-input" id="exampleInputFile" />
												<label className="custom-file-label">Choose file</label>
											</div>
											<div className="input-group-append">
												<span className="input-group-text" id="">Upload</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
	            </div>	
            </Aux>
        );
    };
};

export default FileUpload;     

import React from "react";
import { Route, Switch, withRouter} from "react-router-dom";
import { PrivateRoute } from "./privateRouter";

import Login from "../pages/login/login";
import Dashboard from "../pages/dashboard/dashboard";
import Forget from "../pages/forget/forget";
import ResetPass from "../pages/reset-password/reset_pass";
import ChangePass from "../pages/reset-password/reset_pass";
import magnetList from "../pages/magnetList/list";
import Projects from "../pages/project/projectList";
import NotFoundComponent from "../static/404.js"

export const Routes = () => {

			// <PrivateRoute exact path="/leads" component={withRouter(magnetList)} />
	return (

		<Switch>

			<Route exact path="/login" component={withRouter(Login)} />
			<PrivateRoute exact path="/" component={withRouter(Dashboard)} />
			<PrivateRoute exact path="/projects" component={withRouter(Projects)} />
			<PrivateRoute exact path="/leads/:leadType" component={magnetList} />
			<Route exact path="/forget_password" component={withRouter(Forget)} />
			<Route exact path="/reset_password" component={withRouter(ResetPass)} />
			<Route exact path="/change_password" component={withRouter(ChangePass)} />
      			<Route component={NotFoundComponent} />
		</Switch>
	);

};	

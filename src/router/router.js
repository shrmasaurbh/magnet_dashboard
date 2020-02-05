import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../pages/login/login.js";
import Dashboard from "../pages/dashboard/dashboard.js";
import Forget from "../pages/forget/forget.js";
import ResetPass from "../pages/reset-password/reset_pass.js";
import magnetList from "../pages/magnetList/list.js"
import NotFoundComponent from "../static/404.js"

export const Routes = () => {

	return (

		<Switch>

			<Route exact path="/" component={Login} />
			<Route exact path="/dashboard" component={Dashboard} />
			<Route exact path="/list" component={magnetList} />
			<Route exact path="/forget-password" component={Forget} />
			<Route exact path="/reset-password" component={ResetPass} />
      		<Route component={NotFoundComponent} />
		</Switch>
	);

};	
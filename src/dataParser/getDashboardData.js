import {get} from "../utils/methods.js";

export const getDashboardData = async () =>{
	// console.log("valuexxxxxxxxxxxx",value);

	let getDashboard = await get('/dashboard/counts')
	console.log('getDashboard ===>', getDashboard);
	return  getDashboard;
}

import {get} from "../utils/methods.js";

export const getLeadStatusData = async () =>{
	// console.log("valuexxxxxxxxxxxx",value);

	let getLeadStatus = await get('/dashboard/counts')
	console.log('getLeadStatus ===>', getLeadStatus);
	return  getLeadStatus;
}

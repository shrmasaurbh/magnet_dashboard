import {get} from "../utils/methods.js";

export const getLeadStatusData = async () =>{
	// console.log("valuexxxxxxxxxxxx",value);

	let getLeadStatus = await get('/lead_status/clienttype/list')
	console.log('getLeadStatus ===>', getLeadStatus);
	return  getLeadStatus;
}

export const getLeadSourceData = async () =>{
	// console.log("valuexxxxxxxxxxxx",value);

	let getLeadSource = await get('/sources/list')
	console.log('getLeadSource ===>', getLeadSource);
	return  getLeadSource;
}

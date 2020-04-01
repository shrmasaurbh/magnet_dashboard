import {get, post} from "../utils/methods.js";

export const getListData = async (value) => {
	console.log("the in the parser value",value.name);
	console.log("the in the parser value",value.data);

	if(value.size == undefined && value.size == null){
		value.size = 10;
	}

	if(value.pageId == undefined && value.pageId == null){
		value.pageId = 1;
	}

	if(value.name === 'all'){
		console.log("in the allllllll",value.name);
		let listData = await post('/leads/list',value.data)
		console.log('loginData ===>', listData);
		return  listData;
	}
	else if(value.name === 'new'){
		console.log("in the newwwwwwwwww",value.name);
		let listData = await post('/leads/list/status/new',value.data)
		console.log('loginData ===>', listData);
		return  listData;
	}
	else if(value.name === 'assigned'){
		console.log("in the assignedddddddd",value.name);
		let listData = await post('/leads/list/status/assigned',value.data)
		console.log('loginData ===>', listData);
		return  listData;
	}
	else if(value.name === 'booked'){
		console.log("in the bookeddddddd",value.name);
		let listData = await post('/leads/list/status/booked',value.data)
		console.log('loginData ===>', listData);
		return  listData;
	}
	else if(value.name === 'closed'){
		console.log("in the closeddddddd",value.name);
		let listData = await post('/leads/list/status/closed',value.data)
		console.log('loginData ===>', listData);
		return  listData;
	}
	else if(value.name === 'cancel'){
		console.log("in the cancellllllll",value.name);
		let listData = await post('/leads/list/status/cancel',value.data)
		console.log('loginData ===>', listData);
		return  listData;
	}
	else if(value.name === 'open'){
		console.log("in the opennnnnnn",value.name);
		let listData = await post('/leads/list/status/open',value.data)
		console.log('loginData ===>', listData);
		return  listData;
	}
	else if(value.name === 'autoassigned'){
		console.log("in the autoassignedddd",value.name);
		// let listData = await post('/leads/list',value.data)
		// console.log('loginData ===>', listData);
		// return  listData;
	}

}

export const getFullLeadData = async (value) =>{

	console.log(value);
	let fullListData = await get('/leads/details/'+value.toString())
	console.log('loginData ===>', fullListData);
	return  fullListData;

}

export const getAddLeadData = async (value) =>{

	console.log(value);
	let AddLeadData = await post('/leads/add',value)
	console.log('loginData ===>', AddLeadData);
	return  AddLeadData;

}

export const getCommentData = async (value) =>{

	console.log("valuee============>",value);

	let commentData = await post('/comments/'+value.id, value.data)
	console.log("commentData============>",commentData);
	return  commentData;

}

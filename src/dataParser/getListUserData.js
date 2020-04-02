import {get, post} from "../utils/methods.js";

export const getUserListData = async (value) =>{
	console.log("valuexxxxxxxxxxxx",value);

	let getUserList = await get('/users/autocomplete?q='+value)
	console.log('getUserList ===>', getUserList);
	return  getUserList;
}



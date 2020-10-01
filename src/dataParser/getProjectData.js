import {get, post, patch} from "../utils/methods.js";

export const getAllProjectData = async (value) => {	
	return await post('/projects/list',value)
}

export const addProject = async (value) =>{
	return await post('/projects/add',value)
	
} 

export const updateProject = async (value) =>{
	return await patch('/projects/'+value.id.toString(), value.value)
	
} 

export const getProjectDetail = async (value) =>{
	console.log("valuexxxxxxxxxxxx",value);

	let getAutoProjectData = await get('/projects/'+value.toString())
	console.log('getAutoProjectData ===>', getAutoProjectData);
	return  getAutoProjectData;
}

export const getAutoCompleteProject = async (value) =>{
	console.log("valuexxxxxxxxxxxx",value);

	let getAutoProjectData = await get('/projects/autocomplete?q='+value)
	console.log('getAutoProjectData ===>', getAutoProjectData);
	return  getAutoProjectData;
}

export const getRegion = async () =>{

	let value = null;

	let getRegionData = await get('/regions/list',value)
	console.log('getRegionData ===>', getRegionData);
	return  getRegionData;
}

// export const getChangePwdRes = async (value) => {
	
// 	console.log("the in the parser value");
// 	let changepwData = await patch('/auth/change_password',value)
// 	console.log('changepwData ===>', changepwData);
// 	return  changepwData;

// }


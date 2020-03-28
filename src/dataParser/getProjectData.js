import {get, post, patch} from "../utils/methods.js";

export const getAllProjectData = async (value) => {
	console.log("valuexxxxxxxxxxxx");
	console.log(value);
	
	let allProjectData = await post('/projects/list',value)
	console.log('allProjectData ===>', allProjectData);
	return  allProjectData;

}

export const addProject = async (value) =>{

	console.log("valuexxxxxxxxxxxx",value);

	let addProjectData = await post('/projects/add',value)
	console.log('addProjectData ===>', addProjectData);
	return  addProjectData;
} 

export const updateProject = async (value) =>{

	console.log("valuexxxxxxxxxxxx",value);
	console.log("valuexxxxxxxxxxxx",value.id);

	let updateProjectData = await patch('/projects/'+value.id.toString(), value.value)
	console.log('updateProjectData ===>', updateProjectData);
	return  updateProjectData;
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


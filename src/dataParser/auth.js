import {get, post, patch} from "../utils/methods.js";

export const getAdminData = async (value) => {
	
	console.log(value);
	let loginData = await post('/auth/login',value)
	console.log('loginData ===>', loginData);
	return  loginData;

}

export const getLogout = async () =>{

	var value = null;	

	let logOutData = await get('/auth/logout',value)
	console.log('loginData ===>', logOutData);
	return  logOutData;
} 


export const getFrogetPwd = async (value) => {
	
	console.log("the in the parser value");
	let forgetpwData = await post('/auth/forgot_password',value)
	console.log('forgetpwData ===>', forgetpwData);
	return  forgetpwData;

}

export const getChangePwdRes = async (value) => {
	
	console.log("the in the parser value");
	let changepwData = await patch('/auth/change_password',value)
	console.log('changepwData ===>', changepwData);
	return  changepwData;

}

// export const getSliderData = async (value)=>{
// 	var params ={
// 		"section":value
// 	}
// 	let sliderData = await get('/sectionlist',params)
	
// 	// console.log('loginData ===>', sliderData);
// 	return  sliderData

// }
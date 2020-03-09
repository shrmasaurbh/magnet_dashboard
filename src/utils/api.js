import axios from 'axios';
import {APP_URL,CORE_API_URL} from "./constants";

export default axios.create({
  baseURL: CORE_API_URL
});

export const getToken = () =>{

	var homesfy_lg =(localStorage.getItem("homesfy_lg"));
	 if(homesfy_lg && homesfy_lg !== ""){
        let user = JSON.parse(window.atob(homesfy_lg));
        let token = {token: "bearer "+ user.token};

        return token;
    }else{
        let token = {token: ''};
        return token;
    }
}

// axios.interceptors.request.use(config => {
//   // log a message before any HTTP request is sent
//   console.log('Request was sent');

//   return config;
// });

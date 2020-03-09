import axios from 'axios';
import API from './api';
import {getToken} from './api';


const tokenData = getToken();

const urlOrigin = window.location.origin;
const urlHref = window.location.href;
let urlVal = urlHref.substr(urlOrigin.length, 5);


if(urlVal == "/login" || urlVal == "/forget-password" || urlVal == "/reset-password" || urlVal == "/register"){

    var headers = {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin':'*'
    }

}else {
    var headers = {
      'Content-Type': 'application/json',
      // 'Authorization': tokenData.token ,
      // 'Access-Control-Allow-Origin':'*'
    }
}


export const get = async (url,options) =>{
    console.log(headers);
    console.log(url);

    if(options == null || options == ''){
        console.log("in the ooooooooooooooooo");
        // let res = await API.get(url,{headers : headers});
        // return res;
        return await API.get(url, {headers : headers})
                  .then(response => { 
                    return response.data;
                  })
                  .catch(error => {
                      console.log("in the errroroorro");
                      console.log(error.response)
                      return error.response.data;
                  });
    }
    else{
        let res = await API.get(url,{params:options},{headers : headers});
        
        if(res != null){
            return res.data;
        }else{
            console.log("in the erreo")
            let errorRes = "No data found";
            return errorRes;
        }
    }

}

export const post = async (url, options) => {

    console.log("===========in the method Callllllll")
    console.log(options);

      if(options == null && options == ''){

          let errorRes = "Data field is empty";
          return errorRes

      }else{
       return await API.post(url, options,{headers : headers})
                  .then(response => { 
                    return response.data;
                  })
                  .catch(error => {
                      console.log("in the errroroorro");
                      console.log(error.response)
                      return error.response.data;
                  });
      }
  // } catch (e) {
  //   console.log('😱 Axios request failed: ${e}',e);
  // }

};

export const patch = async (url, options) => {

      if(options == null && options == ''){

          let errorRes = "Data field is empty";
          return errorRes

      }else{
       return await API.patch(url, options, {headers : headers})
                  .then(response => { 
                    return response.data;
                  })
                  .catch(error => {
                      console.log("in the errroroorro");
                      console.log(error)
                      // return error.response.data;
                  });
      }
  // } catch (e) {
  //   console.log('😱 Axios request failed: ${e}',e);
  // }

};



const accessToken = () => {
  if (localStorage.getItem("homesfy_lg")) {
    return JSON.parse(window.atob(localStorage.getItem("homesfy_lg")));
  }
};

const isTokenValid = (status,message) => {
  if (
    (status === 400 && message === "Token Not Found") ||
    (status === 401 && message === "Authentication error")
  ) {
    window.localStorage.clear();
    window.location = "/";
  }

  return true;
};

const sendResponse = (res) => {
  if (isTokenValid(res.meta.status,res.meta.message)) {
    return res;
  }
};

// export const get = async url => {
//   let headers = new Headers({
//     "Content-Type": "application/json",
//     Accept: "*/*",
//     access_token: accessToken()
//   });

//   var request = new Request(url, {
//     method: "GET",
//     headers: headers
//   });

//   return fetch(request).then(stream =>
//     stream.json().then(res => {
//       return sendResponse(stream, res);
//     })
//   );
// };

// export const post = async (url, options) => {
//   console.log(process.env.REACT_APP_CORE_API_URL);
//   console.log(process.env.REACT_APP_URL);
//   const headers = {
//     "Content-Type": "application/json",
//   };
//   // const headers = {
//   //   "Content-Type": "application/json",
//   //   "Authorization": "bearer "+accessToken(),
//   // };

//   console.log("2nd page");
//   // try{
//     let res = await API.post('auth/login', options.body, { headers: headers });
//     console.log("res",res);
//     return sendResponse(res);

//   // } catch (e) {
//   //   console.log('😱 Axios request failed: ${e}',e);
//   // }

// };

export const put = (url, options) => {
  options.method = "PUT";
  options.headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
    access_token: accessToken()
  };

  return fetch(url, options).then(stream =>
    stream.json().then(res => {
      return sendResponse(stream, res);
    })
  );
};

export const Delete = url => {
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "*/*",
    access_token: accessToken()
  });

  var request = new Request(url, {
    method: "DELETE",
    headers: headers
  });

  return fetch(request).then(stream =>
    stream.json().then(res => {
      return sendResponse(stream, res);
    })
  );
};

export const FileUpload = (url, options) => {
  options.method = "POST";
  options.headers = {
    Accept: "*/*",
    access_token: accessToken()
  };

  return fetch(url, options).then(stream =>
    stream.json().then(res => {
      return sendResponse(stream, res);
    })
  );
};

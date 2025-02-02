import axios from "axios";

const loginService=(inputValues)=>{

  const axiosResponce = axios.post("http://localhost:8080/users/login", inputValues, {
      withCredentials:true, // this will send cookies to the backend.
      headers: { "Content-Type": "application/json" }, // Fix header case (should be lowercase 'application/json')
    })
    .then((response) => {
      window.localStorage.setItem("user", JSON.stringify(response.data)); // Store user data in local storage
 
     return response.data
    })
    .catch((error) => {
       return error?.response?.data
    });
    return axiosResponce;

}

const authServices = {loginService};

export default authServices;
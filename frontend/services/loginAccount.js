import axios from "axios";
import {toast} from "react-toastify";
import actionCreator from "./actionCreator.js";

export const loginAccount = async(obj) => {
    try {
        const {email,password} = obj;
        const response = await axios.post('http://localhost:8000/auth/login' , {email,password});
        const {username,admin_role,email_verified,wallet} = await response.data;
        const resobj = {username,email,admin_role,email_verified,wallet}
        toast.success('Successfully login');
        sessionStorage.setItem('auth',JSON.stringify(resobj));
        return resobj;
    }
    catch (e) {
        toast.error(e.response.data)
    }
}
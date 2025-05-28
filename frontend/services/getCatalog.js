import axios from "axios";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";

export const getCatalog = async () => {
    try{
        const response = await axios.get('http://localhost:8000/market/catalog');
        return response.data;
    }catch (e) {
        throw e.response.data;
    }
}
export const getAdminCatalog = async (username) => {
    try{
        const response = await axios.get(`http://localhost:8000/market/admin/${username}`);
        return response.data;
    }catch (e) {
        throw e.response.data;
    }
}
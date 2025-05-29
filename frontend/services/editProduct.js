import axios from "axios";

export const editProduct = async (obj) => {
    try {
        const response = await axios.put('http://localhost:8000/market/edit',obj);
        return response.data;
    }catch (e) {
        throw e.message;
    }
}
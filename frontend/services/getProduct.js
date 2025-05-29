import axios from "axios";

export const getProduct = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8000/market/product/${id}`);
        const data = response.data;
        return data;
    }catch (e) {
        throw e.message;
    }
}
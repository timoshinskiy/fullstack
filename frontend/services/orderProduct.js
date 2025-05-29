import axios from "axios";

export const orderProduct = async (product_id,email) => {
    try{
        const response = await axios.put('http://localhost:8000/market/product/order',{id: product_id, email});
        const data = response.data;
        return data;
    }catch (e) {
        throw e.message
    }
}
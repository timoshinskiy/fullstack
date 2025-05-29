import axios from "axios";

export const getBasket = async (email) => {
    try{
        const response = await axios.get(`http://localhost:8000/market/basket/${email}`);
        const data = await response.data;
        return data;
    }catch (e) {
        throw e.message
    }

}
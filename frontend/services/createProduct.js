import axios from "axios";

export const createProduct = async (obj) => {
    try{
        for(let key in obj){
            if(!obj[key]){
                throw new Error('Bad inputs!');
            }
        }
        const response = await axios.post('http://localhost:8000/market/add',obj);
        const data = response.data;
        return data
    }catch (e) {
        throw e.message;
    }
}
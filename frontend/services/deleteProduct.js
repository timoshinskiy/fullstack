import axios from "axios";

export const deleteProduct = async (id) => {
  try{
      const response = await axios.put('http://localhost:8000/market/remove',{id});
      const data = response.data;
      return data;
  }catch (e) {
      throw e.message;
  }
}
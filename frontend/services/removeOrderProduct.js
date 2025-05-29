import axios from "axios";

export const removeOrderProduct = async (id) => {
  try{
      const response = await axios.put('http://localhost:8000/market/product/unorder',{id});
      const data = response.data;
      return data;
  }catch (e) {
      throw e.message;
  }
}
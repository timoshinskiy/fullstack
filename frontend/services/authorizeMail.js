import axios from "axios";
import {toast} from "react-toastify";

export const sendMail = async () => {
    try {
        const response = await axios.post('http://localhost:8000/auth/sendmail', {
            email: 'nikitosmorozik@gmail.com',
        })
        toast(response);
    } catch (e) {
        toast.error(e.message);
    }

}
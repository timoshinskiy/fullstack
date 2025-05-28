import React, {useState} from 'react';
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";

const Authorize = () => {
    const [reg,setReg] = useState(false);
    return (
        <>
            <div className={"authorize-elems"}>
                {reg===true?<Register setReg={setReg} />:<Login setReg={setReg} />}
            </div>
        </>
    );
};

export default Authorize;
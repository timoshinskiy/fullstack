import React, {useState} from 'react';
import {registerAccount} from "../services/registerAccount.js";
import {useDispatch} from "react-redux";
import actionCreator from "../services/actionCreator.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";

const Register = (props) => {
    const [inputObj,setInputObj]=useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputs = 'email password username'.split(' ');
    const tryRegister = async () => {
        for (let key in inputObj){
            if(inputObj[key].length<6){
                toast.error('Bad inout of '+key);
                return ;
            }
            if(key === 'email' && !inputObj[key].match(/[@.]/)){
                toast.error('Email are not real!');
                return ;
            }
        }

        await registerAccount(inputObj);
        let enterDataObj = {username:inputObj.username,email:inputObj.email}
        dispatch(actionCreator.login(enterDataObj));
        navigate('/');
    }
    return (
        <div className={'auth-container'}>
            <h2>Register</h2>
            <div className="auth-inputs">
                {inputs.map(item => (
                    <div>
                        <label>Enter your {item}</label>
                        <input type={item === 'password' ? item : 'text'} name={item} value={inputObj[item]}
                               onChange={(e) => setInputObj({...inputObj, [e.target.name]: e.target.value})}/>
                    </div>
                ))}
                <button className={"auth-button"} onClick={tryRegister}>Register</button>
                <div style={{display:"flex",flexDirection:"row"}}>If you already have account you can <button onClick={()=>props.setReg(false)}>Login</button></div>
            </div>
        </div>
    );
};

export default Register;
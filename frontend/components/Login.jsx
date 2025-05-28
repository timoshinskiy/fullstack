import React, {useState} from 'react';
import {toast} from "react-toastify";
import {loginAccount} from "../services/loginAccount.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import actionCreator from "../services/actionCreator.js";

const Login = (props) => {
    const [inputObj, setInputObj] = useState({});
    const inputs = ['email', 'password'];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tryLogin = async()=>{
        if(!inputObj.email.match(/[@.]/g)){
            toast.error('Bad email!');
            return ;
        }
        for(let key in inputObj){
            if(inputObj[key].length<6){
                toast.error('Inputs must be correct!');
                return ;
            }
        }
        try{
            const data = await loginAccount(inputObj);
            dispatch(actionCreator.login({...data}));
            navigate('/');
        }catch (e) {
            toast.error(e);
        }
    }
    return (
        <div className={'auth-container'}>
            <h2>Login</h2>
            <div className="auth-inputs">
                {inputs.map((item,ind) => (
                    <div key={ind}>
                        <label>Enter your {item}</label>
                        <input type={item === 'password' ? item : 'text'} name={item} value={inputObj[item]}
                               onChange={(e) => setInputObj({...inputObj, [e.target.name]: e.target.value})}/>
                    </div>
                ))}
                <button className={"auth-button"} onClick={tryLogin}>Login</button>
            <div style={{display:"flex",flexDirection:"row"}}>You don't have account? <button onClick={()=>props.setReg(true)}>Register</button></div>
        </div>
        </div>
    );
};

export default Login;
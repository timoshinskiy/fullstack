import React, {useEffect, useState} from 'react';
import ProfileInfo from "../components/ProfileInfo.jsx";
import EditPassword from "../components/EditPassword.jsx";
import EditUsername from "../components/EditUsername.jsx";
import {useDispatch, useSelector} from "react-redux";
import actionCreator from "../services/actionCreator.js";
import {useNavigate} from "react-router";

const Profile = () => {
    const opens = {
        info: <ProfileInfo/>,
        name: <EditUsername/>,
        pass: <EditPassword/>,
    }
    const [select,setSelect] = useState('info');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {auth} = useSelector(state=>state.user);
    const logout = () => {
        dispatch(actionCreator.logout());
        navigate('/');
    }
    useEffect(()=>{
        if(auth===false)
            navigate('/');
    },[]);
    return (
        <div className={"page"}>
            <div className="profile-head">
                <main>
                    {opens[select]}
                </main>
                <nav>
                    <button className={select==='info'?'active':''} onClick={()=>setSelect('info')}>Profile info</button>
                    <button className={select==='name'?'active':''} onClick={()=>setSelect('name')}>Edit username</button>
                    <button className={select==='pass'?'active':''} onClick={()=>setSelect('pass')}>Edit password</button>
                    <button onClick={logout}>Logout</button>
                </nav>
            </div>
        </div>
    );
};

export default Profile;
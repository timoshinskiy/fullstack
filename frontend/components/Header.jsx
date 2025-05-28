import React from 'react';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const {user} = useSelector(state=>state);
    return (
        <>
            <div className={"header-container"}>
                <div className={"header-content"}>
                    <div className={"header-logo"} onClick={()=>navigate('/')} style={{cursor: 'default'}}>Logo</div>
                    <div className={"header-items"}>
                        <button onClick={()=>navigate('/marketplace')}>Shop</button>
                        {
                            user.auth===true?
                                <button onClick={()=>navigate('/profile')}>{user.username}</button>
                                :
                                <button onClick={()=>navigate('/auth')}>Sign in</button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
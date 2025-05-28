import {useEffect, useState} from 'react'
import './App.css'
import {toast, ToastContainer} from "react-toastify";
import {BrowserRouter, Route, Routes} from "react-router";
import {publicRoutes} from "../store/routes.js";
import Header from "../components/Header.jsx";
import {useDispatch, useSelector} from "react-redux";
import actionCreator from "../services/actionCreator.js";

const App = () => {
    let {auth} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const data = JSON.parse(sessionStorage.getItem('auth'));
    useEffect(() => {
        if (data){
            auth=true;
            dispatch(actionCreator.login(data));
        }
    }, [])
    return (
        <>

                <Header/>
                <ToastContainer/>
                <Routes>
                    {
                        publicRoutes.map(item => (
                            <Route path={item.path} element={item.element()}/>
                        ))}
                </Routes>
        </>
    )
}

export default App

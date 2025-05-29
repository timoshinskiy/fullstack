import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Modal from "./Modal.jsx";
import {getProduct} from "../services/getProduct.js";
import {toast} from "react-toastify";
import {editProduct} from "../services/editProduct.js";
import actionCreator from "../services/actionCreator.js";

const EditProduct = (props) => {
    const defaultProduct = {
        id: 0,
        name: '',
        description: '',
        full_description: '',
        price: ''
    };
    const [inputObj,setInputObj] = useState({...defaultProduct});
    const inputs = 'name description price'.split(' ');
    const dispatch = useDispatch();
    const [product,setProduct] = useState({...defaultProduct});
    useEffect(()=>{
        getProduct(props.id).then(res=>{
            setProduct({...res});
        }).catch(e=>toast.error(e));
    },[]);
    useEffect(()=>setInputObj({...product}),[product])
    const tryEdit = () => {
        editProduct(inputObj).then((res)=>{
            toast.success(res);
            setInputObj({...defaultProduct});
            props.setOpen(false);
            dispatch(actionCreator.editProduct(inputObj));
        }).catch(e=>toast.error(e));
    }
    return (
        <Modal setOpen={props.setOpen}>
            {
                inputs.map(item => (
                    <div className="create-input-box">
                        <label>Enter {item.replace('_', ' ')} of new product</label>
                        <input type="text" placeholder={'enter'} value={inputObj[item]}
                               onChange={(e) => setInputObj({...inputObj, [item]: e.target.value})}/>
                    </div>
                ))
            }
            <div className="create-input-box">
                <label>Enter full description of new product</label>
                <textarea style={{
                    height: '8vh',
                    resize: 'none',
                    maxHeight: '8vh',
                    fontSize: '19px',
                    color: 'darkblue'
                }} value={inputObj.full_description}
                          onChange={(e) => setInputObj({...inputObj, full_description: e.target.value})}/>
            </div>
            <button onClick={tryEdit}>Save edit</button>
        </Modal>
    );
};

export default EditProduct;
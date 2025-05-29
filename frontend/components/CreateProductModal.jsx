import React, {useState} from 'react';
import Modal from "./Modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createProduct} from "../services/createProduct.js";
import {toast} from "react-toastify";
import actionCreator from "../services/actionCreator.js";

const CreateProductModal = (props) => {
    const {user} = useSelector(state => state);
    const dispatch = useDispatch();
    const defaultInput = {
        name: '',
        description: '',
        full_description: '',
        price: '0',
    }
    const tryCreate = async () => {
        const resObj = {...inputObj, creator: user.username, price: Number(inputObj.price)}
        console.log(resObj);
        createProduct(resObj).then(res => {
            toast(res);
            dispatch(actionCreator.addProduct(resObj));
            props.setOpen(false);
        }).catch(e => toast.error(e));
    }
    const [inputObj, setInputObj] = useState({});
    const inputs = 'name description price'.split(' ');
    return (
        <Modal setOpen={props.setOpen}>
            <h2>Create product</h2>
            {
                inputs.map(item => (
                    <div className="create-input-box">
                        <label>Enter {item.replace('_', ' ')} of new product</label>
                        <input type={item === 'price' ? 'number' : 'text'} placeholder={'enter'} value={inputObj[item]}
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
            <div className="create-buttons">
                <button className={'active-button'} onClick={tryCreate}>Create</button>
                <button onClick={() => setInputObj({...defaultInput})}>reset</button>
            </div>
        </Modal>
    );
};

export default CreateProductModal;
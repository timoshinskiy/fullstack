import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getBasket} from "../services/getBasket.js";
import {toast} from "react-toastify";
import actionCreator from "../services/actionCreator.js";
import {useNavigate} from "react-router";
import {removeOrderProduct} from "../services/removeOrderProduct.js";

const Basket = () => {
    let basket = useSelector(state=>state.basket.products);
    const [products,setProducts] = useState([]);
    const [amount,setAmount] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state);
    useEffect(()=>{
        getBasket(user.email).then(res=>{
            let prices = res.map(item=>item.price).reduce((acc,cur)=>acc+cur,0);
            setAmount(prices);
            dispatch(actionCreator.loadBasket(amount,res));
        }).catch(e=>toast.error(e))
    },[]);
    const removeFromBasket = (id) => {
        removeOrderProduct(id).then(res=>{
            toast.success("Removed !");
            dispatch(actionCreator.removeFromBasket(id));
        }).catch(e=>toast.error(e));
    }
    return (
        <div>
            <h2>Total price: {amount}</h2>
            <button>BUY ALL</button>
            <button>CLEAR ALL</button>
            <div className="basket-list">
                {basket.map(item=>(
                    <div className="basket-item">
                        <h3>{item.name}</h3>
                        <h3>{item.price}</h3>
                        <div className="basket-item-buttons">
                            <button>Buy</button>
                            <button onClick={()=>removeFromBasket(item.id)}>Remove from basket</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Basket;
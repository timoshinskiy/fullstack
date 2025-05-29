import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAdminCatalog, getCatalog} from "../services/getCatalog.js";
import actionCreator from "../services/actionCreator.js";
import CreateProductModal from "../components/CreateProductModal.jsx";
import {toast} from "react-toastify";
import EditProduct from "../components/EditProduct.jsx";
import {orderProduct} from "../services/orderProduct.js";
import {removeOrderProduct} from "../services/removeOrderProduct.js";
import {deleteProduct} from "../services/deleteProduct.js";

const Catalog = () => {

    let {user} = useSelector(state => state);

    const [openedProductId, setOpenedProductId] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const dispatch = useDispatch();
    const [openCreate, setOpenCreate] = useState(false);

    const load = () => {
        if (user.admin_role === true) {
            getAdminCatalog(user.username).then(res => {
                dispatch(actionCreator.loadProducts(res))
            }).catch(err => err);
        } else if(user.admin_role === false) {
            getCatalog().then(res => {
                dispatch(actionCreator.loadProducts(res))
            }).catch(err => err);}
    }

    useEffect(() => {
        load();
    }, []);
    let {products} = useSelector(state => state.catalog);

    const createOrder = (id) => {
        orderProduct(id, user.email).then(res => {
            toast.success(res);
            dispatch(actionCreator.orderProduct(id, user.email));
        }).catch(e => toast.error(e))
    }


    const removeOrder = (id) => {
        removeOrderProduct(id).then(res=>{
            toast.success(res);
            dispatch(actionCreator.unorderProduct(id));
        }).catch(e=>toast.error(e));
    }

    const deleteProd = (id) => {
        deleteProduct(id).then(res=>{
            toast.success(res);
            dispatch(actionCreator.deleteProduct(id));
        }).catch(e=>toast.error(e));
    }


    return (
        <>
            {openCreate === true && <CreateProductModal setOpen={setOpenCreate}/>}
            {openEdit === true && <EditProduct setOpen={setOpenEdit} id={openedProductId}/>}
            <div className={'page'}>
                <div className={'catalog-head'}>
                    <h1>Catalog</h1>
                    {user.admin_role === true && <button onClick={() => setOpenCreate(true)}>Add product</button>}
                </div>
                <div className={'catalog-container'}>
                    {
                        products.length !== null && products.map(item => (
                            <div key={item.id} className="catalog-item">
                                <h3 style={{margin: "0"}}>{item.name}</h3>
                                <h4 style={{margin: "0"}}>{item.description}</h4>
                                <h4 style={{margin: "0"}}>{item.price}</h4>
                                <div className="product_buttons">
                                    {user.admin_role === true && <button onClick={() => {
                                        setOpenedProductId(item.id);
                                        setOpenEdit(true);
                                    }}>Edit product</button>}
                                    {item.ordered === true ?
                                        item.orders_email === user.email ?
                                            <button onClick={() => removeOrder(item.id)}>Remove from orders</button>
                                            :
                                            <h4>{item.orders_email} ordered this product</h4>
                                        : user.auth === true && user.admin_role !== true &&
                                        <button onClick={() => createOrder(item.id)}>Order product</button>}
                                    {user.admin_role === true && <button onClick={()=>deleteProd(item.id)}>Delete product</button>}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Catalog;
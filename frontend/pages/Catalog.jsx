import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAdminCatalog, getCatalog} from "../services/getCatalog.js";
import actionCreator from "../services/actionCreator.js";
import CreateProductModal from "../components/CreateProductModal.jsx";
import {toast} from "react-toastify";

const Catalog = () => {
    const {products} = useSelector(state=>state.catalog);
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state);
    const [openCreate,setOpenCreate] = useState(false)
    useEffect(()=>{
        if(user.admin_role===true){
            getAdminCatalog(user.username).then(res=>{
                dispatch(actionCreator.loadProducts(res))
            }).catch(err=>err);
        }
        else{
            getCatalog().then(res=>{
                dispatch(actionCreator.loadProducts(res))
            }).catch(err=>err);
        }
    },[]);
    return (
        <>
            {openCreate===true&&<CreateProductModal setOpen={setOpenCreate}/>}
            <div className={'page'}>
                <div className={'catalog-head'}>
                    <h1>Catalog</h1>
                    {user.admin_role===true&&<button onClick={()=>setOpenCreate(true)}>Add product</button>}
                </div>
                <div className={'catalog-container'}>
                    {
                        products.length!==null&&products.map(item=>(
                            <div key={item.id} className="catalog-item">
                                <h3>{item.name}</h3>
                                <h4>{item.description}</h4>
                                <h4>{item.price}</h4>
                                <div className="product_buttons">
                                    {user.admin_role===true?<button>Edit product</button>:<button>Order product</button>}
                                    {user.admin_role===true&&<button>Delete product</button>}
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

const defaultState = {
    products:[]
}

export const productsReducer = (state={...defaultState},action) => {
    switch (action.type) {
        case "LOAD_PRODUCTS":
            return {products: [...action.payload]};
        case "DELETE_PRODUCT":
            return {...state,products: [...state.products].filter(item=>item.id!==item.payload.id)}
        case "ADD_PRODUCT":
            return {...state,products: [...state.products,action.payload]}
        case "ORDER_PRODUCT":
            return {...state, products: [...state.products].map(item=>item.id===action.payload.id?{...item,ordered: true, orders_email:action.payload.email}:item)}
        case "UNORDER_PRODUCT":
            return {...state, products: [...state.products].map(item=>item.id===action.payload.id?{...item,ordered:false,orders_email:""}:item)}
        case "EDIT_PRODUCT":
            return {...state, products: [...state.products].map(item=>item.id===action.payload.id?{...item,...action.payload}:item)}
        default:
            return state;
    }
}
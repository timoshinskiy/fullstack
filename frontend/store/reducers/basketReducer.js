const defaultState={
    amount: 0,
    products: [],
}

export const basketReducer = (state={...defaultState}, action) => {
    switch (action.type){
        case "ADD_BASKET_ITEM":
            return {amount: state.amount+action.payload.price, products: [...state.products,action.payload.product_id]}
        case "REMOVE_BASKET_ITEM":
            return {amount: state.amount-action.payload.price, products: [...state.products.filter(item=>item!==action.payload.product_id)]}
        case "CLEAR_BASKET":
            return {amount: 0, products: []};
        default:
            return state;
    }
}
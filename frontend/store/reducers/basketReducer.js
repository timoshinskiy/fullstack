const defaultState={
    amount: 0,
    products: [],
}

export const basketReducer = (state={...defaultState}, action) => {
    switch (action.type){
        case "LOAD_BASKET":
            return {amount: action.payload.amount, products: [...action.payload.products]};
        case "ADD_BASKET_ITEM":
            return {amount: state.amount+action.payload.price, products: [...state.products,action.payload.product]}
        case "REMOVE_BASKET_ITEM":
            return {amount: state.amount-action.payload.price, products: [...state.products.filter(item=>item!==action.payload.id)]}
        case "CLEAR_BASKET":
            return {amount: 0, products: []};
        default:
            return state;
    }
}
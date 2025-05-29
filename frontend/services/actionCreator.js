class ActionCreator{
    login(obj){
        return {type: "LOGIN",payload:obj};
    }
    logout(){
        sessionStorage.removeItem('auth');
        return {type: "LOGOUT"};
    }
    changeName(username){
        return {type: "CHANGE_USERNAME", payload: username}
    }
    loadProducts(arr){
        if(Array.isArray(arr))
        return {type: "LOAD_PRODUCTS",payload:[...arr]};
    }
    addProduct(obj){
        return {type: "ADD_PRODUCT",payload:obj}
    }
    editProduct(obj){
        return {type: "EDIT_PRODUCT", payload: obj}
    }
    orderProduct(id, email){
        return {type: "ORDER_PRODUCT", payload: {id,email}}
    }
    unorderProduct(id){
        return {type: "UNORDER_PRODUCT",payload: {id}}
    }
    loadBasket(amount,arr){
        return {type: "LOAD_BASKET", payload: {amount,products:arr}};
    }
    removeFromBasket(id){
        return {type: "REMOVE_BASKET_ITEM",payload:{id}}
    }
    deleteProduct(id){
        return {type: "DELETE_PRODUCT", payload:{id}}
    }
}

export default new ActionCreator();
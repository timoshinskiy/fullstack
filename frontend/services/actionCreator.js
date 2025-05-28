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
    addToBasket(obj){
        return {type: "", payload: ''}
    }
    removeFromBasket(id){
        return {type: "", payload: ''}
    }
    clearBasket(obj){
        return {type: "", payload: ''}
    }
    loadProducts(arr){
        if(Array.isArray(arr))
        return {type: "LOAD_PRODUCTS",payload:[...arr]};
    }
    addProduct(obj){
        return {type: "ADD_PRODUCT",payload:obj}
    }

}

export default new ActionCreator();

const defaultState = {
    auth: false,
    username: "",
    email: "",
    email_verified: false,
    admin_role: false,
    wallet: 0,
}

export const userReducer = (state = {...defaultState}, action) => {
    switch (action.type){
        case "LOGIN":
            return {...state,auth:true,...action.payload};
        case "LOGOUT":
            return {...state,...defaultState};
        case "CHANGE_USERNAME":
            return {...state,...defaultState,username:action.payload}
        default:
            return state;
    }
}
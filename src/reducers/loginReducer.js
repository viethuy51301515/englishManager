import {authLogin} from '../firebase';
const defaultV = {
    email:"",
    isLoggedIn:false
};
const loginReducer  = (state=defaultV,action) =>{
    switch (action.type) {
        case "login":
            state.email = action.email;
            state.isLoggedIn = true;
            return state;
    
        default:
            break;
    }
    return state;
}
export default loginReducer;
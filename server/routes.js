import auth from 'auth.js';

//Authentication
const register = app.post("/register", auth.register);
const login = app.post("/login", auth.logIn);
const checkIfLoggedIn = app.post("/checkifloggedin", auth.checkIfLoggedIn);

export default {
    register, login, checkIfLoggedIn 
}
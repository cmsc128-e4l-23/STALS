import auth from 'auth.js';

//Authentication
const register = app.post("/register", auth.register);
const login = app.post("/login", auth.logIn);
const checkIfLoggedIn = app.post("/checkifloggedin", auth.checkIfLoggedIn);

//Accommodation
const addAccomm = app.post("/addAccomm", accommodation.addAccomm);
const archiveAccomm = app.post("/archiveAccomm", accommodation.archiveAccomm);
const deleteAccomm = app.delete("/deleteAccomm", accommodation.deleteAccomm);
const searchAccomm = app.post("/searchAccomm", accommodation.searchAccomm);
const generateRep = app.get("/generateRep", accommodation.generateRep);

export default {
    register,
    login,
    checkIfLoggedIn,
    addAccomm,
    archiveAccomm,
    deleteAccomm,
    searchAccomm,
    generateRep,
}
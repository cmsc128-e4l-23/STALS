import express from "express";
import auth from "./controllers/auth.js";
import accommodation from "./controllers/accommodation.js";

const router = express.Router();

//Authentication
router.post("/register", auth.register);
router.post("/login", auth.logIn);
router.post("/checkifloggedin", auth.checkIfLoggedIn);

//Accommodation
router.post("/addAccomm", accommodation.addAccomm);
router.post("/archiveAccomm", accommodation.archiveAccomm);
router.post("/unarchiveAccomm", accommodation.unarchiveAccomm);
router.delete("/deleteAccomm", accommodation.deleteAccomm);
router.post("/searchAccomm", accommodation.searchAccomm);
router.get("/generateRep", accommodation.generateRep);

//for testing
router.get("/viewAccomm", accommodation.viewAccomm);

export default router;
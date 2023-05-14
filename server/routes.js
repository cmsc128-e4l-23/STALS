import express from "express";
import auth from "./controllers/auth.js";
import accommodation from "./controllers/accommodation.js";
import review from "./controllers/review.js";
import admin from "./controllers/admin.js";
import userinfo from "./controllers/userinfo.js";
import accomminfo from "./controllers/accomminfo.js";

const router = express.Router();

//Authentication
router.post("/signup", auth.signUp);
router.post("/login", auth.logIn);
router.post("/checkifloggedin", auth.checkIfLoggedIn);
router.post("/changePassword", auth.changePassword);

//User Info
router.post("/getOwnerAccomms", userinfo.getOwnerAccomms);
router.post("/getUserBasicDetails", userinfo.getUserBasicDetails);
router.post("/getUserReviews", userinfo.getUserReviews);
router.post("/getUserReports", userinfo.getUserReports);
router.post("/getUserBookmarks", userinfo.getUserBookmarks);

//Accommodation Info
router.post("/getAccommOwner", accomminfo.getAccommOwner);
router.post("/getAccommBasicDetails", accomminfo.getAccommBasicDetails);
router.post("/getAccommReviews", accomminfo.getAccommReviews);
router.post("/getAccommReports", accomminfo.getAccommReports);

//Accommodation
router.post("/addAccomm", accommodation.addAccomm);
router.post("/archiveAccomm", accommodation.archiveAccomm);
router.post("/unarchiveAccomm", accommodation.unarchiveAccomm);
router.post("/editAccomm", accommodation.editAccomm);
router.post("/deleteAccomm", accommodation.deleteAccomm);
router.post("/searchAccomm", accommodation.searchAccomm);
router.post("/recommendAccomm", accommodation.recommendAccomm);
router.post("/generateRep", accommodation.generateRep);

router.post("/bookmarkAccomm", accommodation.bookmarkAccomm);
router.post("/removeBookmarkAccomm", accommodation.removeBookmarkAccomm);

//Review
router.post("/addReview", review.addReview);
router.post("/editReview", review.editReview);
router.post("/deleteReview", review.deleteReview);
router.post("/getReview", review.getReview);
router.post("/reportAccomm", accommodation.reportAccomm);

//Admin
router.post("/viewReports", admin.viewReports);
router.post("/resolveReport", admin.resolveReport);
router.post("/dataAnalytics", admin.dataAnalytics);
router.post("/incNumVisits", admin.incNumVisits);
router.post("/getNumVisits", admin.getNumVisits);

//for testing
router.get("/viewAccomm", accommodation.viewAccomm);

export default router;
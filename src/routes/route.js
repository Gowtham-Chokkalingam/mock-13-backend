const express = require("express");
const { adminPostJob, getJobList } = require("../controllers/jobController");
const { userSignup, userSigin } = require("../controllers/userController");

const router = express.Router();

router.post("/register", userSignup);
router.post("/login", userSigin);

router.post('/adminjobpost', adminPostJob)
router.get('/getJobList', getJobList)

module.exports = router;
  
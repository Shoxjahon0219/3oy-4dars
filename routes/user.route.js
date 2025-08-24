const router = require("express").Router();

const {
  getuser,
  getOneuser,
  updateuser,
  deleteuser,
  SendOTP,
  VerifyOTP,
  Register,
  Login,
} = require("../controllers/user.controller");

router.get("/", getuser);
router.get("/:id", getOneuser);
router.patch("/:id", updateuser);
router.delete("/:id", deleteuser);
router.post("/register", Register);
router.post("/login", Login);
router.post("/send_otp", SendOTP);
router.post("/verify_otp", VerifyOTP);

module.exports = router;

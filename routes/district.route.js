const router = require("express").Router();

const {
  createdistrict,
  getdistrict,
  getOnedistrict,
  updatedistrict,
  deletedistrict,
} = require("../controllers/district.controller");

router.post("/", createdistrict);
router.get("/", getdistrict);
router.get("/:id", getOnedistrict);
router.patch("/:id", updatedistrict);
router.delete("/:id", deletedistrict);

module.exports = router;

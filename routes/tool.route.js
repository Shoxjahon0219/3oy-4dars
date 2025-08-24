const router = require("express").Router();

const {
  createtool,
  gettool,
  getOnetool,
  updatetool,
  deletetool,
} = require("../controllers/tool.controller");

router.post("/", createtool);
router.get("/", gettool);
router.get("/:id", getOnetool);
router.patch("/:id", updatetool);
router.delete("/:id", deletetool);

module.exports = router;

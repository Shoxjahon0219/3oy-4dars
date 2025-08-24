const router = require("express").Router();

const {
  createshop_tool,
  getshop_tool,
  getOneshop_tool,
  updateshop_tool,
  deleteshop_tool,
} = require("../controllers/shop_tool.controller");

router.post("/", createshop_tool);
router.get("/", getshop_tool);
router.get("/:id", getOneshop_tool);
router.patch("/:id", updateshop_tool);
router.delete("/:id", deleteshop_tool);

module.exports = router;

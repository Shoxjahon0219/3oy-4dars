const router = require("express").Router();

const {
  createshop,
  getshop,
  getOneshop,
  updateshop,
  deleteshop,
} = require("../controllers/shop.controller");

router.post("/", createshop);
router.get("/", getshop);
router.get("/:id", getOneshop);
router.patch("/:id", updateshop);
router.delete("/:id", deleteshop);

module.exports = router;

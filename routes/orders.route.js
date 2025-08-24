const router = require("express").Router();

const {
  createorders,
  getorders,
  getOneorders,
  updateorders,
  deleteorders,
} = require("../controllers/orders.controller");

router.post("/", createorders);
router.get("/", getorders);
router.get("/:id", getOneorders);
router.patch("/:id", updateorders);
router.delete("/:id", deleteorders);

module.exports = router;

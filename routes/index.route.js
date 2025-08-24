const router = require("express").Router();

const AdminRouter = require("./admin.route");
const districtRouter = require("./district.route");
const orderRouter = require("./orders.route");
const shopRouter = require("./shop.route");
const shop_toolRouter = require("./shop_tool.route");
const toolRouter = require("./tool.route");
const userRouter = require("./user.route");

router.use("/admin", AdminRouter);
router.use("/district", districtRouter);
router.use("/order", orderRouter);
router.use("/shop", shopRouter);
router.use("/shop_tool", shop_toolRouter);
router.use("/tool", toolRouter);
router.use("/user", userRouter);

module.exports = router;

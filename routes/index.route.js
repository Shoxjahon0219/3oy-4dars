const router = require("express").Router();

const {
  findShop_by_tool_name,
  findUsers_by_max_rent_price,
  findUsers_by_district_by_date_by_tool,
} = require("../controllers/smart_search");

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

router.post("/find_by_tool_name", findShop_by_tool_name);
router.post("/find_by_max_rent_price", findUsers_by_max_rent_price);
router.post(
  "/find_by_destrict_by_date_by_tool_name",
  findUsers_by_district_by_date_by_tool
);

module.exports = router;

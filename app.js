const express = require("express");
require("dotenv").config();
const mainRouter = require("./routes/index.route");

const PORT = process.env.PORT ?? 3030;

const app = express();
app.use(express.json());
app.use("/", mainRouter);

app.listen(PORT, () => console.log(`server started on ${PORT}`));

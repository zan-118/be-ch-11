const express = require("express");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const routes = require("./Routes");
require("dotenv").config();

const app = express();
const handleCors = require("./middlewares/cors");

const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./views"));
app.use(cookieParser());
app.use(handleCors);
app.use(express.static("public"));
app.use(flash());
app.get("/", (req, res) => {
  res.json({ message: "api running !!" });
});

app.use("/", routes); // localhost:<PORT>

// app.listen(PORT, () => {
//   console.log(`server sudah connect di http://localhost:${PORT}`);
// });

module.exports = app

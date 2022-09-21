const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("./routes/tours.route");

app.use(express.json());
app.use(cors());

// schema design

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use("/api/v1/", productRoute);

module.exports = app;

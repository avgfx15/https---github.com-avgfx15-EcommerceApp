const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config/configSecret");

const connectDB = require("./db/db");
const sellerRoute = require("./routes/sellerRoutes");

const userRoutes = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const cartRoute = require("./routes/cartRoutes");

const port = config.port;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/seller", sellerRoute);
app.use("/seller", productRoute);
app.use("/cart", cartRoute);

app.get("/", async (req, res) => {
  res.json({ message: "Testing route" });
});
app.listen(port, () => {
  console.log(`E - Commerce App is running on port ${port}`);
});

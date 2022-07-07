const erroMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const corsOptions = {
  //To allow requests from client
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    //   "http://104.142.122.231",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

// dotenv config

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config({ path: "backend/config/config.env" });
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// route Import
const ProductRouter = require("./routes/productRoute");
const UserRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const Payment = require("./routes/PaymentRoute");

app.use("/api/v1", ProductRouter);
app.use("/api/v1", UserRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", Payment);

// **********  Deployment  **********

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running")
  })
}
// **********  Deployment  **********

//ERROR handler

app.use(erroMiddleware);

module.exports = app;

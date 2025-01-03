const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
// const path = require("path");

const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/category.routes");
const transactionRouter = require("./routes/transaction.routes");
const contactRouter = require("./routes/contact.routes");

// Access Environment Variables
const PORT = process.env.PORT || 8000;
// const MONGO_URL = process.env.MONGO_URL;

const app = express();

// db connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

// middlewares
const corsOptions = {
  origin: ["https://money-hack-fronend.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));
app.use(express.json());

// const _dirname = path.resolve();

// all api routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/contact", contactRouter);

// app.use(express.static(path.join(_dirname, "../frontend/dist")));
// app.use("*", (req, res) => {
//   res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
// });

// Start the server
app.listen(PORT, () =>
  console.log(`Server is running on this port... ${PORT} `)
);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/category.routes");
const transactionRouter = require("./routes/transaction.routes");
const contactRouter = require("./routes/contact.routes");

// Access Environment Variables
const PORT = process.env.PORT || 8000;

const app = express();

// db connection
const mongoURI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster.mongodb.net/moneyhack?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(mongoURI)
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

// all api routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/contact", contactRouter);

// Start the server
app.listen(PORT, () =>
  console.log(`Server is running on this port... ${PORT} `)
);

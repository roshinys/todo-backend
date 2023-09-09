require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

//routes
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const middleware = require("./middleware/auth");

//endpoints
app.use("/auth", authRoutes);
app.use("/", todoRoutes);

//test
app.get("/protectedroute", middleware.authenticate, (req, res) => {
  res.json({ protectedRoute: "yes" });
});

app.use((req, res) => {
  res.json({ message: "Page Not Found" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });

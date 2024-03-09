// imports
import express from "express";
import mongoose from 'mongoose'
import router from "./routes/user-routes";

const app = express();
// server data
const password = encodeURIComponent("Puy@54713");
const port = 3001

// parse all data into json format
app.use(express.json())
// routers
app.use("/users", router)

// connections
// db connection
mongoose.connect(`mongodb+srv://akshitTyagi:${password}@cluster0.smq7qqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
  console.log("DB connected");

  // server listening to port
  app.listen(port, () => {
    console.log("Server running");
  });
}).catch ((err) => {
  // error encountered in db connection
  console.log("Database encountered an unexpected issue", err);
})
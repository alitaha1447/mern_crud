require("dotenv").config();
const express = require("express");
var cors = require('cors')
const app = express();
const apiRoute=require('./src/routes/index.route.js')

const connectDB= require('./src/config/config.js');
connectDB()

app.use(cors())
app.use(express.json());
app.use('/api',apiRoute)

const PORT =  4000;

app.get("/", (req, res) => {
  res.send("Machine Test");
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

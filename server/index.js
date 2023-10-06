const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors());

//DB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define a route for the homepage
app.get("/", (req, res) => {
  res.send("API");
});

app.use('/auth',require('./router/authRoutes'))
app.use('/',require('./router/payment'))


// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

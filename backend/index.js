const express = require('express');
const userRoutes = require("./routes/userRoutes");
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Body parser middleware
app.use(express.json());


app.use(cors()); // Use this after the variable declaration

app.use('/api',userRoutes);

const PORT = process.env.SERVER_PORT;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
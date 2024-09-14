const express = require('express');
const router = require("./routes/routes");
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Serve static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Body parser middleware
app.use(express.json());


app.use(cors()); // Use this after the variable declaration

app.use('/api',router);

const PORT = process.env.SERVER_PORT;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const {login} = require('../controllers/userController');
// const moduleController = require("../controllers/moduleController");
const CarController = require("../controllers/CarController");

// Configure Multer for file uploads (store in 'uploads' folder)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); // Get the file extension
        const newFileName = file.fieldname + '-' + uniqueSuffix + ext;
        cb(null, newFileName); // Save file with new name
    }
});
const upload = multer({ storage: storage });


 router.post('/login',login);
 router.post('/addCar',upload.fields([{ name: 'car_photos', maxCount: 5 },{ name: 'car_featured_photo', maxCount: 1 }]),CarController.addCar);
//  router.patch('/module/updatecars',moduleController.updateCars);


 module.exports = router;
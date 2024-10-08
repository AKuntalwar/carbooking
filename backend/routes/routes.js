const express = require('express');
const multer = require('multer');
const path = require('path');
const verifyToken = require('../middleware/auth');

const router = express.Router();
const UserController = require('../controllers/UserController');
const CarController = require("../controllers/CarController");
const MetaController = require("../controllers/MetaController");

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

//Manage Users
 router.post('/login',UserController.login);
 router.post('/create-user',UserController.register);

 
//Manage Other Metadata
router.get('/list-countries',MetaController.listCountries);
router.get('/list-states',MetaController.listStates);
router.get('/list-cities',MetaController.listCities);
router.get('/list-roles',MetaController.listRoles);

/* Following routes are Protected with JWT token */
//Manage Cars
 router.post('/addCar',verifyToken,upload.fields([{ name: 'car_photos', maxCount: 5 },{ name: 'car_featured_photo', maxCount: 1 }]),CarController.addCar);
 router.patch('/updateCar',verifyToken,upload.fields([{ name: 'car_photos', maxCount: 5 },{ name: 'car_featured_photo', maxCount: 1 }]),CarController.updateCar);
 router.get('/getCar',verifyToken,CarController.getCar);
 router.get('/getCars',verifyToken,CarController.getCars);
 router.delete('/deleteCar',verifyToken,CarController.deleteCar);


 module.exports = router;
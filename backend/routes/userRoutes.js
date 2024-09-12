const express = require('express');
const router = express.Router();
const {login} = require('../controllers/userController');
const moduleController = require("../controllers/moduleController");


 router.post('/login',login);
 router.post('/module/addcars',moduleController.addCars);
 router.patch('/module/updatecars',moduleController.updateCars);


 module.exports = router;
const CarService = require("../services/CarService");

const  addCar = async  (req, res, next)=>{
    
    try{
        const result = await  CarService.addCar(req);
        if(result?.status==false){
            res.status(404); 
        }
        res.json(result);
        
    } catch(error){
        next(error);
    }
    
}
const  updateCar = async  (req, res, next)=>{
    
    try{
        const result = await  CarService.updateCar(req);
        if(result?.status==false){
            res.status(404); 
        }
        res.json(result);
        
    } catch(error){
        next(error);
    }
    
}
const  deleteCar = async  (req, res, next)=>{
    
    try{
        const result = await  CarService.deleteCar(req);
        if(result?.status==false){
            res.status(404); 
        }
        res.json(result);
        
    } catch(error){
        next(error);
    }
    
}
const  getCar = async  (req, res, next)=>{
    
    try{
        const result = await  CarService.getCar(req);
        if(result?.status==false){
            res.status(404); 
        }
        res.json(result);
        
    } catch(error){
        next(error);
    }
    
}
const  getCars = async  (req, res, next)=>{
    
    try{
        const result = await  CarService.getCars(req);
        if(result?.status==false){
            res.status(404); 
        }
        res.json(result);
        
        
    } catch(error){
        next(error);
    }
    
}


module.exports = {addCar,updateCar,deleteCar,getCar,getCars}
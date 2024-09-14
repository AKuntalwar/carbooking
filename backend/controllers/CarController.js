const CarService = require("../services/CarService");




const  addCar = async  (req, res, next)=>{
    
    try{
        const result = await  CarService.addCar(req);
        console.log("result",result);
        if(result?.status==false){
            res.status(404); 
        }
        res.json(result);
        
        // console.log("loginResult",loginResult);
        
    } catch(error){
        next(error);
    }
    
}

module.exports = {addCar}
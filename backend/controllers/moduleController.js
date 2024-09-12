const moduleService = require("../services/moduleService");

const addCars = async (req, res, next)=>{
    // console.log(req.body);
    try{
        console.log(req);
        const carname = req.body.carname;
        const cartype = req.body.cartype;
        const description = req.body.description;

        const result = await  moduleService.addCars(carname,cartype,description);
        if(result.status){
            res.status(404); 
        }
        res.json(result);
        
        
    } catch(error){
        next(error);
    }
}
const updateCars = async (req, res, next)=>{

}
module.exports={addCars,updateCars}
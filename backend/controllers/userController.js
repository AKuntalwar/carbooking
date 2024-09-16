const UserService= require("../services/UserService");




const  login = async  (req, res, next)=>{    
    try{
        const loginResult = await  UserService.authenticate(req);
        if(loginResult.status=='Failed'){
            res.status(404); 
        }
        res.json(loginResult);
        
    } catch(error){
        next(error);
    }    
}
const  register = async  (req, res, next)=>{    
    try{
        const result = await  UserService.register(req);
        if(result.status==false){
            res.status(404); 
        }
        res.json(result);
        
    } catch(error){
        next(error);
    }    
}

module.exports = {login,register}
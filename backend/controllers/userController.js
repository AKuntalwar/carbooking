const {authenticate} = require("../services/userService");




const  login = async  (req, res, next)=>{
    
    try{
        const loginResult = await  authenticate(req);
        if(loginResult.status=='Failed'){
            res.status(404); 
        }
        res.json(loginResult);
        
        // console.log("loginResult",loginResult);
        
    } catch(error){
        next(error);
    }
    
}

module.exports = {login}
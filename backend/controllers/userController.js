const {authenticate} = require("../services/userService");




const  login = async  (req, res, next)=>{
    const {username, password} = req.body;
    try{
        const loginResult = await  authenticate(username, password);
        if(loginResult.status=='Failed'){
            res.status(404); 
        }
        res.json(loginResult);
        
        console.log("loginResult",loginResult);
        
    } catch(error){
        next(error);
    }
    
}

module.exports = {login}
const MetaService= require("../services/MetaService");
const  listCountries = async  (req, res, next)=>{    
    try{
        const result = await  MetaService.listCountries(req);
        if(result.status==false){
            res.status(404); 
        }
        res.json(result);
        
    } catch(error){
        next(error);
    }    
}
const  listStates = async  (req, res, next)=>{    
    try{
        const result = await  MetaService.listStates(req);
        if(result.status==false){
            res.status(404); 
        }
        res.json(result);
        
    } catch(error){
        next(error);
    }    
}
const  listCities = async  (req, res, next)=>{    
    try{
        const result = await  MetaService.listCities(req);
        if(result.status==false){
            res.status(404); 
        }
        res.json(result);
        
    } catch(error){
        next(error);
    }    
}
const  listRoles = async  (req, res, next)=>{    
    try{
        const result = await  MetaService.listRoles(req);
        if(result.status==false){
            res.status(404); 
        }
        res.json(result);
        
    } catch(error){
        next(error);
    }    
}

module.exports = {listCountries,listStates,listCities,listRoles}
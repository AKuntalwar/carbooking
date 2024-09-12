const {db} = require("../config/dbConfig");

const addCars =  async (carname,cartype,description) => { 
   // console.log("carname",carname);
    return new Promise((resolve,reject)=>{
        let result = {status:false,message:"Something went wrong!",data:null};
        const query = 'INSERT INTO car_details (carname,cartype,description) VALUES (?,?,?)';
        
        db.query(query, [carname, cartype, description], (err, data) => {
            if(err){
                result.status=false;
                result.message = "Something went wrong!";
                return resolve(result);
            }
           // console.log("data",data);
            
            if(!data || data.length==0){
                result.status=false;
                result.message = "User not found!";
                return resolve(result);
            }
            // if(data[0].USER_NAME==='username'){
                result.status=true;
                result.message = "Car added successfully!";
                result.data=data[0]; 
                resolve(result);
            // }
        });

    }); 

}

const creatRecord1 = (data)=>{

    console.log("Create record");
    return "jksgajksag";
}

const updateCars = (data)=>{
    console.log("Update record");
    return "jksgajksag";
}

module.exports={addCars,updateCars}
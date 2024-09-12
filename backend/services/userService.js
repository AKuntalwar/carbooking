const {db} = require("../config/dbConfig");
//const {  validationResult } = require("express-validator");


const authenticate =  async (username, password) => { 
    return new Promise((resolve,reject)=>{
        let result = {status:false,message:"Something went wrong!",data:null};
        const query = 'SELECT user_id ,username  FROM user_login_master WHERE username = ? AND pass_text = ?';
        db.query(query, [username, password], (err, data) => {
            if(err){                
                result.status=false;
                result.message = "Something went wrong!";
                return resolve(result);
            }
            console.log("data",data);
            
            if(!data || data.length==0){
                result.status=false;
                result.message = "User not found!";
                return resolve(result);
            }
            // if(data[0].USER_NAME==='username'){
                result.status=true;
                result.message = "You are logged in successfully!";
                result.data=data[0]; 
                resolve(result);
            // }
        });

    }); 

}
// const authenticate =  async (username, password) => {    
//     let result = {};
//     const sql =
//     "SELECT * FROM user_login_master WHERE USER_NAME = ? AND PASS_TEXT = ?";
//    let resultQuery = await db.query(sql, [username, password], (err, data) => {
     
    
//       if (err) {
//         result.status="Failed";
//         result.message = "Something went wrong!";
//       }
//       if (data.length > 0) {
        
//         result.status="Success";
//         result.message = "You are logged in successfully!";
//       } else {
//         result.status="Failed";
//         result.message = "Invalid username and password! Please try again!";
//       }
//     //console.log("result",result);
   
    
//   });
//   console.log("resultQuery",resultQuery);
//   return result;
// }
 

module.exports = {authenticate}
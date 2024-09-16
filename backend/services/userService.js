const {db} = require("../config/dbConfig");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
//const {  validationResult } = require("express-validator");

const getClientIp = (req) => {
    // This will work in most scenarios in Express.js
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
}
const auditLogin = (userId,loginIp) => {
    
    return new Promise((resolve, reject) => {
        const lastLoginDate = new Date();
        const updateQuery = 'UPDATE user_login_master SET last_login_date = ?, last_login_ip = ? WHERE user_id = ?';
        
        db.query(updateQuery, [lastLoginDate, loginIp, userId], (err) => {
            if (err) {
                return reject(err);
            }
            resolve(true);
        });
    });
};

const authenticate =  async (req) => { 
    const {username, password} = req.body;
    return new Promise((resolve,reject)=>{
        let result = {status:false,message:"Something went wrong!",data:null};
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
        const query = 'SELECT user_id ,username,user_role  FROM user_login_master WHERE username = ? AND password = ?';
        db.query(query, [username, hashedPassword], (err, data) => {
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
            //update the last login IP and Date:
            const query = 'UPDATE user_login_master SET last_login_date=NOW(), last_login_ip=""';

            result.status=true;
            result.message = "You are logged in successfully!";
            let user = data[0]??"";

            const token = jwt.sign({ username: user?.username }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE_TIME,
              });
            result.data=user; 
            result.access_token=token; 
            result.expires_in=process.env.JWT_EXPIRE_TIME; 
            resolve(result);
            let user_id = data[0]?.user_id;
            const loginIp = getClientIp(req);
            auditLogin(user_id,loginIp)
                .then(() => resolve(result))
                .catch(updateErr => {
                   resolve(result);
                });
        });

    }); 

}

 

module.exports = {authenticate}
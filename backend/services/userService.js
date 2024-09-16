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


//register a new user
const register =  async (req) => { 
    return new Promise((resolve,reject)=>{
    let result = {status:false,message:"Something went wrong!",data:null};
    const {
        name,
        dob,
        address,
        mobile,
        email,
        city,
        state,
        country,
        pincode,
        password 
      } = req.body;
      console.log("request",req.body);
      // Check if the email already exists in the database
        const emailCheckQuery = `SELECT * FROM user_details WHERE email = ? AND deleted=0`;
        db.query(emailCheckQuery, [email], async (err, resultSet) => {
            if (err) {
                result.message = "Database error 1";
                return resolve(result);
            }
            if (resultSet.length > 0) {
                result.message = "Email already exists";
                return resolve(result);
            }
            try {
                // Prepare the SQL query to insert the user details
                const insertQuery = `
                INSERT INTO user_details
                (name, dob, address, mobile, email, city, state, country, pincode, verified)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;

                const values = [
                name, 
                dob, 
                address, 
                mobile, 
                email, 
                city, 
                state, 
                country, 
                pincode, 
                0,
                ];

                // Execute the SQL query
                db.query(insertQuery, values, (err, resultSet) => {
                if (err) {
                    console.log("err",err);
                    result.message = "Database error during registration";
                    return resolve(result);
                }

                // Prepare the SQL query to insert the user login details
                const insertLoginQuery = `
                INSERT INTO user_login_master
                (user_id,user_role,username,password,pass_text,register_on,active)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                `;
                const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
                const user_id = resultSet.insertId??null;
                if(user_id){
                    const loginValues = [resultSet.insertId,2,email,hashedPassword,password,'NOW()','1'];
                    db.query(insertLoginQuery, loginValues, (err, resultSet) => {
                        if (err) {
                            let deleteQuery = "UPDATE user_details SET deleted=1 WHERE id=?";
                            db.query(deleteQuery,[user_id],(err,result)=>{
                                
                            })
                            result.message = "Something went wrong. User registration failed!";
                            return resolve(result);
                        }
                        result.status = true;
                        result.message = "User registered successfully!";
                        return resolve(result);
                    })
                }
                });

            } catch (err) {
                result.message = "Something went wrong!";
                return resolve(result);
            }
        });
    });
}
 

module.exports = {authenticate,register}
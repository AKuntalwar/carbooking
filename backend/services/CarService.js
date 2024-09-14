const {db} = require("../config/dbConfig");


const addCar = (req)=>{
    // console.log("req.body",req.files);
    return new Promise((resolve,reject)=>{
    let result = {status:false,message:"Something went wrong!",data:null};
    const { name, type, seats, model, car_number, description, created_by } = req.body;
    if (!name || !type || !car_number || !created_by) {
        result.status = "Missing required fields";
        result.status = false;
    }
    //Add file upload validations
    if (req.files && req.files.length) {
        if(req.files['car_photos'].length>5){
            result.status = "Maximum 5 photos can be uploaded!";
            result.status = false;
            return resolve(result);
        }
        if(req.files['car_featured_photo'].length>1){
            result.status = "Maximum 1 feature photos can be uploaded!";
            result.status = false;
            return resolve(result);
        }
    }
    if (req.files && req.files.length > 5) {
        result.status = "Maximum 5 photos can be uploaded!";
        result.status = false;
        return resolve(result);
    }
    // Insert car details into the `car_details` table
    const carQuery = `INSERT INTO car_details (name, type, seats, model, car_number, description, created_by, created_on) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;

    db.query(carQuery, [name, type, seats, model, car_number, description, created_by], (err, resultSet) => {
        if (err) {
            result.message = "Failed to save car details";
            result.data = err;
            return resolve(result);
        }

        const carId = resultSet?.insertId;
        
        // Insert car images into the `car_photos` table
        console.log("carId",carId);
        if (req.files && carId) {

            const carPhotosQuery = `INSERT INTO car_photos (car_id,name,image,featured) VALUES ?`;
            let photoValues = [];
            
            if(req.files['car_featured_photo'].length>0){
                photoValues = req.files['car_featured_photo'].map(file => [carId,file.originalname, file.filename,1])[0];
            }
            if(req.files['car_photos'].length > 0){
             let photos = req.files['car_photos'].map(file => [carId,file.originalname, file.filename,0]);
             if(photoValues.length){
                photoValues = [photoValues,...photos];   
             }else{
                photoValues = photos; 
             }
            }
            console.log("photoValues",photoValues);
            if(photoValues.length>0){
                db.query(carPhotosQuery, [photoValues], (photoErr) => {
                    if (photoErr) {
                        result.message = "Failed to save car photos";
                        result.data = photoErr;
                        result.status=false;
                    }
                
                });
            }
            result.status=true;
            result.message = "Car details and photos saved successfully";
            return resolve(result);
            
        } else {
            result.status=true;
            result.message = "Car details saved successfully, no images uploaded";
            return resolve(result);
            
        }
        return resolve(result);
    });
});
}

module.exports = {addCar};

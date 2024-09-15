const {db} = require("../config/dbConfig");


const addCar = (req)=>{
    // console.log("req.body",req.files);
    return new Promise((resolve,reject)=>{
    let result = {status:false,message:"Something went wrong!",data:null};
    const { name, type, seats, model, car_number, description, created_by } = req.body;
    if (!name || !type) {
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
        // console.log("carId",carId);
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
            // console.log("photoValues",photoValues);
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
const updateCar = (req) => {
    return new Promise((resolve, reject) => {
        let result = { status: false, message: "Something went wrong!", data: null };
        const { car_id, name, type, seats, model, car_number, description, updated_by } = req.body;

        if (!car_id || !name || !type) {
            result.message = "Missing required fields";
            result.status = false;
            return resolve(result);
        }

        // Validate file uploads
        if (req.files && req.files.length) {
            if (req.files['car_photos'].length > 5) {
                result.message = "Maximum 5 photos can be uploaded!";
                result.status = false;
                return resolve(result);
            }
            if (req.files['car_featured_photo'].length > 1) {
                result.message = "Maximum 1 feature photo can be uploaded!";
                result.status = false;
                return resolve(result);
            }
        }

        // Update car details in the `car_details` table
        const updateCarQuery = `
            UPDATE car_details
            SET name = ?, type = ?, seats = ?, model = ?, car_number = ?, description = ?, updated_by = ?, updated_on = NOW()
            WHERE id = ?`;

        db.query(updateCarQuery, [name, type, seats, model, car_number, description, updated_by, car_id], (err, resultSet) => {
            if (err) {
                result.message = "Failed to update car details";
                result.data = err;
                return resolve(result);
            }

            // Handle car photos if provided
            if (req.files) {
                // Delete old photos if needed (optional, based on your requirement)
                const deletePhotosQuery = `UPDATE car_photos SET deleted=1 ,updated_on=NOW() WHERE car_id = ? AND deleted=0`;
                db.query(deletePhotosQuery, [car_id], (deleteErr) => {
                    if (deleteErr) {
                        result.message = "Failed to delete old car photos";
                        result.data = deleteErr;
                        return resolve(result);
                    }

                    // Insert new car photos
                    const carPhotosQuery = `INSERT INTO car_photos (car_id, name, image, featured) VALUES ?`;
                    let photoValues = [];

                    if (req.files['car_featured_photo'] && req.files['car_featured_photo'].length > 0) {
                        photoValues = req.files['car_featured_photo'].map(file => [car_id, file.originalname, file.filename, 1])[0];
                    }

                    if (req.files['car_photos'] && req.files['car_photos'].length > 0) {
                        let photos = req.files['car_photos'].map(file => [car_id, file.originalname, file.filename, 0]);
                        if (photoValues.length) {
                            photoValues = [photoValues, ...photos];
                        } else {
                            photoValues = photos;
                        }
                    }

                    if (photoValues.length > 0) {
                        db.query(carPhotosQuery, [photoValues], (photoErr) => {
                            if (photoErr) {
                                result.message = "Failed to save updated car photos";
                                result.data = photoErr;
                                result.status = false;
                                return resolve(result);
                            }

                            result.status = true;
                            result.message = "Car details and photos updated successfully";
                            return resolve(result);
                        });
                    } else {
                        result.status = true;
                        result.message = "Car details updated successfully, no new photos uploaded";
                        return resolve(result);
                    }
                });
            } else {
                result.status = true;
                result.message = "Car details updated successfully, no images uploaded";
                return resolve(result);
            }
        });
    });
};
const deleteCar = (req) => {
    return new Promise((resolve, reject) => {
        const car_id = parseInt(req.query.id) || null;
        let result = { status: false, message: "Something went wrong!", data: null };

        if (!car_id) {
            result.message = "Car ID is required";
            result.status = false;
            return resolve(result);
        }

        // First, delete associated photos of the car from `car_photos` table
        const deletePhotosQuery = `UPDATE car_photos SET deleted=1, updated_on=NOW() WHERE car_id = ? AND deleted=0`;

        db.query(deletePhotosQuery, [car_id], (photoErr) => {
            if (photoErr) {
                result.message = "Failed to delete car photos";
                result.data = photoErr;
                return resolve(result);
            }

            // Once the photos are deleted, delete the car details from `car_details` table
            const deleteCarQuery = `UPDATE car_details SET deleted=1, updated_on=NOW() WHERE id = ?`;

            db.query(deleteCarQuery, [car_id], (carErr) => {
                if (carErr) {
                    result.message = "Failed to delete car details";
                    result.data = carErr;
                    return resolve(result);
                }

                result.status = true;
                result.message = "Car and associated photos deleted successfully";
                return resolve(result);
            });
        });
    });
};
const getCar = (req) => {
    return new Promise((resolve, reject) => {
        const car_id = parseInt(req.query.id) || 1;
        let result = { status: false, message: "Something went wrong!", data: null };

        if (!car_id) {
            result.message = "Car ID is required";
            result.status = false;
            return resolve(result);
        }

        // Query to get car details
        const carDetailsQuery = `
            SELECT cd.id, cd.name, cd.type, cd.seats, cd.model, cd.car_number, cd.description, cd.created_by, cd.created_on
            FROM car_details cd
            WHERE cd.id = ? AND cd.deleted=0`;

        // Query to get all associated car photos
        const carPhotosQuery = `
            SELECT cp.id, cp.image, cp.featured
            FROM car_photos cp
            WHERE cp.car_id = ? AND cp.deleted=0`;

        // Fetch car details
        db.query(carDetailsQuery, [car_id], (err, carResultSet) => {
            if (err) {
                result.message = "Failed to fetch car details";
                result.data = err;
                return resolve(result);
            }

            if (carResultSet && carResultSet.length > 0) {
                const carDetails = carResultSet[0];

                // Fetch car photos after retrieving the car details
                db.query(carPhotosQuery, [car_id], (photoErr, photoResultSet) => {
                    if (photoErr) {
                        result.message = "Failed to fetch car photos";
                        result.data = photoErr;
                        return resolve(result);
                    }

                    // Attach photos to the car details object
                    carDetails.photos = photoResultSet || [];

                    result.status = true;
                    result.message = "Car details and photos fetched successfully";
                    result.data = carDetails;

                    return resolve(result);
                });
            } else {
                result.message = "No car found with the provided ID";
                return resolve(result);
            }
        });
    });
};

const getCars = (req) => {
    
    return new Promise((resolve, reject) => {
        // console.log("req body",req);
        // const { page, limit} = req.body;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        let result = { status: false, message: "Something went wrong!", data: null };

        // Calculate offset for pagination
        const offset = (page - 1) * limit;

        // Query to get paginated car details along with the featured image
        const carListQuery = `
            SELECT cd.id, cd.name, cd.type, cd.seats, cd.model, cd.car_number, cd.description, cd.created_by, cd.created_on,
                   cp.image AS featured_photo
            FROM car_details cd
            LEFT JOIN car_photos cp ON cd.id = cp.car_id AND cp.featured = 1 AND cp.deleted=0 WHERE cd.deleted=0 
            LIMIT ? OFFSET ?`;

        // Query to get the total count of cars (for pagination)
        const countQuery = `SELECT COUNT(*) AS total FROM car_details WHERE deleted=0`;

        // First, get the total number of cars for pagination
        db.query(countQuery, (err, countResultSet) => {
            if (err) {
                result.message = "Failed to fetch car count";
                result.data = err;
                return resolve(result);
            }

            const total = countResultSet[0]?.total || 0;

            // Now fetch the car details with the featured images
            db.query(carListQuery, [limit, offset], (err, carListResultSet) => {
                if (err) {
                    result.message = "Failed to fetch car list";
                    result.data = err;
                    return resolve(result);
                }

                result.status = true;
                result.message = "Car list fetched successfully";
                result.data = {
                    total,
                    page,
                    limit,
                    cars: carListResultSet || []
                };

                return resolve(result);
            });
        });
    });
};


module.exports = {addCar,updateCar,deleteCar,getCar,getCars};

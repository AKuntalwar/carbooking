const {db} = require("../config/dbConfig");
const listCountries = (req) => {
    
    return new Promise((resolve, reject) => {
        let result = { status: false, message: "Something went wrong!", data: null };

        // Query to get paginated car details along with the featured image
        const sqlQuery = `SELECT  id, country_name FROM countries_master`;
        // Now fetch the car details with the featured images
        db.query(sqlQuery, (err, resultSet) => {
            if (err) {
                result.message = "Failed to fetch country list";
                result.data = err;
                return resolve(result);
            }
            result.status = true;
            result.message = "Country list fetched successfully";
            result.data = resultSet??[];
            return resolve(result);
        });
    });
};
const listStates = (req) => {    
    return new Promise((resolve, reject) => {
        const country = parseInt(req.query.country) || null;
        let result = { status: false, message: "Something went wrong!", data: null };

        // Query to get paginated car details along with the featured image
        const sqlQuery = `SELECT  id, name,code FROM states_master ${country?`WHERE country_id=${country}`:''}`;
        // Now fetch the car details with the featured images
        db.query(sqlQuery, (err, resultSet) => {
            if (err) {
                result.message = "Failed to fetch state list";
                result.data = err;
                return resolve(result);
            }
            result.status = true;
            result.message = "State list fetched successfully";
            result.data = resultSet??[];
            return resolve(result);
        });
    });
};
const listCities = (req) => {
    
    return new Promise((resolve, reject) => {
        const state = parseInt(req.query.state) || null;
        const country = parseInt(req.query.country) || null;
        let result = { status: false, message: "Something went wrong!", data: null };

        // Query to get paginated car details along with the featured image
        let where = state?`WHERE state_id=${state}`:'';
        if(where && country){
            where = `${where} AND country=${country}`;
        }
        const sqlQuery = `SELECT  id, city_name, state_id, country_id FROM city_master ${where??''}`;
        // Now fetch the car details with the featured images
        db.query(sqlQuery, (err, resultSet) => {
            if (err) {
                result.message = "Failed to fetch city list";
                result.data = err;
                return resolve(result);
            }
            result.status = true;
            result.message = "City list fetched successfully";
            result.data = resultSet??[];
            return resolve(result);
        });
    });
};
const listRoles = (req) => {
    
    return new Promise((resolve, reject) => {
        let result = { status: false, message: "Something went wrong!", data: null };

        // Query to get paginated car details along with the featured image
        const sqlQuery = `SELECT  id, country_name FROM countries_master`;
        // Now fetch the car details with the featured images
        db.query(sqlQuery, (err, resultSet) => {
            if (err) {
                result.message = "Failed to fetch country list";
                result.data = err;
                return resolve(result);
            }
            result.status = true;
            result.message = "Country list fetched successfully";
            result.data = resultSet??[];
            return resolve(result);
        });
    });
};
module.exports = {listCountries,listStates,listCities,listRoles};

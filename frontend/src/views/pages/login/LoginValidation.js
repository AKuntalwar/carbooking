function Validation (values) {

    //alert("Error from Validation File");
    let error = {};

    //const username_patterns = "/^[A-Za-z][A-Za-z0-9_]{7,29}$/";
    //const password_patterns = "/^(?=.\d)(?=.[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/";
//console.log("values",values);
    if (values.username === "") {
        error.username = "Username should not be empty";
    } else {
        error.username = "";
    }


    if (values.password === "") {
        error.password = "Password should not be empty";
    } else {
        error.password = "";
    }
    return error;


}





export default Validation;
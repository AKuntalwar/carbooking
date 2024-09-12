const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
var expressValidator = require("express-validator");

const { check, validationResult } = require("express-validator");

const app = express();
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "class_tuition",
});

app.post("/login", (req, res) => {
  const sql =
    "SELECT * FROM user_login_master WHERE USER_NAME = ? AND PASS_TEXT = ?";
  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    const errors = validationResult(req);
    console.log(req.body);
    console.log(sql);

    if (!errors.isEmpty()) {
      return res.json(errors);
    } else {
      if (err) {
        return res.json("Error");
      }
      if (data.length > 0) {
        return res.json("Success");
      } else {
        return res.json({ status: "Failed", message:"Invalid username and password! Please try again!" });
      }
    }
  });
});

const port = process.env.PORT || 8085;
app.listen(port, () => {
  console.log("Database Connection is Created");
});

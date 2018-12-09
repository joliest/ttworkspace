exports.getAllUsers = function(req, res, conn) {
    dbConn = conn;
    getAllUser(function(err, allUser) {
    
        if(err) {
            res.send("Unable to retrieve list of users");
        }

        var response;
        if(allUser.length !== 0) {
            response = {
                status: "200", 
                allUser: allUser,
                message: "Users successfull retrieved"
            };
        } else {
            response = {
                status: "204",
                allUser: null,
                message: "Unable to retrieve list of users"
            }
        }

        res.send(response);
    })
}

function getAllUser(callback) {
    var sqlQuery = 'SELECT * FROM user_tbl WHERE user_isdel = 0';

    dbConn.query(sqlQuery, function(err, recordset) {
        if(err) {
            console.log("Unable to retrieve list of users");
            callback(err, null);
        }

        var allUserList = [];

        for (var index in recordset) {
            var user = {
                user_id: recordset[index].user_id,
                firstname: recordset[index].firstname,
                lastname: recordset[index].lastname,
                gender: recordset[index].gender,
                age: recordset[index].age,
                email: recordset[index].email,
                telephone: recordset[index].telephone,
                date_created: recordset[index].date_created,
                date_modified: recordset[index].date_modified
            };
            console.log(allUserList);
            allUserList.push(user);
        }

        callback(null, allUserList);
    })
}



exports.addUser = function(req, res, conn) {

    statement = "INSERT INTO user_tbl(firstname, lastname, gender, age, email, telephone)" +
                "VALUES(?, ?, ?, ?, ?, ?)";

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let gender = req.body.gender;
    let age = req.body.age;
    let email = req.body.email;
    let telephone = req.body.telephone;

    let data = [firstname, lastname, gender, age, email, telephone];

    var msg ='';

    conn.query(statement, data, (err, results, fields) => {
        if (err) {
            res.send({
                "message": "Unable to add user"
            });
        } else {
            res.send({
                "message": "User added"
            });
        }
    })
}

exports.getUserById = function(req, res, conn) {
    let user_id = req.params.id;

    let sqlQuery = "SELECT * FROM user_tbl WHERE user_id = ? AND user_isdel = 0";

    let data = [user_id]

    conn.query(sqlQuery, data, (err, recordset) => {
        if (err) {
            res.send({
                "message": "Unable to retrieve user"
            });
        } else {
            var user = {
                user_id: recordset[0].user_id,
                firstname: recordset[0].firstname,
                lastname: recordset[0].lastname,
                gender: recordset[0].gender,
                age: recordset[0].age,
                email: recordset[0].email,
                telephone: recordset[0].telephone,
                date_created: recordset[0].date_created,
                date_modified: recordset[0].date_modified
            };
            res.send(user);
        }
    })
}

exports.updateUser = function(req, res, conn) {
    //run get users first, 
    //tehn create a duplicate and set the user_isdel to 1
    let sqlQuery = "UPDATE user_tbl SET firstname = ?, " +
                                        "lastname = ?, " +
                                        "gender = ?, " +
                                        "age = ?, " +
                                        "email = ?, " +
                                        "telephone = ? " +
                                    "WHERE user_id = ?";

    var user = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        gender : req.body.gender,
        age : req.body.age,
        email : req.body.email,
        telephone : req.body.telephone,
        user_id : req.body.user_id
    }

    let data = [user.firstname, user.lastname, user.gender, user.age, user.email, user.telephone, user.user_id]

    conn.query(sqlQuery, data, (err, recordset) => {
        if (err) {
            res.send({
                "message": err
            });
        } else {
            res.send({
                "message": "User updated"
            });
        }
    })
}

exports.deleteUser = function(req, res, conn) {
    let sqlQuery = "UPDATE user_tbl SET user_isdel = 1 " +
                                    "WHERE user_id = ?";

    var user_id = req.body.user_id;

    let data = [user_id]

    conn.query(sqlQuery, data, (err, recordset) => {
        if (err) {
            res.send({
                "message": err
            });
        } else {
            res.send({
                "message": "User deleted"
            });
        }
    })
}
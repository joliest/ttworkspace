var validation = require('./validation');

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
                message: "Users successfully retrieved"
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

    validation.validateData(req, function(err, message, user) {
        if (err) {
            res.send({
                "message": err.message
            });
        } else {
            let data = [user.firstname, 
                        user.lastname, 
                        user.gender, 
                        user.age, 
                        user.email, 
                        user.telephone];

            var msg ='';
            conn.query(statement, data, (err, results, fields) => {
                if (err) {
                     res.send({
                         "message": "Unable to add user: " + err 
                     });
                 } else {
                     res.send({    
                        "status": "200", 
                         "message": "User added",
                         user
                     });
                 }
             })
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
    let statement = "UPDATE user_tbl SET firstname = ?, " +
                                        "lastname = ?, " +
                                        "gender = ?, " +
                                        "age = ?, " +
                                        "email = ?, " +
                                        "telephone = ? " +
                                    "WHERE user_id = ?";

    let user_id = req.body.user_id;

    let isUserIdValid = user_id ? user_id : null;

    if(isUserIdValid) {
        validation.validateData(req, function(err, message, user) {
            if (err) {
                res.send({
                    "message": err.message
                });
            } else {
                let data = [user.firstname, 
                            user.lastname, 
                            user.gender, 
                            user.age, 
                            user.email, 
                            user.telephone,
                            user_id];
    
                conn.query(statement, data, (err, results, fields) => {
                    if (err) {
                         res.send({
                             "message": "Unable to update user: " + err 
                         });
                     } else if (results.affectedRows === 0) {
                        res.send({
                            "message": "user_id doesn't exists"
                        });
                     } else {
                         res.send({
                            "status": "200", 
                             "message": "User updated",
                             user
                         });
                     }
                 })
            }
        })
    } else {
        res.send({
            "message": "user_id doesn't exists"
        });
    }

    
    
}

exports.deleteUser = function(req, res, conn) {
    let sqlQuery = "UPDATE user_tbl SET user_isdel = 1 " +
                                    "WHERE user_id = ?";

    let user_id = req.body.user_id;

    let isUserIdValid = user_id ? user_id : null;

    if(isUserIdValid) {
        let data = [user_id]

        conn.query(sqlQuery, data, (err, results) => {
            if (err) {
                res.send({
                    "message": err
                });
            } else if (results.affectedRows === 0) {
                res.send({
                    "message": "user_id doesn't exists"
                });
             } else {
                res.send({
                    "status": "200", 
                    "message": "User deleted"
                });
            }
        })
    } else {
        res.send({
            "message": "user_id is invalid"
        });
    }

    
}
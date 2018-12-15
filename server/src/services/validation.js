exports.validateData = function(request, callback) {
    //call back has three parameters callback(error, message, object)
    let firstname = request.body.firstname;
    let lastname = request.body.lastname;
    let gender = request.body.gender;
    let age = request.body.age;
    let email = request.body.email;
    let telephone = request.body.telephone;
    
    lengthLimit = 50;
    ageLimit = 99;

    let stringList = [
        {
            fieldName: 'First Name',
            value: firstname
        },
        {
            fieldName: 'Last Name',
            value: lastname
        },
        {
            fieldName: 'Gender',
            value: gender
        },
        {
            fieldName: 'Email',
            value: email
        },
        {
            fieldName: 'Telephone',
            value: telephone
        }
    ];

    //validating strings
    for ( i = 0; i < stringList.length; i++) {
        //check if data is not undefined
        var isNotDef = stringList[i].value ? stringList[i].value : null //=> isdef = null
        if (isNotDef) {
            validateString(stringList[i].value, function(validation) {
                if (validation.status === 'invalid') {
                    callback({
                        message: validation.message
                    }, null, null);
                }
            }, stringList[i].fieldName);
        } else {
            let message = stringList[i].fieldName + ' is empty';
            callback({
                message: message
            }, null, null);
        }
    }

    //validating age
    var isAgeNotEmpty = age ? age : null;
    //console.log(isAgeNotEmpty ? 'Age is not empty' : 'Age is empty');
    if (isAgeNotEmpty) {
        validateInteger(age, function(validation) {
            if (validation.status === 'invalid') {
                callback({
                    message: validation.message
                }, null, null);
            }
        }, 'Age')
    } else {
        callback({
            message: 'Age is empty'
        })
    }

    let user = { firstname, lastname, gender, age, email, telephone };

    //if all data provided are valid
    callback(null, "Data is valid", user);
}

function validateInteger(num, callback, fieldName) {

    if(num === '' || num === 'undefined') {
        let message;
        //check if field name is provided to properly address the error 'message'
        if (fieldName !== '' || fieldName !== 'undefined') {
            message = fieldName + ' is empty';
        } else {
            message = "Data is empty";
        }
    }

    //check if value is a number
    if (isNaN(num)) {
        let message = num + ' is not a number';
        callback({
            status: 'invalid',
            message: message
        })
    }

    //check if value exceeds the limit
    if ( num > ageLimit) {
        let message = num + ' exceeds the length limit';
        callback({
            status: 'invalid',
            message: message
        })
    }

    //if value is valid
    callback({
        status: 'valid',
        message: 'Integer provided is valid'
    })
}
 

function validateString(str, callback, fieldName) {
    //check if not empty
    if (str === '' || str === 'undefined') {
        let message;
        //check if field name is provided to properly address the error 'message'
        if (fieldName !== '' || fieldName !== 'undefined') {
            message = fieldName + ' is empty';
        } else {
            message = "Data is empty";
        }

        callback({
            'status': 'invalid',
            'message': message
        })
    } 
    
    //check if it exceeds the limit
    if (str.length > lengthLimit) {
        let message;
        if (fieldName !== '' || fieldName !== 'undefined') {
            message = fieldName + ' exceeds the length limit';
        }
        callback({
            'status': 'invalid',
            'message': message
        })
    }

    callback({
        'status': 'valid',
        'message': 'String provided is valid'
    })
}


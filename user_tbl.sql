use usermanagementdb

CREATE TABLE IF NOT EXISTS user_tbl (
					  user_id int NOT NULL AUTO_INCREMENT, 
					  firstname VARCHAR(50) NOT NULL, 
					  lastname VARCHAR(50) NOT NULL,
					  age INT, 
					  gender VARCHAR(10) NOT NULL, 
                      email VARCHAR(50),
                      telephone VARCHAR(50),
					  date_created DATETIME DEFAULT CURRENT_TIMESTAMP, 
                      date_modified TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                      user_isdel INT DEFAULT 0,
                      PRIMARY KEY(user_id)
                      );
                      
                      
drop table user_tbl

UPDATE user_tbl SET user_isdel = 1 WHERE user_id = 3;

SELECT * FROM user_tbl WHERE user_isdel = 0

DELETE from user_tbl

USE my_db;
CREATE TABLE users (
    empid int NOT NULL AUTO_INCREMENT,
    firstname varchar(100),
    lastname varchar(100),
    overview varchar(300),
    email varchar(30),
    phonenumber varchar(20),
    address varchar(300),
    country varchar(20),
    userrole varchar(10),
    technologies json,
    joiningdate date,
    password varchar(500),
    PRIMARY KEY (empid)
);

INSERT INTO users (firstname, lastname, overview, email, phonenumber, address, country, userrole, technologies, joiningdate)
VALUES ('Tom', 'Erichsen', 'Tester', 'tom.erichsen@gmail.com', '+1|63521 41365', "Missouri", "US", "manager", ["reactjs","nodejs","sql"], "2015-12-17");

SELECT * FROM users WHERE empid = 1;

-- delete cmd To use in sql workbench
SET SQL_SAFE_UPDATES = 0;
DELETE FROM users WHERE empid = 2;
SET SQL_SAFE_UPDATES = 1;

DELETE FROM users WHERE empid = 2;


CREATE TABLE projects (
    projectid int NOT NULL AUTO_INCREMENT,
    name varchar(100),
    unit varchar(100),
    description varchar(300),
    value int,
    technologies json,
    manager varchar(100),
    client varchar(100),
    startdate date,
    enddate date,
    status varchar(20),
    PRIMARY KEY (projectid)
);

INSERT INTO projects (name, unit, description, value, technologies, manager, client, startdate, enddate, status)
VALUES ('Migration to cloud', 'lifesciences', 'Migration', 5000, ["reactjs","nodejs","sql"], "Mohan", "DharmaTech", "2015-12-17", "2020-12-17", "completed");

SELECT * FROM projects WHERE projectid = 1;

DELETE FROM projects WHERE projectid = 2;
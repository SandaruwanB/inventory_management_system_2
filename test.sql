
# create new database
CREATE DATABASE test;

# choose database
USE test;

#create table
CREATE TABLE Employees (
    employee_name VARCHAR (100), 
    date_of_birth DATE,
    department_id INT,
);

# insert data
INSERT INTO Employees(employee_name,date_of_birth,department_id) 
    VALUES("Kasun Samaranayaka","1990-10-12",10);

# view data
SELECT * FROM Employees;

# delete data
DELETE FROM Employees WHERE department_id=10;

# update data
UPDATE Employees SET employee_name="Kasun Samaranayake", date_of_birth="1993-10-05" WHERE department_id=10;
UPDATE Employees SET date_of_birth="2005-10-05" WHERE department_id=10;

# add new column to the table
ALTER TABLE Employees ADD email VARCHAR (100);

# delete column from table
ALTER TABLE Employees DROP COLUMN email;

# delete table
DROP TABLE Employees;

# create table with primary key
CREATE TABLE Students (
    student_id INT PRIMARY KEY, 
    name VARCHAR (100),
    address VARCHAR (255),
    contact_number VARCHAR (50)
);

# insert data
INSERT INTO Students VALUES(1, "Kumara", "Matale", "1265136");

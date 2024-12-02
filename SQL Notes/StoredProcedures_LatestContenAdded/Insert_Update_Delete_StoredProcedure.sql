
-- Create Employee Table
CREATE TABLE Employee (
  Id INT PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Department VARCHAR(100) NOT NULL,
  Salary FLOAT NOT NULL,
  Gender VARCHAR(45) NOT NULL,
  Age INT NOT NULL,
  City VARCHAR(45) NOT NULL
);



-- Populate Employee Table
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1001, 'John Doe', 'IT', 35000, 'Male', 25, 'London');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1002, 'Mary Smith', 'HR', 45000, 'Female', 27, 'London');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1003, 'James Brown', 'Finance', 50000, 'Male', 28, 'London');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1004, 'Mike Walker', 'Finance', 50000, 'Male', 28, 'London');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1005, 'Linda Jones', 'HR', 75000, 'Female', 26, 'London');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1006, 'Anurag Mohanty', 'IT', 35000, 'Male', 25, 'Mumbai');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1007, 'Priyanla Dewangan', 'HR', 45000, 'Female', 27, 'Mumbai');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1008, 'Sambit Mohanty', 'IT', 50000, 'Male', 28, 'Mumbai');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1009, 'Pranaya Kumar', 'IT', 50000, 'Male', 28, 'Mumbai');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1010, 'Hina Sharma', 'HR', 75000, 'Female', 26, 'Mumbai');



select *
from   Employee



/*

EXECUTE ManageEmployee 'INSERT', 1011, 'New Employee', 'IT', 40000, 'Male', 30, 'New York';

EXECUTE ManageEmployee 'UPDATE', 1001, 'Updated Name', 'IT', 40000, 'Male', 30, 'New York';

EXECUTE ManageEmployee 'DELETE', 1001, NULL, NULL, NULL, NULL, NULL, NULL;

*/



-- Create or Replace Stored Procedure

CREATE PROCEDURE ManageEmployee
                                   @action VARCHAR(10),
                                   @empId INT,
                                   @empName VARCHAR(100),
                                   @empDepartment VARCHAR(100),
                                   @empSalary FLOAT,
                                   @empGender VARCHAR(45),
                                   @empAge INT,
                                   @empCity VARCHAR(45)

as
BEGIN



    IF @action = 'INSERT' 
	  begin
        -- Insert a new employee
        INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City)
        VALUES (@empId, @empName, @empDepartment, @empSalary, @empGender, @empAge, @empCity);

       end


    IF @action = 'UPDATE' 
	begin
        -- Update an existing employee
        UPDATE Employee
        SET
            Name = @empName,
            Department = @empDepartment,
            Salary = @empSalary,
            Gender = @empGender,
            Age = @empAge,
            City = @empCity
        WHERE Id = @empId;

end

    if @action = 'DELETE'
	begin
        -- Delete an employee
        DELETE FROM Employee
        WHERE Id = @empId;

		end

    
END






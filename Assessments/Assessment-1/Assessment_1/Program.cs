using Assessment_1;
using static Assessment_1.Question_2;

internal class Program
{
    public static void Main(string[] args)
    {

        //Question 1
        // Create an instance of class
        //Question_1 question1 = new Question_1();

        //Console.Write("Enter the count : ");
        //int count = int.Parse(Console.ReadLine());

        ////Call the GetFibonacciSeries method
        //var fibonacciSeries = question1.GetFibonacciSeries(count);
        //Console.WriteLine($"Fibonacci Series of {count} numbers : ");

        ////Print the Fibonacci series
        //foreach (var item in fibonacciSeries)
        //{
        //    Console.WriteLine(item);
        //}



        //Question 3
        //// Create a list of numbers
        //List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
        //// Call the SquareNumbers method
        //var squaredNumbers = Question_3.SquareNumbers(numbers);

        //Console.WriteLine("Squared Numbers : ");
        //// Print the squared numbers
        //foreach (int number in squaredNumbers)
        //{
        //    Console.WriteLine(number);
        //}



        //Question 4
        //// Create a list of numbers
        //List<int> numbersList = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        //// Call the FilterAndSort method
        //var filteredNumbers = Question_4.FilterAndSort(numbersList);
        //// Print the filtered and sorted numbers
        //foreach (string number in filteredNumbers)
        //{
        //    Console.WriteLine(number);
        //}



        //Question 2

        // Create a list of departments
        List<Department> departments = new List<Department>
                {
                    new Department { DepartmentId = 1, DepartmentName = "Sales" },
                    new Department { DepartmentId = 2, DepartmentName = "Marketing" },
                    new Department { DepartmentId = 3, DepartmentName = "Finance" },
                    new Department { DepartmentId = 4, DepartmentName = "HR" },
                    new Department { DepartmentId = 5, DepartmentName = "IT" }
                };

        // Create a list of employees
        List<Employee> employees = new List<Employee>
                {
                    new Employee { EmployeeId = 1, EmployeeName = "Ayush More", DepartmentId = 1 },
                    new Employee { EmployeeId = 2, EmployeeName = "Ritik Shouken", DepartmentId = 2 },
                    new Employee { EmployeeId = 3, EmployeeName = "Atharva Taide", DepartmentId = 3 },
                    new Employee { EmployeeId = 4, EmployeeName = "Grisha Meshram", DepartmentId = 4 },
                    new Employee { EmployeeId = 5, EmployeeName = "Vinit Pathak", DepartmentId = 5 },
                    new Employee { EmployeeId = 6, EmployeeName = "Rohit Thakre", DepartmentId = 1 },
                    new Employee { EmployeeId = 7, EmployeeName = "Suraj Sharma", DepartmentId = 2 },
                    new Employee { EmployeeId = 8, EmployeeName = "Ashutosh Gupta", DepartmentId = 3 },
                    new Employee { EmployeeId = 9, EmployeeName = "Karan Mandve", DepartmentId = 4 },
                    new Employee { EmployeeId = 10, EmployeeName = "Madhura Meshram", DepartmentId = 5 },
                    new Employee { EmployeeId = 11, EmployeeName = "Ayan Khan", DepartmentId = 1 },
                    new Employee { EmployeeId = 12, EmployeeName = "Rahul Choudhary", DepartmentId = 2 },
                    new Employee { EmployeeId = 13, EmployeeName = "Gaurav Sonurkar", DepartmentId = 3 },
                    new Employee { EmployeeId = 14, EmployeeName = "Vanshika Kadu", DepartmentId = 4 },
                    new Employee { EmployeeId = 15, EmployeeName = "Vivek Bokde", DepartmentId = 5 },
                    new Employee { EmployeeId = 16, EmployeeName = "Rounit Sharma", DepartmentId = 1 },
                    new Employee { EmployeeId = 17, EmployeeName = "Mayur Rawat", DepartmentId = 2 },
                    new Employee { EmployeeId = 18, EmployeeName = "Sandesh More", DepartmentId = 3 },
                    new Employee { EmployeeId = 19, EmployeeName = "Kapil Dev", DepartmentId = 4 },
                    new Employee { EmployeeId = 20, EmployeeName = "Sushmit Gupta", DepartmentId = 5 }
                };

        // Call the GetEmployeeDetails method
        var employeeDetails = EmpDetails.GetEmployeeDetails(employees, departments);

        Console.WriteLine("Employees Detail List\n");
        // Print the employee details
        foreach (var item in employeeDetails)
        {
            Console.WriteLine($"Employee ID: {item.EmployeeId}");
            Console.WriteLine($"Employee Name: {item.EmployeeName}");
            Console.WriteLine($"Department Name: {item.DepartmentName}");
            Console.WriteLine();
        }
    }
}
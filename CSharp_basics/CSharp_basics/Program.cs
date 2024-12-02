using CSharp_basics;
using CSharp_basics.temp;


/* Class Usage
 * A class is a blueprint for creating objects that 
 * encapsulate data and behavior.
 */
Car car = new Car("Toyota", "Corolla");
car.Drive();  // Output: Driving a Toyota Corolla
    
/* Interface Usage
 * An interface defines a contract that must be
 * implemented by classes.
 */
IDriveable myBike = new Bike();
myBike.Start();  // Output: Bike started.
myBike.Stop();   // Output: Bike stopped.

/* Record usage
 * A record is a reference type in C# primarily 
 * used for immutable data models 
 * and supports value-based equality.
 */

/*Record usage
 * A record is a reference type in C# primarily 
 * used for immutable data models and supports 
 * value-based equality.
 */
var person1 = new Person("John", "Doe");
var person2 = new Person("John", "Doe");

Console.WriteLine(person1 == person2);  // Output: True (because of value-based equality)

/*Var usage
 * The var keyword allows you to declare a variable 
 * with implicit typing, 
 * letting the compiler infer the type.
 */
// Implicitly typed local variable
var message = "Hello, World!";  // Compiler infers that message is of type string
Console.WriteLine(message);     // Output: Hello, World!

var number = 42;                // Compiler infers that number is of type int
Console.WriteLine(number);      // Output: 42

/* Access Specifiers usage 
 * Access specifiers control the accessibility of 
 * classes, methods, and fields.
 * Common ones are public, private, 
 * protected, and internal.
 */
var employee = new Employee
{
    Name = "Alice",
    Company = "TechCorp"
};
employee.ShowDetails();  // Output: Name: Alice, Company: TechCorp


/* Abstract Types usage 
 * An abstract class cannot be instantiated 
 * and can contain abstract methods, 
 * which must be implemented by derived classes.
 */

Animal myDog = new Dog();
myDog.Speak();  // Output: Woof!
myDog.Eat();    // Output: Eating...
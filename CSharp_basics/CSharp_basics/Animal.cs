using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSharp_basics
{
    public abstract class Animal
    {
        // Abstract method: No implementation in the base class
        public abstract void Speak();


        // Regular method with implementation
        public void Eat()
        {
            Console.WriteLine("Eating...");
        }
    }

    public class Dog : Animal
    {
        // Implementing the abstract method
        public override void Speak()
        {
            Console.WriteLine("Woof!");
        }
    }
}

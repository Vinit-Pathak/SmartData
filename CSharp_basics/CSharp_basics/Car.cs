using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSharp_basics
{
    public class Car
    {
        // Fields (private members)
        private string _make;
        private string _model;

        // Constructor
        public Car(string make, string model)
        {
            _make = make;
            _model = model;
        }

        // Public property
        public string Make
        {
            get { return _make; }
            set { _make = value; }
        }

        // Public method
        public void Drive()
        {
            Console.WriteLine($"Driving a {_make} {_model}");
        }
    }
}

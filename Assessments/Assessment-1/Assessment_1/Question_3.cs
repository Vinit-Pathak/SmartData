using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment_1
{
    internal class Question_3
    {
        public static List<int> SquareNumbers(List<int> numbers)
        {
            // Create a lambda expression to square a number using the Func delegate
            Func<int, int> square = x => x * x;
            return numbers.Select(square).ToList();
        }

    }
}

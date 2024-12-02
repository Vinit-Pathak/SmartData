using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment_1
{
    public class Question_1
    {
        public List<int> GetFibonacciSeries(int count)
        {
            // Create a list to store the Fibonacci series 
            List<int> fibonacciSeries = new List<int>();

            // Add the first two terms of the series to the list
            if (count >= 1)
            {
                fibonacciSeries.Add(0);
            }
            // Add the second term of the series to the list
            if (count >= 2)
            {
                fibonacciSeries.Add(1);
            }
            // Add the remaining terms of the series to the list
            for (int i = 2; i < count; i++)
            {
                int nextTerm = fibonacciSeries[i - 1] + fibonacciSeries[i - 2];
                fibonacciSeries.Add(nextTerm);
            }

            return fibonacciSeries; 
        }
    }
}

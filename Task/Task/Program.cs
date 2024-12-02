namespace Task
{
    public class Program
    {
        static void Main(string[] args)
        {

            int[] array = { 3, 5, 1, 88, 4, 73, 6, 2};


            int max = int.MinValue;
            int min = int.MaxValue;
            int secondLargest = int.MaxValue;

            foreach (var num in array)
            {
                if(num > max)
                {
                    secondLargest = max;
                    max = num;

                }
                if (num > secondLargest && num != max)
                {
                    secondLargest = num;
                }
                if(num < min)
                {
                    min = num;
                }
            }

            Console.WriteLine($"min : {min}");
            Console.WriteLine($"max : {max}");
            Console.WriteLine($"second largest : {secondLargest}");
        }
    }
}

namespace Assessment_1
{
    public class Question_4
    {
        public static List<string> FilterAndSort(List<int> numbers)
        {
            // Filter the numbers that are divisible by 3
            List<int> filteredNumbers = numbers.Where(n => n % 3 == 0).OrderBy(n => n).ToList();
            // Create a list to store the result
            List<string> result = filteredNumbers.Select(n => $"The number {n} ").ToList();
            return result; 
        }
    }
}

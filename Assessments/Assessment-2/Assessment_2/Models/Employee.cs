using System.ComponentModel.DataAnnotations;

namespace Assessment_2.Models
{
    public class Employee
    {
        //Employee properties
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        public string Position { get; set; }

        [Required]
        [StringLength(50)]
        public string Department { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Salary { get; set; }
    }
}

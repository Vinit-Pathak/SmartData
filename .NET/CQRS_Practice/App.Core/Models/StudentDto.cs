using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Models
{
    public class StudentDto
    {
        public int StudentId { get; set; }
        public string Name {  get; set; }
        public string Email { get; set; }
        public int CourseId { get; set; }
    }
}

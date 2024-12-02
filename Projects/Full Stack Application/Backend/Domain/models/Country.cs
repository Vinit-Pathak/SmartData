using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.models
{
    public class Country
    {
        [Key]
        public int id { get; set; }
        public string shortname { get; set; }
        public string name { get; set; }
        public string phonecode { get; set; }
    }
}

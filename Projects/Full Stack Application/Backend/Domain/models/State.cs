using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.models
{
    public class State
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }

        [ForeignKey("Country")]
        public int country_id { get; set; }

        public Country Country { get; set; }
    }
}

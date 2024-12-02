using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.models
{
    public class City
    {
        public int id { get; set; }
        public string name { get; set; }
        [ForeignKey("State")]
        public int state_id { get; set; }
        public State State { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Country
    {
        public int CountryId { get; set; }
        public string SortName { get; set; }
        public string Name { get; set; }
        public int PhoneCode { get; set; }
    }
}

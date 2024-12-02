using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSharp_basics
{
    public interface IDriveable
    {
        void Start();
        void Stop();
    }
    public interface IOffice
    {
        void PunchIn();
        void PunchOut();
    }

    public class SmartData: IOffice
    {
        public void PunchIn()
        {
            Console.WriteLine("Bike started.");
        }

        public void PunchOut()
        {
            Console.WriteLine("Bike stopped.");
        }
    }

    public class Bike : IDriveable
    {
        public void Start()
        {
            Console.WriteLine("Bike started.");
        }

        public void Stop()
        {
            Console.WriteLine("Bike stopped.");
        }
    }
    public class Cycle : IDriveable
    {
        public void Start()
        {
            Console.WriteLine("Cycle started.");
        }

        public void Stop()
        {
            Console.WriteLine("Bike stopped.");
        }
    }
}

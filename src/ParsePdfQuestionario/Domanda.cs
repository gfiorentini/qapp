using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pdf2Text
{
    public class Domanda
    {
        public string TestoDomanda { get; set;  }
        public List<Risposta> Risposte = new List<Risposta>();

    }
    public class Risposta
    {
        public bool Corretta { get; set; }
        public string Text { get; set; }
    }
}

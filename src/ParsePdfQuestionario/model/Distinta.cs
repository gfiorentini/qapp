using Pdf2Text.utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pdf2Text.model
{
    public class Distinta
    {
        public string HeaderRow = null;

        public Pratica pratica;
        
        public LegaleRappresen legaleRappr;

        public Ente ente;
    }

    public class Pratica {
        public string Codice;
        public string CompilataIlAlle;

        public Pratica parse(List<string> rows, ref int idx)
        {
            string currow = rows[idx++];
            string codicePrat = TextMatchRow.matchData(currow, "Codice Pratica", false);

            currow = rows[idx++];
            string compilataIl = TextMatchRow.matchData(currow, "compilata il", false);
            Pratica p = new Pratica() { Codice = codicePrat, CompilataIlAlle = compilataIl };
            return p;
        }

    }

    public class LegaleRappresen {
        
        public string CognomeNome;      /**/ /* ==> parse senza delimitatore : */
        public string CF;           /**/
        public string Telefono;
        public string IndirizzoPEC; /**/

        public LegaleRappresen parse(List<string> rows, ref int idx)
        {
            LegaleRappresen l = new LegaleRappresen();
            string currow = rows[idx++];
            l.CognomeNome = TextMatchRow.matchData(currow, "Il sottoscritto", false);

            currow = rows[idx++];
            l.CF = TextMatchRow.matchData(currow, "Codice Fiscale", false);

            currow = rows[idx++];
            l.Telefono = TextMatchRow.matchData(currow, "Telefono");

            currow = rows[idx++];
            l.IndirizzoPEC = TextMatchRow.matchData(currow, "Indirizzo PEC",false );

            return l;
        }

    }

    public class Ente
    {
        public string InQualitaDi;
        public string Denominazione;
        public string Provincia;
        public string CodiceFiscale;

        public Ente parse(List<string> rows, ref int idx)
        {
            Ente l = new Ente();
            string currow = rows[idx++];
            l.InQualitaDi = TextMatchRow.matchData(currow, "in qualita' di", false);

            currow = rows[idx++];
            l.Denominazione = TextMatchRow.matchData(currow, "dell'Ente", false);

            currow = rows[idx++];
            l.Provincia = TextMatchRow.matchData(currow, "con sede in prov.",false);

            currow = rows[idx++];
            l.CodiceFiscale = TextMatchRow.matchData(currow, "Cod. Fiscale", false);

            return l;
        }
    }

}

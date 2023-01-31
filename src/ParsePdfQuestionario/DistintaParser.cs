using iTextSharp.text.pdf;
using iTextSharp.text.pdf.parser;
using Pdf2Text.model;
using Pdf2Text.utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pdf2Text
{
    public class DistintaParser
    {
        private string _sourcePdfFileNameAndPath;

        public DistintaParser( string sourceFilePdf )
        {
            this._sourcePdfFileNameAndPath = sourceFilePdf;
        }



        public List<Domanda> parse ()
        {
            /*
             phase-1 - extract text in rows
             */
            List<string> rows = GetRows(this._sourcePdfFileNameAndPath);
            /*
             phase-2 - try to build model.
             */
            int idx = 0;

            idx = 12;
            //
            List<Domanda> res = new List<Domanda>();
            //
            rows = mergePrepareRows(rows);

            // dalla riga corrente parseDomanda estrae la domanda e tutte le risposte
            while (idx < rows.Count-2) { 
                string domanda = parseDomanda(rows, ref idx);
                
                List<string> risposte = parseRisposte(rows, ref idx);
                //
                idx--;
                //
                //if (risposte[0][0] != 'A')
                //{
                //    throw new ApplicationException();
                //}                

                if (risposte.Count != 4) { continue; }
                //
                Domanda d = new Domanda();
                d.TestoDomanda = domanda;
                d.Risposte = new List<Risposta>();
                //
                for(int i = 0; i<risposte.Count; i++)
                {
                    d.Risposte.Add(new Risposta() { Text = risposte[i], Corretta=(i==0) }); 
                }
                //
                res.Add(d);
            }
            // -----------

            return res;
        }

        private List<string> mergePrepareRows(List<string> rows)
        {
            List<string> m = new List<string>();
            for (int i =0; i < rows.Count; i++)
            {
                if (rows[i].StartsWith("pagin", StringComparison.InvariantCultureIgnoreCase))
                {
                    continue;
                }
                if (rows[i].Length == 1)
                {
                    // if ("ABCD".IndexOf(rows[i][0])>=0)
                    //{
                        string s = rows[i] + " " + rows[i + 1];
                        m.Add(s);
                        i = i + 1;
                    // }
                } else
                {
                    string[] parts = rows[i].Split(' ');
                    int n;
                    if (int.TryParse(parts[0], out n ) && (parts.Length == 1 ))
                    {
                        string s = rows[i] + " " + rows[i + 1];
                        m.Add(s);
                        i = i + 1;
                    }else
                    {
                        m.Add(rows[i]);
                    }
                } 
            }
            return m;
        }

        bool isDomanda (string r )
        {
            string[] parts = r.Split(' ');
            int n;
            return int.TryParse(parts[0], out n);
        }


        private List<string> parseRisposte(List<string> rows, ref int idx)
        {
            List<string> risposte = new List<string>();
            // nnn
            // A,B,C,D zzzzzz
            bool fine = false;
            char idRisposta = ' ';
            char idRispostaNew = ' ';
            //
            string reply = "";
            //
            while (!fine)
            {
                if ( idx+1 >= rows.Count )
                {
                    risposte.Add(rows[idx]);
                    fine = true;
                    continue;
                }
                bool bisDomanda = isDomanda(rows[idx]);
                bool bisReply = isReply(rows[idx]);
                bool bisReply2 = isReply(rows[idx + 1]);
                //
                if ((bisDomanda) && (risposte.Count >=3)) { 
                    fine = true; 
                    if (reply.Length > 0)
                    {
                        risposte.Add(reply);
                    }
                } 
                else 
                {
                    if (bisReply && bisReply2)
                    {
                        risposte.Add(rows[idx]);
                        reply = "";
                    } 
                    if (!bisReply && bisReply2 )
                    {
                        reply += " " + rows[idx];
                        risposte.Add(reply);
                        reply = "";
                    }
                    if (bisReply && !bisReply2)
                    {
                        reply = rows[idx];
                    }
                    if (!bisReply && !bisReply2)
                    {
                        reply += " " + rows[idx];
                    }
                }
                idx++;

            }
            //
            List<string> risposteSenzaId = new List<string>();
            for (int j = 0; j < risposte.Count; j++)
            {
                string[] parts = risposte[j].Split(' ');
                // OK
                risposteSenzaId.Add(risposte[j].Substring(parts[0].Length));
                // TEST CODE risposteSenzaId.Add(risposte[j]);
                // risposteSenzaId.Add(risposte[j]);
            }
            return risposteSenzaId;
        }
        /// <summary>
        /// dalla riga corrente estrae la domanda completa
        /// </summary>
        /// <param name="rows"></param>
        /// <param name="idx"></param>
        /// <returns></returns>
        private string parseDomanda(List<string> rows, ref int idx)
        {
            // nnn
            // nnn zzzzzz
            string currow = rows[idx];
            string[] parts = currow.Split(' ');
            // controllo se la prima parte è un numero
            int n;
            if (int.TryParse(parts[0], out n))
            {
                string domanda = String.Empty;
                if (parts.Length > 1) domanda = currow.Substring(parts[0].Length + 1);   // inizializza la domanda con tutto ciò che segue il numero domanda
                idx++;
                // 
                bool fineLetturaDomanda = false;
                while (fineLetturaDomanda == false)
                {
                    string[] parts2 = rows[idx].Split(' ');
                    if (isReply(parts2[0])) { 
                        fineLetturaDomanda = true; 
                        // lettura delle risposte
                    }
                    else
                    {
                        domanda += " " + rows[idx];
                        idx++;
                    }

                }
                return domanda;
            } else
            {
                return null;
            }
        }

        private string completeDomanda (List<string> rows, ref int idx  )
        {
            idx = idx + 1 ;
            string domanda = rows[idx];
            //
            idx++;
            bool isreply = false;
            while (!isreply)
            {
                if (isReply(rows[idx+1]))
                {
                    // è una risposta
                    isreply = true;
                } else
                {
                    
                    // aggiungo alla domanda
                    domanda += " " + rows[idx+1];
                    idx++;
                }
            }
            return domanda;
        }

        private bool isReply ( string s )
        {
            string ss = String.Empty;
            string[] parts = s.Split(' ');
            if (parts.Length > 0)
            {
                ss = parts[0];
            } else
            {
                ss = s;
            }

            if (ss.Length > 1) return false;
            if ("ABCD".IndexOf(ss) >= 0 )
                {
                    return true;
                }
            return false;
        }
        

        private List<string> GetRows(string sourceFilePath)
        {
            List<string> rows = new List<string>();
            //
            var txt = extractTextFromPdf(sourceFilePath);
            foreach (string s in txt.Split('\n'))
            {
                rows.Add(s);
            }
            return rows;
        }

        /// <summary>
        /// Extracts a text from a PDF file.
        /// </summary>
        /// <param name="filePath">the full path to the pdf file.</param>
        /// <returns>the extracted text</returns>
        private string extractTextFromPdf(string filePath)
        {
             filePath = @"D:\PROGETTI\Pdf2Text\testdata\Dir_Amm_vo.pdf";
            var sb = new StringBuilder();
            try
            {
                using (PdfReader reader = new PdfReader(filePath))
                {
                    string prevPage = "";
                    for (int page = 1; page <= reader.NumberOfPages; page++)
                    {
                        ITextExtractionStrategy its = new SimpleTextExtractionStrategy();
                        its = new LocationTextExtractionStrategy();
                        var s = PdfTextExtractor.GetTextFromPage(reader, page, its);
                        if (prevPage != s) sb.Append(s);
                        prevPage = s;
                    }
                    reader.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            return sb.ToString();
        }

    }
}

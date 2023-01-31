using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iTextSharp.text.pdf;
using iTextSharp.text.pdf.parser;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Pdf2Text;
using Pdf2Text.model;
using Path = System.IO.Path;

namespace PDF
{



    /// <summary>
    /// Parses a PDF file and extracts the text from it.
    /// </summary>
    public static class PDFParser
    {

        static void Main(string[] args)
        {
            string testData = Path.Combine(Path.Combine(Environment.CurrentDirectory, "testdata"), "Dir_Amm_vo.pdf");

            DistintaParser dp = new DistintaParser(testData);
            //
            List<Domanda> d = dp.parse();

            JsonSerializer serializer = new JsonSerializer();
            serializer.Converters.Add(new JavaScriptDateTimeConverter());
            serializer.NullValueHandling = NullValueHandling.Ignore;
            serializer.Formatting = Formatting.Indented;

            using (StreamWriter sw = new StreamWriter(@"domande.json"))
            using (JsonWriter writer = new JsonTextWriter(sw))
            {
                serializer.Serialize(writer, d);
                // {"ExpiryDate":new Date(1230375600000),"Price":0}
            }
        }




       
    }
}

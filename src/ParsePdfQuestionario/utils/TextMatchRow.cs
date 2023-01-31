using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pdf2Text.utils
{
    public class TextMatchRow
    {

        /// <summary>
        /// Try to convert current row to a keyValue pair
        /// </summary>
        /// <param name="row"></param>
        /// <returns></returns>
        public static string[] splitKeyValue ( string row)
        {
            int idx = row.IndexOf(":");
            if (idx > 0)
            {
                string[] keyVal = new string[2];
                keyVal[0] = row.Substring(0, idx - 1).Trim();
                keyVal[1] = row.Substring(idx + 1);
                return keyVal;
            }
            return null;
        }

        /// <summary>
        /// match and return data
        /// xxxxxx: yyyyyyyy
        /// return yyyyyyy
        /// </summary>
        /// <param name="row"></param>
        /// <param name="head"></param>
        /// <param name="considerDuePunti"></param>
        /// <returns>null if not match, else the right part.</returns>
        public static string matchData(string row, string head, bool considerDuePunti = true)
        {
            string m = head;
            if ((considerDuePunti) && (!m.EndsWith(":")))
            {
                m = m + ":";
            }
            string retdata = null;
            if (row.StartsWith(m, StringComparison.InvariantCultureIgnoreCase))
            {
                retdata = row.Substring(m.Length).Trim();
            }
            return retdata;   
        }
    }
}

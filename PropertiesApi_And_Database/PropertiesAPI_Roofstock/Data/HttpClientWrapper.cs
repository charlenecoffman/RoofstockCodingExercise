using System.IO;
using System.Net;

namespace PropertiesAPI
{
    public class HttpClientWrapper : IHttpClientWrapper
    {
        public string CallClient(string url, string method)
        {
            var WebReq = (HttpWebRequest)WebRequest.Create(url);
            WebReq.Method = method;
            var WebResp = (HttpWebResponse)WebReq.GetResponse();

            string jsonString;
            using (Stream stream = WebResp.GetResponseStream())
            {
                StreamReader reader = new StreamReader(stream, System.Text.Encoding.UTF8);
                jsonString = reader.ReadToEnd();
            }

            return jsonString;
        }
    }
}

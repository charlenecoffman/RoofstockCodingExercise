namespace PropertiesAPI
{
    public interface IHttpClientWrapper
    {
        string CallClient(string url, string method);
    }
}
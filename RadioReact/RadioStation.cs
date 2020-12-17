namespace RadioReact
{
    public class RadioStation
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string CountryCode { get; set; }
        public string[] Genres { get; set; }
        public string[] Languages { get; set; }
    }
}
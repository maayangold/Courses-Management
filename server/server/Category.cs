namespace server
{
    public class Category
    {
        private static int counter = 0;
        public int id { get; }
        public string name { get; set; }
        public string icon { get; set; }

        public Category(string name, string icon)
        {
            id = ++counter;
            this.name = name; 
            this.icon = icon;
        }
    }
}

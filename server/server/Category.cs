namespace server
{
    public class Category
    {
        private static int counter = 0;
        public int Id { get; }
        public string Name { get; set; }
        public string Icon { get; set; }

        public Category(string name, string icon)
        {
            Id = ++counter;
            Name = name;
            Icon = icon;
        }
    }
}

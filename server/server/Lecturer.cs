namespace server
{
    public class Lecturer
    {

        private static int counter = 0;
        public int id { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string email { get; set; }
        public string password { get; set; }

        public Lecturer(string name, string address, string email, string password)
        {
            id = ++counter;
            this.name = name;
            this.address = address;
            this.email = email;
            this.password = password;
        }
    }
}

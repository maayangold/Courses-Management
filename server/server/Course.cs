using System.Security.Cryptography;

namespace server
{
    public enum LearningMethod { Frontal = 1, Zoom, DiscussionBased }

    public class Course
    {
        private static int counter = 0;
        public int id { get; set; }
        public string name { get; set; }
        public int categoryId { get; set; }
        public int lecturerId { get; set; }
        public int numberOfLessons { get; set; }
        public DateTime learningStart { get; set; }
        public string[] syllabus { get; set; }
        public LearningMethod learningMethod { get; set; }
        public string picture { get; set; }

        public Course(string name, int categoryId, int lecturerId, int numberOfLessons, DateTime learningStart, string[] syllabus, LearningMethod learningMethod, string picture)
        {
            id = ++counter;
            this.name = name;
            this.categoryId = categoryId;
            this.lecturerId = lecturerId;
            this.numberOfLessons = numberOfLessons;
            this.learningStart = learningStart;
            this.syllabus = syllabus;
            this.learningMethod = learningMethod;
            this.picture = picture;
        }
    }
}

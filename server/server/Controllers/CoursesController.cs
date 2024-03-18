using Microsoft.AspNetCore.Mvc;
using server;
using System;
using System.Collections.Generic;
using System.Linq;
using static System.Net.WebRequestMethods;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private static readonly List<Category> Categories = new List<Category>
        {
            new Category("Camputer an AI", "assets\\categories\\computers.png"),
            new Category("Math", "assets\\categories\\math.webp"),
            new Category("English", "assets\\categories\\english.svg"),
            new Category("Biology", "assets\\categories\\biology.png"),
            new Category("Literature", "assets\\categories\\literature.png")
        };

        private static readonly List<Course> Courses = new List<Course>
       {
          new Course("Computer Course", 1, 2, 100, DateTime.Today, new string[] { "Angular project" }, LearningMethod.Frontal, "assets\\courses\\computers.jpg"),
          new Course("Mathematics Course", 2, 1, 20, DateTime.Today, new string[] { "Introduction to Algebra", "Geometry Fundamentals", "Trigonometry Basics", "Calculus Principles", "Applications of Mathematics in Real Life", "Problem-solving Techniques" }, LearningMethod.Frontal, "assets\\courses\\math.jpg"),
          new Course("English Course", 3, 2, 20, new DateTime(2024,2, 15), new string[] { "Grammar Basics", "Vocabulary Building", "Reading Comprehension", "Writing Skills", "Listening and Speaking Practice" }, LearningMethod.Frontal, "assets\\courses\\english.jpg"),
          new Course("Biology Course", 4, 2, 20, DateTime.Today, new string[] { "Cell Biology", "Germs", "Experiments" }, LearningMethod.Zoom, "assets\\courses\\biology.jpg"),
          new Course("Literature Course", 5, 3, 20, DateTime.Today, new string[] { "Text Preprocessing", "Language Modeling", "Text Classification", "Named Entity Recognition", "Machine Translation" }, LearningMethod.DiscussionBased, "assets\\courses\\literature.jpg"),
         };

        public static List<Lecturer> Lecturers = new List<Lecturer>
        {
            new Lecturer ("lec1", "Bney-Brak","lec1@gmail.com","l111"),
            new Lecturer("lec2", "Netanya ", "lec@gmail.com", "l222"),
            new Lecturer ("lec3", "Jerusalem", "lecA@gmail.com", "l333")
        };

        // GET: api/Courses
        [HttpGet]
        public IEnumerable<Course> Get()
        {
            return Courses;
        }

        // GET api/Courses/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var course = Courses.FirstOrDefault(c => c.id == id);
            if (course == null)
                return NotFound();

            return Ok(course);
        }

        // POST api/Courses
        [HttpPost]
        public IActionResult Post([FromBody] Course course)
        {
            if (course == null)
                return BadRequest("Invalid data.");

            Courses.Add(new Course(course.name, course.categoryId, course.lecturerId, course.numberOfLessons, course.learningStart, course.syllabus, course.learningMethod, course.picture));
            return Ok(true);
        }

        // PUT api/Courses/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Course updatedCourse)
        {
            Course courseToUpdate = Courses.Find(c => c.id == id);
            if (courseToUpdate != null)
            {
                // Update course's data
                courseToUpdate.name = updatedCourse.name;
                courseToUpdate.categoryId = updatedCourse.categoryId;
                courseToUpdate.lecturerId = updatedCourse.lecturerId;
                courseToUpdate.numberOfLessons = updatedCourse.numberOfLessons;
                courseToUpdate.learningStart = updatedCourse.learningStart;
                courseToUpdate.syllabus = updatedCourse.syllabus;
                courseToUpdate.learningMethod = updatedCourse.learningMethod;
                courseToUpdate.picture = updatedCourse.picture;

                return Ok(true);
            }
            return NotFound();
        }

        // DELETE api/Courses/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var course = Courses.FirstOrDefault(c => c.id == id);
            if (course != null)
            {
                Courses.Remove(course);
                return Ok(true);
            }
            return NotFound();
        }
        [HttpGet("categories")]
        public IEnumerable<Category> GetAllCategories()
        {

            return Categories;
        }
        [HttpGet("lecturers")]
        public IEnumerable<Lecturer> GetAllLecturers()
        {

            return Lecturers;
        }
    }
}

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
            new Category("Camputer an AI", "https://cdn-icons-png.flaticon.com/512/3067/3067260.png"),
            new Category("Math", "https://cdn.iconscout.com/icon/free/png-256/free-math-1963506-1657007.png?f=webp"),
            new Category("English", "https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/english-speaking-icon.svg"),
            new Category("Biology", "https://cdn-icons-png.freepik.com/512/1186/1186638.png"),
            new Category("Literature", "https://static.thenounproject.com/png/3410361-200.png")
        };

        private static readonly List<Course> Courses = new List<Course>
       {
          new Course("Computer Course", 2, 2, 100, DateTime.Today, new string[] { "Angular project" }, LearningMethod.Frontal, "https://www.iberdrola.com/documents/20125/42118/lifelong_746x419.jpg/a68d1b8c-dda1-2dff-27f3-20d5d0a2d30c?t=1630558685791"),
          new Course("Mathematics Course", 1, 1, 20, DateTime.Today, new string[] { "Introduction to Algebra", "Geometry Fundamentals", "Trigonometry Basics", "Calculus Principles", "Applications of Mathematics in Real Life", "Problem-solving Techniques" }, LearningMethod.Frontal, "https://t4.ftcdn.net/jpg/04/61/65/03/360_F_461650383_vOTkFxYQ2T2kvuymieHDHbIWjghyL3DY.jpg"),
          new Course("English Course", 2, 2, 20, new DateTime(2024, 3, 15), new string[] { "Grammar Basics", "Vocabulary Building", "Reading Comprehension", "Writing Skills", "Listening and Speaking Practice" }, LearningMethod.Frontal, "https://pop.education.gov.il/remote.axd?https://meyda.education.gov.il/files/pop/1459/banner_english_847x348-1.jpg?anchor=center&mode=crop&width=1140&height=550&rnd=131259414710000000"),
          new Course("Biology Course", 3, 2, 20, DateTime.Today, new string[] { "Cell Biology", "Germs", "Experiments" }, LearningMethod.Zoom, "https://t3.ftcdn.net/jpg/02/40/23/36/360_F_240233680_ji4z3GpeOKjht3A2AG1wyg9XVcvdrB7R.jpg"),
          new Course("Literature Course", 5, 5, 20, DateTime.Today, new string[] { "Text Preprocessing", "Language Modeling", "Text Classification", "Named Entity Recognition", "Machine Translation" }, LearningMethod.DiscussionBased, "https://meyda.education.gov.il/files/pop/9114/_literature.jpg")
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
        public IActionResult GetAllCategories()
        {
            return Ok(Categories);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using server;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    { 
        public static int Counter = 4;
        public static List<User> users = new List<User>
        {
            new User ("user1", "Bney-Brak","user1@gmail.com","1111"),
            new User("user2", "Netanya ", "user2@gmail.com", "2222"),
            new User ("aaa", "Jerusalem", "userA@gmail.com", "aaaa")
        };

        // GET: api/Users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return users;
        }

        // GET api/Users/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = users.Find(u => u.id == id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        // GET api/Users/name={name}
        [HttpGet("name={name}")]
        public IEnumerable<User> GetByName(string name)
        {
            return users.Where(s => s.name.Contains(name));
        }

        // POST api/Users
        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            if (user == null)
                return BadRequest("Invalid data.");

            user.id = Counter++;
            users.Add(user);
            return Ok(true);
        }

        // PUT api/Users/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User updatedUser)
        {
            User userToUpdate = users.FirstOrDefault(s => s.id == id);
            if (userToUpdate != null)
            {
                // Update user's data
                userToUpdate.name = updatedUser.name;
                userToUpdate.address = updatedUser.address;
                userToUpdate.email = updatedUser.email;
                userToUpdate.password = updatedUser.password;

                return Ok(true);
            }
            return NotFound();
        }

        // DELETE api/Users/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = users.Find(s => s.id == id);
            if (user != null)
            {
                users.Remove(user);
                return Ok(true);
            }
            return NotFound();
        }
    }
}

import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  errorMessage: string = "";
  users: User[] = [];
  userForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.userForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(24)]),
      "password": new FormControl(null, Validators.maxLength[3]),
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
       console.log(this.users)
    });
  }

  login(): void {
    const username = this.userForm.get('name')?.value;
    const password = this.userForm.get('password')?.value;

    const user = this.users.find(u => u.name === username);
    if (user) {
      if (user.password === password) {
        sessionStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(['/courses/allCourses']);
      } 
      else {
        this.errorMessage = "Password Does Not Match";
      }
    }
    else {
      this.router.navigate(['/users/register'], { queryParams: { username: username } });
      this.errorMessage = "Invalid username or password";
    }
  }

  lecturerEntering() {
    const username = this.userForm.get('name')?.value;
    const password = this.userForm.get('password')?.value;
    this.router.navigate(['/courses/loginLecturer'], { queryParams: { username: username, password: password } });
  }
}

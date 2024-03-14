import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { User } from "../models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'login-lecturer',
  templateUrl: './login-lecturer.component.html',
})
export class LoginLecturerComponent implements OnInit {

  errorMessage: string = "";
  users: User[] = [];
  userForm: FormGroup;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.userForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(24)]),
      "password": new FormControl(null, Validators.minLength(3)),
      "course": new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userForm.get('name')?.setValue(params['username'] || '');
      this.userForm.get('password')?.setValue(params['password'] || '');
    });

    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  login(): void {
    const username = this.userForm.get('name')?.value;
    const password = this.userForm.get('password')?.value;

    const user = this.users.find(u => u.name === username);
    if (user) {
      if (user.password === password) {
        sessionStorage.setItem("lecturer", JSON.stringify(user));
        this.router.navigate(['/courses/allCourses']);
      } else {
        this.errorMessage = "Password does not match";
      }
    } else {
      this.router.navigate(['/register'], { queryParams: { username: username } });
      this.errorMessage = "Invalid username or password";
    }
  }

 
}

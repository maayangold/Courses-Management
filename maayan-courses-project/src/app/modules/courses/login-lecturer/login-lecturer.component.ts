import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CourseService } from '../course.service';
import { Lecturer } from '../models/lecturer.model';

@Component({
  selector: 'login-lecturer',
  templateUrl: './login-lecturer.component.html',
})
export class LoginLecturerComponent implements OnInit {

  errorMessage: string = "";
  lecturers: Lecturer[] = [];
  lecturerForm: FormGroup;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private router: Router) {
    this.lecturerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(24)]),
      "password": new FormControl(null, Validators.minLength(3)),
      "course": new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.lecturerForm.get('name')?.setValue(params['username'] || '');
      this.lecturerForm.get('password')?.setValue(params['password'] || '');
    });

    this.courseService.getLecturers().subscribe((data) => {
      this.lecturers = data;
    });
  }

  login(): void {
    const username = this.lecturerForm.get('name')?.value;
    const password = this.lecturerForm.get('password')?.value;

    const lecturer = this.lecturers.find(u => u.name === username);
    if (lecturer) {
      if (lecturer.password === password) {
        sessionStorage.setItem("lecturer", JSON.stringify(lecturer));
        this.router.navigate(['/courses/allCourses']);
      } else {
        this.errorMessage = "Password does not match";
      }
    } else {
     
      this.errorMessage = "This Lecture is not exsist!";
    }
  }

 
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../models/category.model';
import { Course } from '../models/course.model';
import Swal from 'sweetalert2';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',

})
export class EditCourseComponent implements OnInit {
  id: number;
  courseForm: FormGroup = new FormGroup({});
  categories: Category[];
  selectedCategoryId: number;
  stringDate: string;

  _course: Course;
  get course(): Course { return this._course; }
  set course(value: Course) {
    this._course = value;
    if (this.course != undefined) {
      this.courseForm = new FormGroup({
        coursename: new FormControl(this.course.name, [Validators.required]),
        category: new FormControl(this.course.categoryId, [Validators.required]),
        lecturer: new FormControl(this.course.lecturerId, [Validators.required]),
        numberOfLessons: new FormControl(this.course?.numberOfLessons, [Validators.required]),
        learningStart: new FormControl(this.course.learningStart.getDate, [Validators.required]),
        learningMethod: new FormControl(this.course.learningStart, [Validators.required]),
        picture: new FormControl(this.course.picture, [Validators.required]),
        syllabus: new FormControl(this.course.syllabus, [Validators.required]),
      });
    }
  }

  constructor(private _courseService: CourseService, private _actroute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {

    this._actroute.paramMap.subscribe(params => this.id = parseInt(params.get('id')))
    console.log(this.id)

    this._courseService.getCourseById(this.id).subscribe((data) => {
      this.course = data;
    }), (err) => {
      Swal.fire({ icon: "error", title: "error...", text: "There is no Course with such a id number" })
      this._router.navigate(['/course/allCourses'])
    }
    console.log(this.course)
    this._courseService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories)
    })

  };

  getCategory(): Category {
    return this.categories?.filter(c => c.id == this.course.categoryId)[0]
  }
  saveCourse(): void {

    this._courseService.updateCourse(this.id, this.courseForm.value).subscribe({
      next: (data) => {
        Swal.fire({
          position: "top-end", icon: "success", title: 'Perfect',
          text: 'Course has been changed successfuly :)', showConfirmButton: false, timer: 2000
        })
        this._router.navigate(['/course/all'])
      }, error: () => {
        Swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong! course is not valid" })
      }
    })

  }


  cancelEdit() {
    Swal.fire({ icon: "warning", title: "Cancel...", text: "have a nice day" })

    this._router.navigate(['courses/allCourses'])
  }
}

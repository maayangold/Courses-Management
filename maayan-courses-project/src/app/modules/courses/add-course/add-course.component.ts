import { Component, Input } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from '../course.service';
import Swal from 'sweetalert2';
import { Category } from '../models/category.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Lecturer } from '../models/lecturer.model';
@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
})
export class AddCourseComponent {

  newCourse: Course = new Course();
  categories: Category[];
  selectedCategoryId: number = null; // Property to store the selected category
  lecturers:Lecturer[];
  selectedLecturerId:number=null;
  courseForm: FormGroup;

  constructor(private _courseService: CourseService, private _router: Router) {
    let basepicture =
      'https://media.istockphoto.com/id/1410950079/photo/modern-style-classroom-in-the-morning-3d-render.webp?b=1&s=170667a&w=0&k=20&c=D3KekIGN_W76ScIe_vKZURixg0hXdXnbPfhKywcItro=';
    this.courseForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      lecturer: new FormControl('', [Validators.required]),
      numberOfLessons: new FormControl('', [Validators.required]),
      learningStart: new FormControl('', [Validators.required]),
      learningMethod: new FormControl(null, [Validators.required]),
      picture: new FormControl(basepicture, [Validators.required]),
    });
  }


  ngOnInit(): void {
    this._courseService.getCategories().subscribe(data => {
      this.categories = data;
    })
    this._courseService.getLecturers().subscribe((data) => {
      this.lecturers = data;
    });
  }
  syllabusList: string[] = ['']; // מערך שמכיל את תיבות הקלט, מתחיל עם תיבה ריקה בהתחלה

  onInput(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim();
   
    if (value && index === this.syllabusList.length - 1) {
        this.syllabusList.push(value);
    } else if (!value && index < this.syllabusList.length - 1) {
        this.syllabusList.splice(index + 1, 1);
    }
    console.log(this.syllabusList);
}

  saveCourse() {


    if (this.courseForm.valid) {
      this.newCourse.name = this.courseForm.get('name').value;
      this.newCourse.categoryId = this.courseForm.get('category').value;
      this.newCourse.lecturerId = this.courseForm.get('lecturer').value;
      this.newCourse.numberOfLessons = this.courseForm.get('numberOfLessons').value;
      this.newCourse.learningStart = this.courseForm.get('learningStart').value;
      this.newCourse.learningMethod = this.courseForm.get('learningMethod').value;
      this.newCourse.picture = this.courseForm.get('picture').value;
      let syllabus: string[] = this.syllabusList.filter((topic: string) => topic.trim() !== '');
      this.newCourse.syllabus = syllabus;
      console.log(this.newCourse);

    //saving
      this._courseService.addCourse(this.newCourse).subscribe(
        () => {
          Swal.fire('Success', 'Course saved successfully!', 'success');
          this._router.navigate(['/courses/allCourses']);
        },
        (err) => {
          Swal.fire('Error', "Cant add course...", 'error');
        }
      );
    }
    else {
      console.log("invalid form")
    }
  }
}
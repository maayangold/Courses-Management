import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../models/category.model';
import { Course } from '../models/course.model';
import Swal from 'sweetalert2';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lecturer } from '../models/lecturer.model';


@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',

})
export class EditCourseComponent implements OnInit {

  courseForm: FormGroup = new FormGroup({});
  categories: Category[];
  lecturers: Lecturer[];
  selectedCategoryId: number;
  selectedLecturerId: number;
  stringDate: string;
  syllabusList: string[];
  courseId:number;
  course: Course;
  

  constructor(private _courseService: CourseService, private route: ActivatedRoute,
    private _router: Router) { }
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.courseId= +params['id'];
        if ( this.courseId) {
          this._courseService.getCourseById( this.courseId).subscribe(
            (data) => {
              this.course = data;
              this.fullForm(data);
              if (data.syllabus) {
                const concatenatedSyllabus = data.syllabus.join(',');
                this.syllabusList = concatenatedSyllabus.split(',');
                console.log(this.syllabusList);
              } else {
                this.syllabusList = [];
              }
            },
            () => {
              Swal.fire({ icon: "error", title: "Error...", text: "There is no Course with such an id number" });
              this._router.navigate(['/courses/allCourses']);
            }
          );
        }
      });
    
      this._courseService.getCategories().subscribe((data) => {
        this.categories = data;
      });
    
      this._courseService.getLecturers().subscribe((data) => {
        this.lecturers = data;
      });
    }
    

    fullForm(value: Course) {
    console.log(value);
    this.courseForm = new FormGroup({
      name: new FormControl(value.name, [Validators.required,Validators.minLength(3)]),
      category: new FormControl(value.categoryId, [Validators.required]),
      lecturer: new FormControl(value.lecturerId, [Validators.required]),
      numberOfLessons: new FormControl(+value.numberOfLessons, [Validators.required]),
      learningStart: new FormControl(new Date(value.learningStart).toISOString().split('T')[0], [Validators.required]),      learningMethod: new FormControl(value.learningMethod, [Validators.required]),
      picture: new FormControl(value.picture, [Validators.required]),
    });
  }
  formatDate(date: Date): string {
    if (date) {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because getMonth returns zero-based months
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }
    return null; // or return an empty string if you want
}

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
  getCategory(): Category {
    return this.categories?.filter(c => c.id == this.course.categoryId)[0]
  }
  getLecturerName(id: number): string {
    const lecturer = this.lecturers.find(l => l.id == id);
    return lecturer.name;
  }
  saveCourse(): void {
   
    if (this.courseForm.valid) {
      this.course.id= this.courseId;
      this.course.name = this.courseForm.get('name').value;
      this.course.categoryId = this.courseForm.get('category').value;
      this.course.lecturerId = this.courseForm.get('lecturer').value;
      this.course.numberOfLessons = this.courseForm.get('numberOfLessons').value;
      this.course.learningStart = this.courseForm.get('learningStart').value;
      this.course.learningMethod = this.courseForm.get('learningMethod').value;
      this.course.picture = this.courseForm.get('picture').value;
      let syllabus: string[] = this.syllabusList.filter((topic: string) => topic.trim() !== '');
      this.course.syllabus = syllabus;
      console.log(this.course);

      //saving
      this._courseService.updateCourse( this.courseId, this.course).subscribe({
        next: (data) => {
          Swal.fire({
            position: "top", icon: "success", title: 'Update!',
            text: 'Course has been changed successfuly :)', showConfirmButton: false, timer: 2000
          })
          this._router.navigate(['courses/allCourses'])
        }, error: () => {
          Swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong! course is not valid" })
        }
      })

    }
  }

  cancelEdit() {
    Swal.fire({ icon: "warning", title: "Cancel...", text: "have a nice day" })

    this._router.navigate(['courses/allCourses'])
  }
}

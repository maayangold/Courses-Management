import { Component, OnChanges, OnInit } from '@angular/core';
import { Course, LearningMethod } from '../models/course.model';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';
import { Category } from '../models/category.model';

@Component({
  selector: 'all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-course.component.scss']
})
export class AllCoursesComponent implements OnInit {
  courses: Course[];
  filteredCourses: Course[];
  categories: Category[];
  learningMethodEnum: LearningMethod[] = [LearningMethod.FRONTAL, LearningMethod.ZOOM, LearningMethod.DiscussionBased];
  selectedCategory: number = 0;
  selectedLearningMethod: LearningMethod = null;
  searchCourseName: string=null;

  showLoginError = false;

  constructor(private _courseService: CourseService, private _router: Router) { }

  ngOnInit(): void {
    this._courseService.getCourses().subscribe((data) => {
      this.courses = data;
      this.filteredCourses = data;
      console.log('filteredCourses:', this.filteredCourses);
    });
    this._courseService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }
  applyFilters(): void {
    console.log('Before filtering:');
    console.log('selectedCategory:', this.selectedCategory);
    console.log('selectedLearningMethod:', this.selectedLearningMethod);
    console.log('searchCourseName:', this.searchCourseName);
  
    this.filteredCourses = this.courses.filter(course =>
      (this.searchCourseName === null || course.name.toLowerCase().includes(this.searchCourseName.toLowerCase()))
       &&
      (this.selectedCategory === null || course.categoryId === this.selectedCategory) 
      &&
      (this.selectedLearningMethod === null || course.learningMethod === this.selectedLearningMethod)
    );
  
    console.log('After filtering:');
    console.log('filteredCourses:', this.filteredCourses);
  }


   isLecturer(): boolean {
    return sessionStorage.getItem('lecturer') !== null;
  }
  getLearningMethodIcon(learningMethod: LearningMethod): string {
    switch (learningMethod) {
      case LearningMethod.ZOOM:
        return 'assets/icons/zoom-icon.png';
      case LearningMethod.DiscussionBased:
        return 'assets/icons/discussion-icon.png'; // Assuming you have an icon for DiscussionBased
      case LearningMethod.FRONTAL:
      default:
        return 'assets/icons/frontal-icon.png'; // Default to frontal icon if not specified or unknown
    }
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null || sessionStorage.getItem('lecturer') !== null;
  }
  showCourseDetails(courseId: number) {
    if (!this.isLoggedIn()) {
      this.showLoginError = true;
    } else {
      this._router.navigate(['/courses/courseDetails', courseId]);
    }
  }
  AddNewCourse() {

    this._router.navigate(['/courses/addCourse']);

  }
  EditCourse(id: number) {
    // Navigate to the AddCourseComponent and pass the selected course as a parameter
    this._router.navigate(['/courses/editCourse',id] );
  }
  getLearningMethodName(method: LearningMethod): string {
    switch (method) {
      case LearningMethod.FRONTAL:
        return 'Frontal';
      case LearningMethod.ZOOM:
        return 'Zoom';
      case LearningMethod.DiscussionBased:
        return 'Discussion-Based';
      default:
        return 'Unknown';
    }
  }

}

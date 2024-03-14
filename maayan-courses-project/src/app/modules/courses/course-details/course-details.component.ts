import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, LearningMethod } from '../models/course.model';
import { CourseService } from '../course.service';
import { Category } from '../models/category.model';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course: Course;
  learningMethodEnum = LearningMethod;
  categories: Category[];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    const courseId = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourseById(courseId).subscribe((data) => {
      this.course = data;
    });
    this.courseService.getCategories().subscribe(data => {
      this.categories = data;
    })
   
  }
  getCategory(): Category {
    return this.categories?.filter(c => c.id == this.course.categoryId)[0]
  }
 
  isThisWeek(): boolean {
    // Get the current date
    var today = new Date();
    // Get the start of the current week (Sunday)
    var startOfWeek = new Date(today);
    startOfWeek.setDate(startOfWeek.getDate() - today.getDay());

    // Get the end of the current week (Saturday)
    var endOfWeek = new Date(today);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - today.getDay()));

    // Check if the learning start date falls within the current week
    var learningStartDate = new Date(this.course?.learningStart);
    return learningStartDate >= startOfWeek && learningStartDate <= endOfWeek;

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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, LearningMethod } from '../models/course.model';
import { CourseService } from '../course.service';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
})
export class CourseDetailsComponent implements OnInit {
  course: Course;
  learningMethodEnum = LearningMethod;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    const courseId = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourseById(courseId).subscribe((data) => {
      this.course = data;
    });
  }
  isThisWeek(date: Date): boolean {
    const today = new Date();
    const todayDay = today.getDay();
    const startOfWeek = new Date(today.setDate(today.getDate() - todayDay));
    const endOfWeek = new Date(today.setDate(today.getDate() - todayDay + 6));
    return date >= startOfWeek && date <= endOfWeek;
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

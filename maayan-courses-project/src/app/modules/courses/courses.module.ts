import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CourseService } from "./course.service";
import { AllCoursesComponent } from "./all-courses/all-courses.component";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { CourseRoutingModule } from "./course-routing-module";
import { AddCourseComponent } from "./add-course/add-course.component";
import { EditCourseComponent } from "./edit-course/edit-course.component";




@NgModule({
    declarations:[      
       AllCoursesComponent,
       CourseDetailsComponent,
       AddCourseComponent,
       EditCourseComponent
  
      
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        CourseRoutingModule,
      ],
    providers:[CourseService],
    exports:[],
})
export class CourseModule{
}
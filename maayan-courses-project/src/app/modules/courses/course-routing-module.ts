import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AllCoursesComponent } from "./all-courses/all-courses.component";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { AddCourseComponent } from "./add-course/add-course.component";
import { AuthGuardService } from "src/app/auth-guard.service";
import { EditCourseComponent } from "./edit-course/edit-course.component";
import { LoginLecturerComponent } from "./login-lecturer/login-lecturer.component";


const ROUTES: Route[] = [
    { path: "allCourses", component: AllCoursesComponent },
    { path: "addCourse", component: AddCourseComponent, canActivate: [AuthGuardService] },
    { path: 'courseDetails/:id', component: CourseDetailsComponent},
    { path: 'editCourse/:id', component: EditCourseComponent, canActivate: [AuthGuardService] },
    { path: "loginLecturer", component: LoginLecturerComponent},

]
@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
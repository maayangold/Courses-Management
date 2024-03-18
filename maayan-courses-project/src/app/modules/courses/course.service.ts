import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, catchError, of } from "rxjs"
import { Course } from "./models/course.model"
import { Category } from "./models/category.model"
import { Lecturer } from "./models/lecturer.model"

@Injectable()
export class CourseService {
    getCourses(): Observable<Course[]> {
        return this._http.get<Course[]>("/api/Courses")
    }
    getCourseById(id: number): Observable<Course> {
        return this._http.get<Course>(`/api/Courses/${id}`);
    }
    getCourseByName(name: string): Observable<Course[]> {
        if (name === '')
            return this.getCourses()
        return this._http.get<Course[]>("api/Courses/?name=" + name)
    }
    addCourse(newCourse: Course): Observable<boolean> {
        return this._http.post<boolean>("/api/Courses", newCourse);
    }
    updateCourse(id: number, course: Course): Observable<Course> {
        return this._http.put<Course>(`/api/Courses/${id}`, course);
    }
    getCategories(): Observable<Category[]> {
        return this._http.get<Category[]>("/api/Courses/categories")
    }
    getLecturers(): Observable<Lecturer[]> {
        return this._http.get<Lecturer[]>("/api/Courses/lecturers")
    }

    constructor(private _http: HttpClient) {
        //  http://localhost:51028/api/Users
    }
}
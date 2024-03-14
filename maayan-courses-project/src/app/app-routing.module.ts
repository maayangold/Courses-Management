import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const APP_ROUTES: Route[] = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "users", loadChildren: () => import("./modules/users/users.module").then(m => m.UsersModule) },
  { path: "courses", loadChildren: () => import("./modules/courses/courses.module").then(m => m.CourseModule) },
  { path: "**", component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

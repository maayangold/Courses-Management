import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const ROUTES: Route[] = [
  { path: "", pathMatch:"full",redirectTo:"login" },
  { path: "login", component:LoginComponent},
  { path: "register", component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

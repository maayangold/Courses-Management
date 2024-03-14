import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserService } from "./user.service";
import { LoginLecturerComponent } from "./login-lecturer/login-lecturer.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
    declarations:[
        LoginComponent,
        RegisterComponent,
        LoginLecturerComponent

        // UserService
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        UserRoutingModule
      ],
    providers:[UserService],
    exports:[LoginComponent, RegisterComponent,
        LoginLecturerComponent],
})
export class UsersModule{
}
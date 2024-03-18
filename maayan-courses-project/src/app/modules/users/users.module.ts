import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserService } from "./user.service";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
    declarations:[
        LoginComponent,
        RegisterComponent,

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
        ],
})
export class UsersModule{
}
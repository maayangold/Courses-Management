import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { UsersModule } from './modules/users/users.module';
import { UserRoutingModule } from './modules/users/user-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    UsersModule,
    UserRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

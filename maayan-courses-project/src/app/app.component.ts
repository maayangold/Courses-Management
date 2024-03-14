import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent {
  theTime() {
    let t = new Date;
    let h = (t.getHours());
    if (h <= 12)
      return "good morning!";
    if (h <= 19)
      return "good afternoon!";
    else
      return "good night!";
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null || sessionStorage.getItem('lecturer') !== null;
  }
  

  logout(): void {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('lecturer');

    this.router.navigate(['/users/login']);
  }
}
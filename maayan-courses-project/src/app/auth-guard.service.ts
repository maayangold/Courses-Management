import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor() { }
  canActivate(): boolean {
    const userType = sessionStorage.getItem('user');
    const lecturerType = sessionStorage.getItem('lecturer');

    return userType !== null || lecturerType !== null;
  }
}

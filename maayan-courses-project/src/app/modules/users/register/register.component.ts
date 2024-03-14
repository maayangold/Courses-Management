import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  users: User[];
  user: User = new User();
  userAlreadyExists: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.minLength(3)]],
    });

    this.route.queryParams.subscribe(params => {
      this.userForm.patchValue({
        name: params['username'] || '',
      });
    });

  }

  register(): void {
    if (this.userForm.valid) {
      this.user = this.userForm.value;

      // Check if the user already exists
      const existingUser = this.users.find(u => u.name === this.user.name);
      if (existingUser) {
        this.userAlreadyExists = true;
      } else {
        this.userAlreadyExists = false;
        this.userService.saveUserToServer(this.user).subscribe(
          () => 
           { Swal.fire('Success', 'user saved successfully!', 'success');
              sessionStorage.setItem("user", JSON.stringify(this.user));
              this.router.navigate(['/courses/allCourses']);
            },
            (err) => {
              Swal.fire('Error', err, 'error');
            }
        );
    }
  }
}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  isSpinning: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    console.log('validate login form: ', this.validateForm.value);
    this.authService
      .login(
        this.validateForm.get('username').value,
        this.validateForm.get('password').value
      )
      .subscribe(
        (res) => {
          this.isSpinning = false;
          console.log('Response from login: ', res);
          if (LocalStorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('/admin/dashboard');
          } else if (LocalStorageService.isUserLoggedIn()) {
            this.router.navigateByUrl('/user/dashboard');
          }
        },
        (error) => {
          console.error(error);
          if (error.status == 406) {
            this.notificationService.error(
              'Error',
              'Account is not active. Please activate your account',
              { nzDuration: 5000 }
            );
          } else {
            this.notificationService.error(
              'Error',
              'Bad Credentials, Please enter correct credentials',
              { nzDuration: 5000 }
            );
          }
          this.isSpinning = false
        }
      );
  }
}

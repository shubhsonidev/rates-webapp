import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}
  inputID = '';
  inputPassword = '';

  token: any = '';
  loader: boolean = false;
  loadMessage = 'Logging in...';
  ngOnInit(): void {
    this.token = localStorage.getItem('accessToken');
    if (this.token !== null && this.token !== '') {
      this.loader = true;
      this.http
        .get<any>(environment.apiUrl + 'apifor=verify&token=' + this.token)
        .subscribe((res) => {
          if (res.data.status == 'success') {
            this.loader = false;
            this.router.navigate(['/admin']);
          } else if (res.data.status == '404') {
            this.toastr.error('Session expired !!');
            this.router.navigate(['/login']);
            localStorage.clear();
            this.loader = false;
          } else {
            this.toastr.error('server down');
            this.loader = false;
          }
        });
    }
  }

  login = () => {
    if (this.inputID === '' || this.inputPassword === '') {
      this.toastr.warning('Please fill correctly !!');
    } else {
      this.loader = true;
      this.http
        .get<any>(
          environment.apiUrl +
            'apifor=login&id=' +
            this.inputID +
            '&password=' +
            this.inputPassword
        )
        .subscribe((res) => {
          if (res.data.status == 'success') {
            this.toastr.success('Login Successfull !!');

            localStorage.setItem('accessToken', res.data.token);

            this.loader = false;
            this.router.navigate(['/admin']);
          } else if (res.data.status == 'invalid') {
            this.toastr.error('Password or id is wrong !!');
            this.inputID = '';
            this.inputPassword = '';
            this.loader = false;
          } else {
            this.toastr.error('server down');
            this.loader = false;
          }
        });
    }
  };
}

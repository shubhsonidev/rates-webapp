import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}
  token: any = '';
  loader: boolean = false;
  ngOnInit(): void {
    this.token = localStorage.getItem('accessToken');
    console.log(this.token)
    if (this.token == '' || this.token == null) {
      this.router.navigate(['/login'])
    }

     else if (this.token != null || this.token != '') {
      this.loader = true;
      this.http
        .get<any>(environment.apiUrl + 'apifor=verify&token=' + this.token)
        .subscribe((res) => {
          if (res.data.status == 'success') {
            this.loader = false;
          } else if (res.data.status == '404') {
            this.toastr.error('Session expired');
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
}

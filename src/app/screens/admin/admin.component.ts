import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/services/config.service';
import { environment } from 'src/environments/environment';
import { ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import lottie from 'lottie-web';
import { defineElement } from '@lordicon/element';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent {
  private modalService = inject(NgbModal);

  masterSwitch: any;
  gold24bool: any;
  gold22bool: any;
  gold20bool: any;
  gold18bool: any;
  gold14bool: any;
  silverBool: any;
  silverAdd: any;
  activeDesign: any;
  goldAdd: any;
  gold24Percent: any;
  gold22Percent: any;
  gold20Percent: any;
  gold18Percent: any;
  gold14Percent: any;
  bottomInfo: any;
  topInfo: any;
  loaderSave: any;
  viewDesign: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    public config: ConfigService
  ) {}
  openXl(content: TemplateRef<any>, url: any) {
    this.modalService.open(content, {
      size: 'xl',
      windowClass: 'dark-modal',
      centered: true,
    });
    this.viewDesign = url;
  }

  token: any = '';
  loader: boolean = false;
  ngOnInit(): void {
    this.token = localStorage.getItem('accessToken');
    console.log(this.token);
    if (this.token == '' || this.token == null) {
      this.router.navigate(['/login']);
    } else if (this.token != null || this.token != '') {
      this.loader = true;
      this.http
        .get<any>(environment.apiUrl + 'apifor=verify&token=' + this.token)
        .subscribe((res) => {
          if (res.data.status == 'success') {
            this.http
              .get<configResponse>(
                environment.apiUrl + 'apifor=configdata&token=' + this.token
              )
              .subscribe((response) => {
                this.config.data = response.data;
                this.masterSwitch = this.config.data.master_visible;
                this.gold24bool = this.config.data.gold_24_bool;
                this.gold22bool = this.config.data.gold_22_bool;
                this.gold20bool = this.config.data.gold_20_bool;
                this.gold18bool = this.config.data.gold_18_bool;
                this.gold14bool = this.config.data.gold_14_bool;
                this.silverBool = this.config.data.silver_bool;
                this.silverAdd = this.config.data.silver_add;
                this.goldAdd = this.config.data.gold_add;
                this.activeDesign = this.config.data.active_design;
                this.gold24Percent = this.config.data.gold_24_percent;
                this.gold22Percent = this.config.data.gold_22_percent;
                this.gold20Percent = this.config.data.gold_20_percent;
                this.gold18Percent = this.config.data.gold_18_percent;
                this.gold14Percent = this.config.data.gold_14_percent;
                this.bottomInfo = this.config.data.bottom_info;
                this.topInfo = this.config.data.top_info;

                this.loader = false;
              });
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

  dateFormatter(input: Date) {
    let originalDate = new Date(input);

    const day = this.padZero(originalDate.getUTCDate());
    const month = this.padZero(originalDate.getUTCMonth() + 1);
    const year = originalDate.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }
  padZero(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }

  save() {
    this.loaderSave = true;
    this.http
      .get<any>(
        environment.apiUrl +
          'apifor=save&token=' +
          this.token +
          '&master_visible=' +
          this.masterSwitch +
          '&gold_24_percent=' +
          this.gold24Percent +
          '&gold_22_percent=' +
          this.gold22Percent +
          '&gold_20_percent=' +
          this.gold20Percent +
          '&gold_18_percent=' +
          this.gold18Percent +
          '&gold_14_percent=' +
          this.gold14Percent +
          '&gold_24_bool=' +
          this.gold24bool +
          '&gold_22_bool=' +
          this.gold22bool +
          '&gold_20_bool=' +
          this.gold20bool +
          '&gold_18_bool=' +
          this.gold18bool +
          '&gold_14_bool=' +
          this.gold14bool +
          '&silver_bool=' +
          this.silverBool +
          '&silver_add=' +
          this.silverAdd +
          '&gold_add=' +
          this.goldAdd +
          '&bottom_info=' +
          this.bottomInfo +
          '&top_info=' +
          this.topInfo +
          '&active_design=' +
          this.activeDesign
      )
      .subscribe((res) => {
        if (res.status == 'success') {
          this.loaderSave = false;
          this.toastr.success('Saved Successfully');
          this.http
            .get<configResponse>(
              environment.apiUrl + 'apifor=configdata&token=' + this.token
            )
            .subscribe((response) => {
              this.config.data = response.data;
              this.masterSwitch = this.config.data.master_visible;
              this.gold24bool = this.config.data.gold_24_bool;
              this.gold22bool = this.config.data.gold_22_bool;
              this.gold20bool = this.config.data.gold_20_bool;
              this.gold18bool = this.config.data.gold_18_bool;
              this.gold14bool = this.config.data.gold_14_bool;
              this.silverBool = this.config.data.silver_bool;
              this.silverAdd = this.config.data.silver_add;
              this.goldAdd = this.config.data.gold_add;
              this.activeDesign = this.config.data.active_design;
              this.gold24Percent = this.config.data.gold_24_percent;
              this.gold22Percent = this.config.data.gold_22_percent;
              this.gold20Percent = this.config.data.gold_20_percent;
              this.gold18Percent = this.config.data.gold_18_percent;
              this.gold14Percent = this.config.data.gold_14_percent;
              this.bottomInfo = this.config.data.bottom_info;
              this.topInfo = this.config.data.top_info;

              // this.loader = false;
            });
        } else {
          this.toastr.error('Session expired');
          this.router.navigate(['/login']);
          localStorage.clear();
          this.loader = false;
        }
      });
  }
}

export interface configResponse {
  data: {
    expiry_date: string;
    visitor: number;
    master_visible: boolean;
    gold_24_percent: number;
    gold_22_percent: number;
    gold_20_percent: number;
    gold_18_percent: number;
    gold_14_percent: number;
    gold_24_bool: boolean;
    gold_22_bool: boolean;
    gold_20_bool: boolean;
    gold_18_bool: boolean;
    gold_14_bool: boolean;
    silver_bool: boolean;
    silver_add: number;
    gold_add: number;
    bottom_info: string;
    top_info: string;
    active_design: string;
  };
}

import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VisitorService } from 'src/app/services/visitor.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; //
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-live-rates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './live-rates.component.html',
  styleUrl: './live-rates.component.scss',
})
export class LiveRatesComponent {
  formattedDate?: string;
  currentDay?: string;
  loader: any = true;
  constructor(
    private http: HttpClient,
    public visitor: VisitorService,
    public rate: RateService
  ) {}
  ngOnInit() {
    this.updateDateTime();
    // Update every second
    setInterval(() => {
      this.updateDateTime();
    }, 1000);

    this.http
      .get<rateResponse>(environment.apiUrl + 'apifor=rate')
      .subscribe((response) => {
        this.rate.data = response.data;
        this.loader = false;
      });

    setInterval(() => {
      this.http
        .get<rateResponse>(environment.apiUrl + 'apifor=rate')
        .subscribe((response) => {
          this.rate.data = response.data;
        });
    }, 30000);

    this.http
      .get<any>(environment.apiUrl + 'apifor=visitor')
      .subscribe((response) => {
        this.visitor.data = response.data;
      });
  }
  updateDateTime() {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      weekday: 'long',
    };

    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    const parts = dateFormatter.formatToParts(new Date());

    const day = parts.find((part) => part.type === 'day')?.value;
    const month = parts.find((part) => part.type === 'month')?.value;
    const year = parts.find((part) => part.type === 'year')?.value;
    const hour = parts.find((part) => part.type === 'hour')?.value;
    const minute = parts.find((part) => part.type === 'minute')?.value;
    const second = parts.find((part) => part.type === 'second')?.value;
    const weekday = parts.find((part) => part.type === 'weekday')?.value;

    this.formattedDate = `${day} ${month} ${year} ${hour}:${minute}:${second} (${weekday})`;
  }
}

// response.interface.ts

export interface rateResponse {
  data: {
    status: string;
    master_visible: boolean;
    gold_24: number;
    gold_22: number;
    gold_20: number;
    gold_18: number;
    gold_14: number;
    silver: number;
    gold_24_bool: boolean;
    gold_22_bool: boolean;
    gold_20_bool: boolean;
    gold_18_bool: boolean;
    gold_14_bool: boolean;
    silver_bool: boolean;
    bottom_info: string;
    top_info: string;
    active_design: string;
  };
}

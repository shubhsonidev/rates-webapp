import { HttpClient } from '@angular/common/http';

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor( 
    private http: HttpClient,

  ) { }
  data: any = {};

}



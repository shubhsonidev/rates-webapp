import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LiveRatesComponent } from './screens/live-rates/live-rates.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './screens/login/login.component';
import { LoaderComponent } from './screens/loader/loader.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LiveRatesComponent,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() //
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

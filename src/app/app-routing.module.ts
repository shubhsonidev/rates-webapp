import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveRatesComponent } from './screens/live-rates/live-rates.component';
import { AdminComponent } from './screens/admin/admin.component';
import { LoginComponent } from './screens/login/login.component';

const routes: Routes = [
  { path: 'live-rates', component: LiveRatesComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LiveRatesComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArmaComponent } from './arma/arma.component';
import { MissionsComponent } from './missions/missions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";


const routes: Routes = [
  { path: 'Arma', component: ArmaComponent },
  { path: 'Missions', component: MissionsComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'Register', component:RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

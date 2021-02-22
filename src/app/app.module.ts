import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from "@angular/material/sidenav";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MissionsComponent } from './missions/missions.component';
import { ArmaComponent } from './arma/arma.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MedicalComponent } from './medical/medical.component';
import { UnconsciousComponent } from './unconscious/unconscious.component';

@NgModule({
  declarations: [
    AppComponent,
    MissionsComponent,
    ArmaComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    MedicalComponent,
    UnconsciousComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
	FormsModule,
	HttpClientModule,
	MatSidenavModule,
	BrowserAnimationsModule,
	InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

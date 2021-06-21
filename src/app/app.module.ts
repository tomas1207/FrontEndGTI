import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CampaignComponent } from './campaign/campaign.component';
import { HomeComponent } from './home/home.component';
import { BrefingComponent } from './brefing/brefing.component';
import { CreataCamComponent } from './creata-cam/creata-cam.component';
import { DebriefingComponent } from './debriefing/debriefing.component';
import { CreateMissionComponent } from './create-mission/create-mission.component';


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
		CampaignComponent,
		HomeComponent,
		BrefingComponent,
		CreataCamComponent,
		DebriefingComponent,
		CreateMissionComponent,

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
		ReactiveFormsModule,
		FormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }

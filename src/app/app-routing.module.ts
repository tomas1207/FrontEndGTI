import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArmaComponent } from './arma/arma.component';
import { MissionsComponent } from './missions/missions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import { MedicalComponent } from './medical/medical.component';
import { CampaignComponent } from './campaign/campaign.component';
import { HomeComponent } from './home/home.component'
import { BrefingComponent } from './brefing/brefing.component';
import { CreataCamComponent } from './creata-cam/creata-cam.component'
import { DebriefingComponent } from './debriefing/debriefing.component';
import { from } from 'rxjs';
import { CreateMissionComponent } from './create-mission/create-mission.component';


const routes: Routes = [
	{ path: 'Arma', component: ArmaComponent },
	{ path: 'Campaing', component: CampaignComponent },
	{ path: 'debriefing/:id', component: DebriefingComponent },
	{ path: 'Missions/:id', component: MissionsComponent },
	{ path: 'createCampaing', component: CreataCamComponent },
	{ path: 'Login', component: LoginComponent },
	{ path: 'Register', component: RegisterComponent },
	{ path: 'Medical/:id', component: MedicalComponent },
	{ path: 'Brefing/:id', component: BrefingComponent },
	{ path: 'CreateMission', component: CreateMissionComponent },
	{ path: '', component: HomeComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

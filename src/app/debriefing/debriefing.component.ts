import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NormalEndpointService } from '../services/normal-endpoint.service';

@Component({
	selector: 'app-debriefing',
	templateUrl: './debriefing.component.html',
	styleUrls: ['./debriefing.component.scss']
})
export class DebriefingComponent implements OnInit {
	missionID: any = {}
	mission: any = {}
	private routeSub: Subscription;

	constructor(private router: ActivatedRoute, private http: NormalEndpointService) { }

	ngOnInit(): void {

		this.routeSub = this.router.params.subscribe(params => {
			this.missionID = params['id']
			console.log(this.missionID)
		});
		this.http.httpGet('/wapi/mission/details', new HttpParams().set('mission', this.missionID)).subscribe(data => {
			this.mission = data
			console.log(this.mission)
		}, (error => {

		}))

	}
	ngOnDestroy() {
		this.routeSub.unsubscribe();
	}

}

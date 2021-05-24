import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NormalEndpointService } from "../services/normal-endpoint.service";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
	selector: 'app-missions',
	templateUrl: './missions.component.html',
	styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
	missions: any = {}
	campaignName: any
	httpParamas: any
	id: any
	constructor(private httpClient: NormalEndpointService, private activatedroute: ActivatedRoute, private router: Router) {
		this.activatedroute.params.subscribe(data => {
			this.id = data["id"]
		})
	}

	ngOnInit(): void {
		this.campaignName = window.history.state.name
		if (this.campaignName == undefined) {
			this.campaignName = sessionStorage.getItem("campaignName")
		} else {
			sessionStorage.setItem("campaignName", this.campaignName)
		}
	}
	ngAfterViewInit() {
		this.httpParamas = new HttpParams().set('campaign', this.id)
		this.httpClient.httpGet("/api/mission", this.httpParamas).subscribe(data => {
			console.log(data)
			this.missions = data
		})
	}
	ismissionEnd(item: any) {
		if (item.isfinish) {
			this.router.navigate(['/debriefing', item.id])
		} else {
			this.router.navigate(['/Brefing', item.id], item)
		}

	}
}



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
	userid: any
	userinfo: any;
	jsonUserinfo: any
	constructor(private httpClient: NormalEndpointService, private activatedroute: ActivatedRoute, private router: Router) {
		this.activatedroute.params.subscribe(data => {
			this.id = data["id"]
		})
		this.userinfo = localStorage.getItem("userinfo")
		this.jsonUserinfo = JSON.parse(this.userinfo);
		this.userid = this.jsonUserinfo.id;

	}

	ngOnInit(): void {
		this.campaignName = window.history.state.name
		if (this.campaignName == undefined) {
			this.campaignName = sessionStorage.getItem("campaignName")
		} else {
			sessionStorage.setItem("campaignName", this.campaignName)

		}
		this.httpParamas = new HttpParams().set('campaign', this.id)
		this.httpClient.httpGet("/api/mission", this.httpParamas).subscribe(data => {
			this.missions = data
		})
	}
	ngAfterViewInit() {

	}
	ismissionEnd(item: any) {
		if (item.isfinish) {
			this.router.navigate(['/debriefing', item.id], { state: item.id })
		} else {
			this.router.navigate(['/briefing', item.id], { state: item })
		}

	}
	CreateMission() {
		this.router.navigate(['CreateMission', this.id])
	}
}



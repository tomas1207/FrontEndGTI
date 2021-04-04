import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NormalEndpointService } from "../services/normal-endpoint.service";
import { ActivatedRoute } from '@angular/router';
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
	constructor(private httpClient: NormalEndpointService, private activatedroute: ActivatedRoute) {
		this.activatedroute.params.subscribe(data => {
			this.id = data["id"]
			this.campaignName = data["name"]
			console.log(data)
		})
	}

	ngOnInit(): void {


	}
	ngAfterViewInit() {
		this.httpParamas = new HttpParams().set('campaign', this.id)
		this.httpClient.httpGet("/api/mission", this.httpParamas).subscribe(data => {
			console.log(data)
			this.missions = data
		})
	}
}



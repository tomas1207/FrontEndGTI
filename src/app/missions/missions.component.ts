import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NormalEndpointService } from "../services/normal-endpoint.service";
@Component({
	selector: 'app-missions',
	templateUrl: './missions.component.html',
	styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

	constructor(private httpClient: NormalEndpointService) {
	}

	ngOnInit(): void {


	}
	ngAfterViewInit() {




	}

}

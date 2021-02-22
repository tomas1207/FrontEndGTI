import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NormalEndpointService} from '../services/normal-endpoint.service'
@Component({
	selector: 'app-arma',
	templateUrl: './arma.component.html',
	styleUrls: ['./arma.component.scss']
})
export class ArmaComponent implements OnInit {
	shootsFired: any = []
	storageUser:any
	constructor(private httpClient:NormalEndpointService) { }

	ngOnInit(): void {
	}
	ngAfterViewInit() {

		this.httpRequest('/api/arma/shootsfired')

	}

	onScroll(event: any) {
		this.httpRequest(this.shootsFired[this.shootsFired.length - 1]["Pagination"]["next"])
	}
	httpRequest(url: any) {

		this.httpClient.httpGet(url).subscribe(data => {
			console.log(data)
			this.shootsFired.push(data)
		})
	}
}

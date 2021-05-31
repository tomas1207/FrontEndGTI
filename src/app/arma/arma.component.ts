import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NormalEndpointService } from '../services/normal-endpoint.service'
@Component({
	selector: 'app-arma',
	templateUrl: './arma.component.html',
	styleUrls: ['./arma.component.scss']
})
export class ArmaComponent implements OnInit {
	shootsFired: any = []
	@Input() missionID: string;
	httpParams: any
	maxPropertyValue: any
	loaded: boolean
	constructor(private httpClient: NormalEndpointService) { }

	ngOnInit(): void {
		this.loaded = false;
		this.httpParams = new HttpParams().set('mission', this.missionID)
		this.httpClient.httpGet('/api/arma/shootsfired', this.httpParams).subscribe(data => {
			this.shootsFired = data
			console.log(this.shootsFired);
			this.checkMostTriggerhappy();
			this.loaded = true;
		})
	}
	ngAfterViewInit() {

	}

	onScroll(event: any) {
		this.httpClient.httpGet(this.shootsFired[this.shootsFired.length - 1]["Pagination"]["next"], this.httpParams).subscribe(data => {
			this.shootsFired.push(data)
		})
	}


	checkMostTriggerhappy() {
		var countPropertyValues: any = {};
		this.shootsFired.Data.forEach(function (obj: any) {
			if (countPropertyValues.hasOwnProperty(obj.unit.user_name)) {
				countPropertyValues[obj.unit.user_name]++;
			} else {
				countPropertyValues[obj.unit.user_name] = 1;
			}
		});

		console.log(countPropertyValues);

		var maxPropertyOccurence = 0;
		var maxPropertyValue;

		for (var property in countPropertyValues) {

			if (countPropertyValues[property] > maxPropertyOccurence) {
				maxPropertyOccurence = countPropertyValues[property];
				maxPropertyValue = property;
			}
		}

		console.log(maxPropertyOccurence);
		console.log(maxPropertyValue);
		this.maxPropertyValue = maxPropertyValue

	}
}

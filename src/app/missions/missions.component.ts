import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'

@Component({
	selector: 'app-missions',
	templateUrl: './missions.component.html',
	styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
	Missions: any = {}
	constructor(private httpClient: HttpClient, private cookieService: CookieService) {
	}

	ngOnInit(): void {

	}
	ngAfterViewInit() {
		console.log(this.cookieService.get('access'))

		this.httpClient.get('/api/mission/', {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + this.cookieService.get('access')
			})
		}).subscribe(data => {
			console.log(data)
			this.Missions = data
		})
		// return this.Missions

	}

}

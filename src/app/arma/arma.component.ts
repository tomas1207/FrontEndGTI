import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-arma',
	templateUrl: './arma.component.html',
	styleUrls: ['./arma.component.scss']
})
export class ArmaComponent implements OnInit {
	shootsFired: any = []
	constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

	ngOnInit(): void {
	}
	ngAfterViewInit() {
		console.log(this.cookieService.get('access'))

		this.httpClient.get('/api/arma/shootsfired', {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + this.cookieService.get('access')
			})
		}).subscribe(data => {
			console.log(data)
			this.shootsFired.push(data)
		})
		//return this.Missions

	}
	toArray(answers: object) {
		return Object.keys(answers).map(key => answers[key])
	}
	onScroll(event: any) {
		this.httpClient.get(this.shootsFired[this.shootsFired.length -1]["Pagination"]["next"], {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + this.cookieService.get('access')
			})
		}).subscribe(data => {
			console.log(data)
			this.shootsFired.push(data)
		})
	}
}

import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NormalEndpointService } from "../services/normal-endpoint.service";
@Component({
	selector: 'app-medical',
	templateUrl: './medical.component.html',
	styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit {
	medical: any = [];
	httpParams: any
	id: any
	constructor(private http: NormalEndpointService, private activatedroute: ActivatedRoute) {
		this.activatedroute.params.subscribe(data => {
			this.id = data["id"]
		})
	}

	ngOnInit(): void {
		this.httpget('api/arma/medic')
	}
	onScroll(e: any) {

		this.httpget(this.medical[this.medical.length - 1]["Pagination"]["next"])
	}
	httpget(url: string) {
		this.httpParams = new HttpParams().set('mission', this.id)
		this.http.httpGet(url, this.httpParams).subscribe(data => {
			console.log(data)
			this.medical.push(data)
		})

	}
}

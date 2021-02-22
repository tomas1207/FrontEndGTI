import { Component, OnInit } from '@angular/core';
import { NormalEndpointService } from "../services/normal-endpoint.service";
@Component({
	selector: 'app-medical',
	templateUrl: './medical.component.html',
	styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit {
	medical: any = [];
	constructor(private http:NormalEndpointService) { }

	ngOnInit(): void {
		this.httpget('api/arma/medic')
	}
	onScroll(e:any){

		this.httpget(this.medical[this.medical.length - 1]["Pagination"]["next"])
	}
	httpget(url:string){
		this.http.httpGet(url).subscribe(data => {
			console.log(data)
			this.medical.push(data)
		})

	}
}

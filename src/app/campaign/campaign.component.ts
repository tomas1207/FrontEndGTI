
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NormalEndpointService } from "../services/normal-endpoint.service";
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-campaign',
	templateUrl: './campaign.component.html',
	styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {


	count: any = {}
	campagain: any = {}
	httpParams: any
	isMenuCollapsed = true;
	isMenuCollapsed1 = true;
	constructor(private httpClient: NormalEndpointService) {
	}

	ngOnInit(): void {

		this.httpClient.httpGet('/api/campaign/').subscribe(data => {
			this.campagain = data
			for (let index = 0; index < this.campagain.Data.length; index++) {
				const element = this.campagain.Data[index];
				this.httpParams = new HttpParams().set('campaign', element.id)
				this.httpClient.httpGet('/api/campaign/count', this.httpParams).subscribe(data => {
					this.count[element.name] = data
				})
			}
		})

	}
	ngAfterViewInit() {

	}
	activeOrNOt(item: any) {
		if (item) {
			return "Activo"
		} else {
			return "Encerrado"
		}

	}
}



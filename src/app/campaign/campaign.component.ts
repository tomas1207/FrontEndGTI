
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NormalEndpointService } from "../services/normal-endpoint.service";
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-campaign',
	templateUrl: './campaign.component.html',
	styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

	msg: any
	count: any = {}
	campagain: any = {}
	httpParams: any
	noLoginUser: boolean = false;
	isMenuCollapsed = true;
	isMenuCollapsed1 = true;
	constructor(private httpClient: NormalEndpointService) {
	}

	ngOnInit(): void {

		this.httpClient.httpGet('/api/campaign/').subscribe(data => {
			console.log(data)
			this.campagain = data

			for (let index = 0; index < this.campagain.Data.length; index++) {
				const element = this.campagain.Data[index];
				this.campagain.Data[index].image = 'http://localhost:8000' + element.image
				this.httpParams = new HttpParams().set('campaign', element.id)
				this.httpClient.httpGet('/api/campaign/count', this.httpParams).subscribe(data => {
					this.count[element.name] = data
				})
			}
		}, (error => {

			if (error.error.code == "token_not_valid") {
				this.noLoginUser = true
				this.msg = "<h3>Login necessário para ver a pagina 💩 </h3>"
			} else if (error.status == 401) {
				this.noLoginUser = true
				this.msg = "<h3>Login necessário para ver a pagina 💩</h3>"
			} else {
				this.noLoginUser = true
				this.msg = "<h3>Erro no servidor 🏗️</h3>"
			}
		}))

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



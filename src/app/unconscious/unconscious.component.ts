import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NormalEndpointService } from '../services/normal-endpoint.service'
@Component({
	selector: 'app-unconscious',
	templateUrl: './unconscious.component.html',
	styleUrls: ['./unconscious.component.scss']
})
export class UnconsciousComponent implements OnInit {
	unconscious: any = []
	keyListBackEnd: any = []
	extraDataUnconscious: any
	@Input() missionID: string;
	httpParams: any
	maxPropertyValue: any
	loaded: boolean
	keyList: any = {}
	objectKeys = Object.keys

	constructor(private httpClient: NormalEndpointService) { }

	ngOnInit(): void {
		this.loaded = false;
		this.httpParams = new HttpParams().set('mission', this.missionID)
		this.httpClient.httpGet('/api/arma/unconscious', this.httpParams).subscribe(data => {
			this.unconscious = data
			this.extraDataUnconscious = this.unconscious["ExtraData"]
			//	this.keysList()
			console.log(this.unconscious);
			this.extraDataHandler()
			this.loaded = true;
		})
	}


	onScroll(event: any) {
		this.httpClient.httpGet(this.unconscious[this.unconscious.length - 1]["Pagination"]["next"], this.httpParams).subscribe(data => {
			this.unconscious.push(data)
		})

	}

	extraDataHandler() {
		this.keyList = { 'DeadCount': 'Numero de mortes: ' + this.extraDataUnconscious["DeadCount"], 'TheGroundHugger': 'O homem que caio mais vezes ' + this.getMax(this.extraDataUnconscious["TheGroundHugger"], "count").unit_id.user_name }


	}
	getMax(arr: any, prop: any) {
		var max;
		for (var i = 0; i < arr.length; i++) {
			if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
				max = arr[i];
		}
		return max;
	}

}

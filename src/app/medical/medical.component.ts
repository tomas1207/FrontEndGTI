import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NormalEndpointService } from "../services/normal-endpoint.service";
@Component({
	selector: 'app-medical',
	templateUrl: './medical.component.html',
	styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit {
	medical: any = [];
	keyListBackEnd: any = []
	extraData: any
	@Input() missionID: string;
	httpParams: any
	maxPropertyValue: any
	loaded: boolean
	keyList: any = {}
	objectKeys = Object.keys
	constructor(private httpClient: NormalEndpointService) {
	}




	ngOnInit(): void {
		this.loaded = false;
		this.httpParams = new HttpParams().set('mission', this.missionID)
		this.httpClient.httpGet('/api/arma/medic', this.httpParams).subscribe(data => {
			this.medical = data
			this.extraData = this.medical["ExtraData"]
			console.log(this.extraData)
			//	this.keysList()
			this.extraDataHandler()
			console.log(this.keyList);
			this.loaded = true;
		})

	}
	onScroll(e: any) {

		this.httpget(this.medical[this.medical.length - 1]["Pagination"]["next"])
	}
	httpget(url: string) {
		this.httpParams = new HttpParams().set('mission', this.missionID)
		this.httpClient.httpGet(url, this.httpParams).subscribe(data => {
			console.log(data)
			this.medical.push(data)
		})

	}
	extraDataHandler() {
		this.keyList = {
			'bestMedic': 'Melhor medico : O jogardor <b>' + this.getMax(this.extraData["bestMedic"], "count").healer_id.userName + "</b> foi o melhor medico", 'holey': 'Carne para canhão : Foi ' + this.getMax(this.extraData["holey"], "count").healed_id.userName + " com " + this.getMax(this.extraData["holey"], "count").count + " buracos para a proxima esconde-te atrás das pedras", 'mostShootZone': 'O local onde os jogadores levaram mais tiros foi no(a) ' + this.getMax(this.extraData["mostShootZone"], "count").hitLocation + " com " + this.getMax(this.extraData["mostShootZone"], "count").count + " tiros", 'mostusedItem': 'O item mais utilizado foi ' + this.getMax(this.extraData["mostusedItem"], "count").typeOfHeal
		}

	}
	getMax(arr: any, prop: any) {
		var max;
		for (var i = 0; i < arr.length; i++) {
			if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
				max = arr[i];
		}
		return max;
	}
	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		this.extraData = {}
	}
}

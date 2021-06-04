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
	keyListBackEnd: any = []
	extraDataShoots: any
	@Input() missionID: string;
	httpParams: any
	maxPropertyValue: any
	loaded: boolean
	keyList: any = {}
	objectKeys = Object.keys

	constructor(private httpClient: NormalEndpointService) { }

	ngOnInit(): void {
		this.loaded = false;
		console.log(this.missionID)
		this.httpParams = new HttpParams().set('mission', this.missionID)
		this.httpClient.httpGet('/api/arma/shootsfired', this.httpParams).subscribe(data => {
			this.shootsFired = data
			this.extraDataShoots = this.shootsFired["ExtraData"]
			//	this.keysList()
			this.extraDataHandler()
			console.log(this.extraDataShoots);
			this.loaded = true;
		})
	}


	onScroll(event: any) {
		this.httpClient.httpGet(this.shootsFired[this.shootsFired.length - 1]["Pagination"]["next"], this.httpParams).subscribe(data => {
			this.shootsFired.push(data)
		})

	}

	extraDataHandler() {
		this.keyList = { 'TriggerHappy': 'Trigger Happy : O jogardor <b>' + this.getMax(this.extraDataShoots["TriggerHappy"], "count").unit.user_name + "</b> foi quem disparou mais com <b> " + this.getMax(this.extraDataShoots["TriggerHappy"], "count").count + "</b> tiros", 'mostWeaponUsed': 'Arma mais utilizada : Foi ' + this.getMax(this.extraDataShoots["mostWeaponUsed"], "count").weapon + " com " + this.getMax(this.extraDataShoots["mostWeaponUsed"], "count").count + " jogadores a jogar com ela", 'mostUsedMode': 'Modo mais utilizado : Foi ' + this.getMax(this.extraDataShoots["mostUsedMode"], "count").mode, 'AmmoDispenser': 'A ammo mais utilizada foi ' + this.getMax(this.extraDataShoots["AmmoDispenser"], "count").ammo }


	}
	getMax(arr: any, prop: any) {
		var max;
		for (var i = 0; i < arr.length; i++) {
			if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
				max = arr[i];
		}
		return max;
	}



	// checkMostTriggerhappy() {
	// 	var countPropertyValues: any = {};
	// 	this.shootsFired.Data.forEach(function (obj: any) {
	// 		if (countPropertyValues.hasOwnProperty(obj.unit.user_name)) {
	// 			countPropertyValues[obj.unit.user_name]++;
	// 		} else {
	// 			countPropertyValues[obj.unit.user_name] = 1;
	// 		}
	// 	});

	// 	console.log(countPropertyValues);

	// 	var maxPropertyOccurence = 0;
	// 	var maxPropertyValue;

	// 	for (var property in countPropertyValues) {

	// 		if (countPropertyValues[property] > maxPropertyOccurence) {
	// 			maxPropertyOccurence = countPropertyValues[property];
	// 			maxPropertyValue = property;
	// 		}
	// 	}

	// 	console.log(maxPropertyOccurence);
	// 	console.log(maxPropertyValue);
	// 	this.maxPropertyValue = maxPropertyValue

	// }
}

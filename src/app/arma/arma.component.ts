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
	extraData: any
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
		this.httpClient.httpGet('/api/arma/shootsfired', this.httpParams).subscribe(data => {
			this.shootsFired = data
			this.extraData = this.shootsFired["ExtraData"]
			//	this.keysList()
			this.extraDataHandler()
			console.log(this.extraData);
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

	extraDataHandler() {
		this.keyList = { 'TriggerHappy': 'Trigger Happy : O jogardor <b>' + this.getMax(this.extraData["TriggerHappy"], "count").unit.user_name + "</b> foi quem disparou mais com <b> " + this.getMax(this.extraData["TriggerHappy"], "count").count + "</b> tiros", 'mostWeaponUsed': 'Arma mais utilizada : Foi ' + this.getMax(this.extraData["mostWeaponUsed"], "count").weapon + " com " + this.getMax(this.extraData["mostWeaponUsed"], "count").count + " jogadores a jogar com ela", 'mostUsedMode': 'Modo mais utilizado : Foi ' + this.getMax(this.extraData["mostUsedMode"], "count").mode, 'AmmoDispenser': 'A ammo mais utilizada foi ' + this.getMax(this.extraData["AmmoDispenser"], "count").ammo }


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

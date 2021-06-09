import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NormalEndpointService } from '../services/normal-endpoint.service';

@Component({
	selector: 'app-create-mission',
	templateUrl: './create-mission.component.html',
	styleUrls: ['./create-mission.component.scss']
})
export class CreateMissionComponent implements OnInit {
	mission: FormGroup = new FormGroup({});
	errorList: any = {}
	missionCreated = false
	id: any
	constructor(private fb: FormBuilder, private http: NormalEndpointService, private activatedroute: ActivatedRoute) {
		this.activatedroute.params.subscribe(data => {
			this.id = data["id"]
		})
	}

	ngOnInit(): void {

		// var today = new Date(), friday, day;

		// day = today.getDay();
		// console.log(day)
		// console.log(today.getDate())

		// friday = today.getDate() - day + 5;

		// var newDate = new Date(today.setDate(friday));

		// newDate.setHours(22)
		// newDate.setMinutes(0)

		// console.log(newDate.getFullYear() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes());

		this.mission = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(30)]],
			breifing: ['', [Validators.required, Validators.maxLength(1500)]],
			slots: [''],
			data: ['', [Validators.required]]
		})
	}
	onSubmit() {
		this.http.httpPost('api/mission/', this.bodyGenerator()).subscribe(data => {
			console.log(data)
			this.missionCreated = true

		}, (error => {
			var key: any

			for (key in error.error) {
				this.errorList[key] = error.error[key] + "";
			}

		}))


	}

	checkValidator(validatorNames: any, name: any) {
		if (validatorNames.invalid && (validatorNames.dirty || validatorNames.touched)) {
			return name + " é obrigatorio";
		}
		return this.errorList[name]

	}

	getNames(validatorNames: string) {
		return this.mission.get(validatorNames)!
	}
	bodyGenerator() {
		return {
			"missionName": this.getNames("name").value,
			"briefing": this.getNames("breifing").value,
			"maxsolts": this.getNames("slots").value,
			"data": this.getNames("data").value,
			"campaign": this.id,
			"typeofmission": "missao"
		}
	}
}

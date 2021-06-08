import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-create-mission',
	templateUrl: './create-mission.component.html',
	styleUrls: ['./create-mission.component.scss']
})
export class CreateMissionComponent implements OnInit {
	mission: FormGroup = new FormGroup({});
	errorList: any = {}
	constructor(private fb: FormBuilder) { }

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
			breifing: ['', [Validators.required, Validators.maxLength(30)]],
			slots: [''],
			data: [''],
			logo: ['']
		})
	}
	onSubmit() {

	}

	checkValidator(validatorNames: any, name: any) {
		if (validatorNames.invalid && (validatorNames.dirty || validatorNames.touched)) {
			return name + " is Invalid";
		}
		return this.errorList[name]

	}

	getNames(validatorNames: string) {
		return this.mission.get(validatorNames)!
	}
	bodyGenerator() {
		return {
			"name": this.getNames("name").value,
			"breifing": this.getNames("breifing").value,
			"slots": this.getNames("slots").value,
			"data": this.getNames("data").value,
			"logo": this.getNames("logo").value,
		}
	}
}

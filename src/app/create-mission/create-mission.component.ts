import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-create-mission',
	templateUrl: './create-mission.component.html',
	styleUrls: ['./create-mission.component.scss']
})
export class CreateMissionComponent implements OnInit {
	mission: FormGroup = new FormGroup({});
	constructor(private fb: FormBuilder) { }

	ngOnInit(): void {
	}

}

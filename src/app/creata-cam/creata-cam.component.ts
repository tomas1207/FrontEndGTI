import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-creata-cam',
	templateUrl: './creata-cam.component.html',
	styleUrls: ['./creata-cam.component.scss']
})
export class CreataCamComponent implements OnInit {
	public filterDate: Date;
	campaign: FormGroup = new FormGroup({});
	constructor(private fb: FormBuilder) { }

	ngOnInit(): void {
		this.campaign = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(30)]],
			slots: ['', [Validators.required, Validators.email]],
			description: ['', [Validators.required, Validators.maxLength(1500)]],

		})
	}

}

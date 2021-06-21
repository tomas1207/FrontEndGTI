import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NormalEndpointService } from '../services/normal-endpoint.service';

@Component({
	selector: 'app-creata-cam',
	templateUrl: './creata-cam.component.html',
	styleUrls: ['./creata-cam.component.scss']
})
export class CreataCamComponent implements OnInit {
	public filterDate: Date;
	errorList: any = {}
	msg: any;
	noLoginUser: any
	success: boolean = false;
	checkstogare: any
	campaign: FormGroup = new FormGroup({});
	constructor(private fb: FormBuilder, private http: NormalEndpointService) { }

	ngOnInit(): void {
		this.campaign = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(30)]],
			logo: ['', [Validators.required]],
			ismaincampaing: [false, [Validators.required]]
		})
		this.checkstogare = this.http.checkuserstorage();
		if (this.checkstogare == null) {
			this.noLoginUser = true
			this.msg = "<h3>Login necessário para ver a pagina 💩</h3>"
		}
	}
	checkValidator(validatorNames: any, name: any) {
		if (validatorNames.invalid && (validatorNames.dirty || validatorNames.touched)) {
			return name + " é obrigatorio";
		}
		return this.errorList[name]

	}

	getNames(validatorNames: string) {
		return this.campaign.get(validatorNames)!
	}
	onChange(event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.getNames("logo").setValue(file);
		}
	}

	bodyGenerator() {
		const formData = new FormData();
		formData.append("name", this.getNames("name").value);
		formData.append("image", this.getNames("logo").value);
		formData.append("ismaincampaing", this.getNames("ismaincampaing").value);
		formData.append("status", "true");


		return formData

	}
	onSubmit() {
		console.log(this.bodyGenerator())
		this.http.httpPost('/api/campaign/', this.bodyGenerator()).subscribe(data => {
			this.success = true;
			console.log(data)

		}, (error => {
			var key: any

			for (key in error.error) {
				this.errorList[key] = error.error[key] + "";
			}




		}))


	}
}

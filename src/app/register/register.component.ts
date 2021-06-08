import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NormalEndpointService } from '../services/normal-endpoint.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	signUp: FormGroup = new FormGroup({});
	errorList: any = {}

	constructor(private fb: FormBuilder, private http: NormalEndpointService, private router: Router) { }

	ngOnInit(): void {
		this.signUp = this.fb.group({
			userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
			email: ['', [Validators.required, Validators.email]],
			steamID: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
			vestName: ['', [Validators.required, Validators.maxLength(15)]],
			passWord: ['', [Validators.required, Validators.minLength(6)]]
		})
	}

	checkValidator(validatorNames: any, name: any) {
		if (validatorNames.invalid && (validatorNames.dirty || validatorNames.touched)) {
			return name + " is Invalid";
		}
		return this.errorList[name]

	}

	getNames(validatorNames: string) {
		return this.signUp.get(validatorNames)!
	}

	// setNames(parms: string, message: string) {
	// 	return this.singup.get(parms)!.setValue(message)
	// }

	bodyGenerator() {
		return {
			"userName": this.getNames("userName").value,
			"email": this.getNames("email").value,
			"steamID": this.getNames("steamID").value,
			"vestName": this.getNames("vestName").value,
			"password": this.getNames("passWord").value,
		}
	}
	onSubmit() {
		this.http.httpPost('api/users/register/', this.bodyGenerator()).subscribe(data => {
			this.router.navigate(['/'])

		}, (error => {
			var key: any

			for (key in error.error) {
				this.errorList[key] = error.error[key] + "";
			}

		}))
	}
}

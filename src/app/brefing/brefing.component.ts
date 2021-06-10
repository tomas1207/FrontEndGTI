import { applySourceSpanToStatementIfNeeded } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NormalEndpointService } from "../services/normal-endpoint.service";
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-brefing',
	templateUrl: './brefing.component.html',
	styleUrls: ['./brefing.component.scss']
})
export class BrefingComponent implements OnInit {
	missionObject: any;
	userobj: any;
	routeSub: any;
	missionID: any;
	slotsavl: number;
	httpParamas: any;
	msg: any;
	id: any;
	noLoginUser: any

	constructor(private httpClient: NormalEndpointService, private router: ActivatedRoute) { }

	ngOnInit(): void {
		this.routeSub = this.router.params.subscribe(params => {
			this.missionID = params['id']
		});
		this.httpClient.httpGet("/api/mission/details", new HttpParams().set('mission', this.missionID)).subscribe((res) => {
			this.missionObject = res
			console.log(this.missionObject.Data)
			this.slotsavl = Object.keys(this.missionObject.Data[0].joined).length;
			this.userobj = localStorage.getItem("userinfo")
			this.userobj = JSON.parse(this.userobj)
			this.id = this.missionObject.Data[0].id
		}, (error => {

			if (error.error.code == "token_not_valid") {
				this.noLoginUser = true
				this.msg = "<h3>Login necessário para ver a pagina :poop: </h3>"
			} else if (error.status == 401) {
				this.noLoginUser = true
				this.msg = "<h3>Login necessário para ver a pagina :poop:</h3>"
			} else {
				this.noLoginUser = true
				this.msg = "<h3>Erro no servidor :construction_site:</h3>"
			}
		}))

	}

	joinmission(): void {
		this.httpParamas = new HttpParams().set('mission', this.missionID)
		this.httpClient.httpPost("/api/mission/register", this.httpParamas).subscribe(data => {
			this.missionObject = data
			this.slotsavl = Object.keys(this.missionObject.joined).length;
		})
	}
	endmission(): void {

		this.httpClient.httpPut("/api/mission/", { "id": this.missionID }).subscribe((res) => {
			console.log(res)
		})

	}
}


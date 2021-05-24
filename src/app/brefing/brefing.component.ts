import { applySourceSpanToStatementIfNeeded } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NormalEndpointService } from "../services/normal-endpoint.service";

@Component({
	selector: 'app-brefing',
	templateUrl: './brefing.component.html',
	styleUrls: ['./brefing.component.scss']
})
export class BrefingComponent implements OnInit {
	missionObject: any;
	userobj: any;
	slotsavl: number;
	httpParamas: any;

	constructor(private httpClient: NormalEndpointService) { }

	ngOnInit(): void {
		if (window.history.state.id == undefined) {
			this.missionObject = sessionStorage.getItem("brefing")
		} else {
			sessionStorage.setItem("brefing", JSON.stringify(window.history.state))
			this.missionObject = sessionStorage.getItem("brefing")
		}
		this.missionObject = JSON.parse(this.missionObject)
		this.slotsavl = Object.keys(this.missionObject.joined).length;
		this.userobj = localStorage.getItem("userinfo")
		this.userobj = JSON.parse(this.userobj)
	}

	joinmission(): void {
		this.httpParamas = new HttpParams().set('mission', this.missionObject.id)
		this.httpClient.httpPost("/api/mission/register", { "mission": this.missionObject.id }, this.httpParamas).subscribe(data => {
			this.missionObject = data
			this.slotsavl = Object.keys(this.missionObject.joined).length;
		})
	}
	endmission(): void {
		var id = this.missionObject.id
		this.httpClient.httpPut("/api/mission/", { "id": id }).subscribe((res) => {
			console.log(res)
		})

	}
}


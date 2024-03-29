import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NormalEndpointService {
	storageUser: any
	publicUrl: string = 'https://gtifenix.ddns.net'
	constructor(private http: HttpClient) { }
	httpGet(url: any, http: HttpParams = new HttpParams()): Observable<object> {
		//TODO New System for sessionStorage Maybey key check
		this.checkuserstorage()
		return this.http.get(this.urlconst(url), {
			//TODO: Fazer as headers abstrac
			headers: this.httpHeaders(),
			params: http!
		})
	}
	httpPost(url: any, boby: any, http = null): Observable<object> {
		this.checkuserstorage();
		return this.http.post(this.urlconst(url), boby, {
			//TODO: Fazer as headers abstrac
			headers: this.httpHeaders()
		})
	}
	httpPut(url: any, boby: any, http = null): Observable<object> {
		this.checkuserstorage();
		return this.http.put(this.urlconst(url), boby, {
			//TODO: Fazer as headers abstrac
			headers: this.httpHeaders()
		})
	}
	private urlconst(url: any) {
		return 'https://gtifenix.ddns.net' + url
	}
	checkuserstorage(): any {
		if (sessionStorage.getItem("access") != undefined) {
			return sessionStorage
		}
		else if (localStorage.getItem("access") != undefined) {
			return localStorage
		} else {
			return null
		}
	}
	private httpHeaders(): any {
		if (this.checkuserstorage() == null) {
			return null;
		}
		return new HttpHeaders({
			'Authorization': 'Bearer ' + this.checkuserstorage().getItem('access')
		})
	}
}

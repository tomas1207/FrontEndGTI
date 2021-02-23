import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NormalEndpointService {
	storageUser: any

	constructor(private http: HttpClient) { }
	httpGet(url: any, http = null): Observable<object> {
		if (sessionStorage.length != 0) {
			this.storageUser = sessionStorage
		}
		else {
			this.storageUser = localStorage
		}
		return this.http.get(url, {
			//TODO: Fazer as headers abstrac
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + this.storageUser.getItem('access')
			}),
			params: http!
		})
	}

}

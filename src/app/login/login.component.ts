import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Login} from '../Models/Login/login'
import {CookieService} from 'ngx-cookie-service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	//userModule:UserModule
	model = new Login('','');
	closeResult =''
	submitted = false;
	loading = false;
	loginerro = false;
	@ViewChild('content') html:any
    constructor(private httpClient:HttpClient,private cookie:CookieService, private modalService:NgbModal) { }

    ngOnInit(): void {

    }
	ngAfterViewInit(){
		this.open(this.html)
	}

    onSubmit() {
		this.loading = true;
		this.submitted = true;

		this.httpClient.post<any>('/api/token/',this.model).subscribe(data => {
			console.log("ESTOU AKI")
			this.cookie.set('access',data.access)
			this.cookie.set('refresh',data.refresh)
			this.closeResult = 'success'
			this.modalService.dismissAll()
		},error => {
			console.log(error)
			this.loginerro = true;
		})
		this.loading = false;

    }
	open(content:any) {
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
		  this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
		  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	  }

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}

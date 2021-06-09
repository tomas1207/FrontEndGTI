import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../Models/Login/login'
import { CookieService } from 'ngx-cookie-service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';




@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	//userModule:UserModule
	model = new Login('', '');
	closeResult = ''
	remember = false
	submitted = false;
	loading = false;
	loginerro = false;
	@ViewChild('content') html: any
	@Output() loginuser: EventEmitter<any> = new EventEmitter();
	constructor(private httpClient: HttpClient, private cookie: CookieService, private modalService: NgbModal, public modal: NgbActiveModal, private router: Router) { }

	ngOnInit(): void {

	}
	ngAfterViewInit() {
		//this.open(this.html)
	}

	onSubmit() {
		this.loading = true;
		this.submitted = true;

		this.httpClient.post<any>('/api/users/login/', this.model).subscribe(data => {
			console.log(data)
			if (data.msg == "") {
				this.loginerro = true;
				return
			}
			if (this.remember) {
				localStorage.setItem('access', data.access)
				localStorage.setItem('refresh', data.refresh)
			} else {
				sessionStorage.setItem('access', data.access)
				sessionStorage.setItem('refresh', data.refresh)
			}
			localStorage.setItem('userinfo', JSON.stringify(data.userdata))
			this.closeResult = 'success'
			this.loginuser.emit(true)
			this.modalService.dismissAll()
		}, error => {
			console.log(error)

			this.loginerro = true;
		})
		this.loading = false;

	}
	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
	changeRemember(e: any) {
		this.remember = !this.remember;
	}
	signUp() {
		this.modalService.dismissAll()
		this.router.navigate(['Register'])
	}
}

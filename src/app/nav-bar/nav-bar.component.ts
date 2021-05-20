import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component'
@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
	isMenuCollapsed = true;
	isUserLogin = false;
	constructor(private modalService: NgbModal) { }

	ngOnInit(): void {
		this.isUserLogin = this.checkLoginUser()
	}
	openmodal() {
		const loginModal = this.modalService.open(LoginComponent)
		loginModal.componentInstance.loginuser.subscribe((loginSuc: boolean) => {
			this.isUserLogin = loginSuc
		})
	}
	checkLoginUser(): boolean {
		if (sessionStorage.getItem('access') != undefined) {
			return true;
		} else {
			return false;
		}
	}
	logoutUser() {
		this.isUserLogin = false;
		sessionStorage.removeItem('access')
		localStorage.removeItem('access')
	}

}

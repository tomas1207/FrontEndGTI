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
	constructor(private modalService: NgbModal) { }

	ngOnInit(): void {
	}
	openmodal() {
		const arroz = this.modalService.open(LoginComponent)
		arroz.componentInstance()
	}

}

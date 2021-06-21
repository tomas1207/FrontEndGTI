
import { query, style, stagger, group, useAnimation, animate, keyframes, animation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
		AOS.init();
	}

}

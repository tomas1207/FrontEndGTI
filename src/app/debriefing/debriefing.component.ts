import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-debriefing',
	templateUrl: './debriefing.component.html',
	styleUrls: ['./debriefing.component.scss']
})
export class DebriefingComponent implements OnInit {
	missionID: any = {}
	private routeSub: Subscription;

	constructor(private router: ActivatedRoute) { }

	ngOnInit(): void {

		this.routeSub = this.router.params.subscribe(params => {
			this.missionID = params['id']
		});

	}
	ngOnDestroy() {
		this.routeSub.unsubscribe();
	}

}

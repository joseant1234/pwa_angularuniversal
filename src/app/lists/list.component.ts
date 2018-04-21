import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'list',
	templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit{
	
	constructor(private route: ActivatedRoute){}

	ngOnInit(){
		console.log(this.route.snapshot.params.id);
	}
}
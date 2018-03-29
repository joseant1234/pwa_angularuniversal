import {Component, OnInit} from '@angular/core';

import { ListService } from '../services/lists.service';

@Component({
  selector: 'app-home',
  templateUrl:  'home.component.html'
})
export class HomeComponent implements OnInit {


  constructor(private listS : ListService) {}

  ngOnInit() {
  }
}

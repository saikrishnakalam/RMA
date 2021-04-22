import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-advanced-search-component',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  @Output() closeAdvancedSearchClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

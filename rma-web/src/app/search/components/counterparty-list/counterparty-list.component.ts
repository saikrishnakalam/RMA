import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RmaAuthorisation } from 'src/app/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-counterparty-list-component',
  templateUrl: './counterparty-list.component.html',
  styleUrls: ['./counterparty-list.component.scss']
})
export class CounterpartyListComponent implements OnInit {

  @Input() counterPartySearchResults: RmaAuthorisation[] = [];
  @Output() detailsClicked = new EventEmitter();

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  showDetails(counterparty: RmaAuthorisation) {
    this.detailsClicked.emit(counterparty);
  }
  getOverallIncomingAuthStatus(counterparty: RmaAuthorisation){
    return this.searchService.getOverallIncomingAuthStatus(counterparty);
  }

  getOverallOutgoingAuthStatus(counterparty: RmaAuthorisation){
    return this.searchService.getOverallOutgoingAuthStatus(counterparty);
  }
}
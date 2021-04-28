import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RmaAuthorisation, RmaAuthorisationWithPagination } from 'src/app/core';
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
  getStatusByCode(status: string) {
    return this.searchService.getStatusByCode(status);
  }
  getImageSrcByCode(status: string) {
    return this.searchService.getOverallIncomingImageSrc(status);
  }
  getBicByCode(code: string) {
    return this.searchService.getBicByCode(code);
  }
  getMyBicByCode(code: string) {
    return this.searchService.getMyBicByCode(code);
  }
}

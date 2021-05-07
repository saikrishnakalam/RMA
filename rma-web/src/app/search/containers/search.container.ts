import { Component, OnInit } from '@angular/core';
import { RmaBIC, RmaAuthorisation, RmaFilter, RmaAuthorisationWithPagination } from 'src/app/core';
import { SearchApiService } from '../services/search-api.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-container',
  templateUrl: './search.container.html'
})
export class SearchContainer implements OnInit {
  isSearchClicked: boolean = false;
  isAdvancedSearchClicked: boolean = false;
  isDetailsClicked: boolean = false;
  counterpartyClicked: RmaAuthorisation | undefined;

  constructor(private searchApiService: SearchApiService, private searchService: SearchService) { }

  ngOnInit(): void {
    console.log("oninit");
    this.getCounterPartyBics();
    this.getCountries();
  }

  showAdvancedSearch() {
    this.isAdvancedSearchClicked = true;
  }

  hideAdvancedSearch() {
    this.isAdvancedSearchClicked = false;
  }

  showDetails(counterparty: RmaAuthorisation) {
    this.isDetailsClicked = true;
    this.counterpartyClicked = counterparty;
  }

  hideDetails() {
    this.isDetailsClicked = false;
  }

  getCounterPartyBics() {
    this.searchApiService.getCounterPartyBics().subscribe(data => {
      this.searchService.setCounterPartyBics(data);
    });
  }

  getCountries() {
    this.searchApiService.getCountries().subscribe(data => {
      this.searchService.setCountries(data);
    });
  }

  showSearchResults(){
    this.isSearchClicked = true;
  }
}

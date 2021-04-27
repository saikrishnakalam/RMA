import { Component, OnInit } from '@angular/core';
import { RmaBIC, RmaAuthorisation, RmaFilter } from 'src/app/core';
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
  counterPartyList: RmaBIC[] = [];
  counterPartyAutocompleteResults: RmaBIC[] = [];
  searchResults: RmaAuthorisation[] = [];
  counterPartyText: string = '';
  filters: RmaFilter = {
    counterPartyText: '',
    selectedIssuerBic: [],
    selectedIssuerBicCountry: [],
    selectedCounterParty: [],
    selectedCounterPartyCountry: [],
    selectedIncomingAuths: [],
    selectedOutgoingAuths: [],
  };

  constructor(private searchApiService: SearchApiService, private searchService: SearchService) { }

  ngOnInit(): void {
    console.log("oninit")
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
      console.log(data);
      this.counterPartyList = data;

      this.searchService.setCounterPartyBics(data);
    });
  }

  getCountries() {
    this.searchApiService.getCountries().subscribe(data => {
      this.searchService.setCountries(data);
    });
  }

  searchCounterParty(counterPartyText: string) {
    console.log(counterPartyText);
    this.counterPartyText = counterPartyText;
    this.counterPartyAutocompleteResults = this.searchService.filterCounterPartyList(counterPartyText);

  }

  filterCounterPartyList(counterParty: string) {
    console.log(this.counterPartyList);
    if (counterParty === '' || counterParty === null) {
      return [];
    }
    return counterParty ? this.counterPartyList.filter(s => s.bicCode.toLowerCase().indexOf(counterParty.toLowerCase()) != -1)
      : [];
  }

  getSearchResults(counterPartyText: string) {
    console.log("Search clicked", this.filters, counterPartyText);
    this.counterPartyText = counterPartyText;
    this.filters.counterPartyText = counterPartyText;
    const counterPartyList = this.searchService.filterCounterPartyList(counterPartyText);
    this.filters.counterPartyBics = counterPartyList.map((myBic: any) => myBic.bicCode);
    this.isSearchClicked = true;
    if (counterPartyText) {
      this.searchApiService.getRelations(this.filters).subscribe(data => {
        this.searchResults = data;

      });
    } else {
      this.searchResults = [];
    }
  }

  setSelectedFilters(selectedFilters: RmaFilter) {
    this.filters = selectedFilters;
  }
}

import { Component, EventEmitter, Input, OnInit, Output, HostListener, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RmaAuthorisation, RmaBIC, RmaFilter, Authorisation, Country } from 'src/app/core';
import { SearchService } from '../../services/search.service';
import { SearchApiService } from '../../services/search-api.service';

interface IssuerBICDropDownData extends RmaBIC {
  checked: boolean;
}

interface CounterPartyCountryBICDropDownData extends Country {
  checked: boolean;
}

@Component({
  selector: 'app-search-results-component',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @Output() clickedAdvancedSearch = new EventEmitter();
  @Output() detailsClicked = new EventEmitter();
  @Input() counterPartySearchResults: RmaAuthorisation[] = [];
  
  @Input() counterPartyText: string | undefined;
  searchedText: string | undefined;
  @Output() changedCounterPartyText = new EventEmitter();
  counterPartyAutocompleteResults: RmaBIC[] = [];
  searchTextChanged = new Subject<string>();
  showAutocompleteData: boolean = false;
  @Output() searchClicked = new EventEmitter();
  showBicDropDown: boolean = false;
  showIncomingTrafficDropDown: boolean = false;
  showOutgoingTrafficDropDown: boolean = false;
  showCountryCounterPartyDropDown: boolean = false;
  issuerBicList: IssuerBICDropDownData[] = [];
  countriesListForDropdown: CounterPartyCountryBICDropDownData[] = [];
  incomingAuthorisationList = [{
    status: 'Authorised',
    code: 'A',
    checked: false
  }, {
    status: 'Partly Authorised',
    code: 'PA',
    checked: false
  }, {
    status: 'Not Authorised',
    code: 'NA',
    checked: false
  }];
  outgoingAuthorisationList = [{
    status: 'Authorised',
    code: 'A',
    checked: false
  }, {
    status: 'Partly Authorised',
    code: 'PA',
    checked: false
  }, {
    status: 'Not Authorised',
    code: 'NA',
    checked: false
  }];
  @Input() filters: RmaFilter = {
    selectedIssuerBic: []
  };
  @Output() selectedFilters = new EventEmitter();


  constructor(private searchService: SearchService,
    private searchApiService: SearchApiService,
    private eleRef: ElementRef) { }

  @HostListener("document:click", ["$event"])
  docEvent(mouseEvent: any) {
    const paths = mouseEvent.path;
    if (!paths.some((p: any) => p === this.eleRef.nativeElement)) {
      this.showBicDropDown = false;
      this.showCountryCounterPartyDropDown = false;
      this.showIncomingTrafficDropDown = false;
      this.showOutgoingTrafficDropDown = false;
    }
  }

  ngOnInit(): void {

    const rawIssuerBicList = localStorage.getItem('issuerBicList');
    this.issuerBicList = rawIssuerBicList ? JSON.parse(rawIssuerBicList) : [];
    console.log(this.counterPartyText);
    this.countriesListForDropdown = this.searchService.countriesList as CounterPartyCountryBICDropDownData[];
    //this.searchedText = this.counterPartyText;
  }

  toggleIssuerBic(issuerBic: IssuerBICDropDownData) {
    issuerBic.checked = !issuerBic.checked;
    if (issuerBic.checked) {
      this.filters.selectedIssuerBic?.push(issuerBic.bicCode);
    } else {
      this.filters.selectedIssuerBic = this.filters.selectedIssuerBic?.filter(elem => elem !== issuerBic.bicCode);
    }
    this.selectedFilters.emit(this.filters);
  }

  toggleCounterPartyCountryDropDown(counterPartyCountry: CounterPartyCountryBICDropDownData) {
    counterPartyCountry.checked = !counterPartyCountry.checked;
    if (counterPartyCountry.checked) {
      this.filters.selectedCounterPartyCountry?.push(counterPartyCountry.countryCode);
    } else {
      this.filters.selectedCounterPartyCountry = this.filters.selectedCounterPartyCountry?.filter(elem => elem !== counterPartyCountry.countryCode);
    }
    this.selectedFilters.emit(this.filters);
  }

  toggleIncomingAuthDropDown(incomingAuth: any) {
    incomingAuth.checked = !incomingAuth.checked;
    if (incomingAuth.checked) {
      this.filters.selectedIncomingAuths?.push(incomingAuth.code);
    } else {
      this.filters.selectedIncomingAuths = this.filters.selectedIncomingAuths?.filter(elem => elem !== incomingAuth.code);
    }
    this.selectedFilters.emit(this.filters);
  }

  toggleOutgoingAuthDropDown(outgoingAuth: any) {
    outgoingAuth.checked = !outgoingAuth.checked;
    if (outgoingAuth.checked) {
      this.filters.selectedOutgoingAuths?.push(outgoingAuth.code);
    } else {
      this.filters.selectedOutgoingAuths = this.filters.selectedOutgoingAuths?.filter(elem => elem !== outgoingAuth.code);
    }
    this.selectedFilters.emit(this.filters);
  }
  resetIssuerBicsFilter() {
    this.filters.selectedIssuerBic = [];
    this.issuerBicList.map(issuerBic => issuerBic.checked = false);
  }
  resetCounterPartyCountriesFilter() {
    this.filters.selectedCounterPartyCountry = [];
    this.countriesListForDropdown.map(country => country.checked = false);
  }
  resetIncomingAuthsFilter() {
    this.filters.selectedIncomingAuths = [];
    this.incomingAuthorisationList.map(incomingAuthorisation => incomingAuthorisation.checked = false);
  }
  resetOutgoingAuthsFilter() {
    this.filters.selectedOutgoingAuths = [];
    this.outgoingAuthorisationList.map(outgoingAuthorisation => outgoingAuthorisation.checked = false);
  }

  showAdvancedSearch() {
    this.clickedAdvancedSearch.emit();
  }

  showDetails(counterparty: RmaAuthorisation) {
    this.detailsClicked.emit(counterparty);
  }

  getCounterPartyResults(counterPartyText: string) {
    this.counterPartyText = counterPartyText;
    this.counterPartyAutocompleteResults = [];
  }

  onSearchCounterparty(e: any) {
    const counterPartyText = e.target.value;
    console.log(counterPartyText);
    if (e.target.value.length >= 3) {
      this.showAutocompleteData = true;
      this.searchService.counterPartyText = counterPartyText;

      this.counterPartyAutocompleteResults = this.searchService.filterCounterPartyList(counterPartyText);
      
    }
  }
  resetAllFilters(){
    this.resetIssuerBicsFilter();
    this.resetCounterPartyCountriesFilter();
    this.resetIncomingAuthsFilter();
    this.resetOutgoingAuthsFilter();
  }

}

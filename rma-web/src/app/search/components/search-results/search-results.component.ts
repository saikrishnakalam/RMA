import { Component, EventEmitter, Input, OnInit, Output, HostListener, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RmaAuthorisation, RmaBIC, RmaFilter, Authorisation, Country, RmaAuthorisationWithPagination } from 'src/app/core';
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

  counterPartyText: string = '';
  counterPartySearchResults: RmaAuthorisationWithPagination[] = [];

  counterPartyAutocompleteResults: RmaBIC[] = [];
  showAutocompleteData: boolean = false;

  showBicDropDown: boolean = false;
  showIncomingTrafficDropDown: boolean = false;
  showOutgoingTrafficDropDown: boolean = false;
  showCountryCounterPartyDropDown: boolean = false;
  issuerBicList: IssuerBICDropDownData[] = [];
  countriesListForDropdown: CounterPartyCountryBICDropDownData[] = [];

  paginationItems: any = [];
  pageNo: number = 1;
  sortKey: number = 1;

  incomingAuthorisationList: any = [];
  outgoingAuthorisationList: any = [];
  filters: RmaFilter = {};

  constructor(private searchService: SearchService,
    private searchApiService: SearchApiService,
    private eleRef: ElementRef) { }

  @HostListener("document:click", ["$event"])
  onClick(mouseEvent: any) {
    const paths = mouseEvent.path;
    //console.log(paths);
    if (!paths.some((p: any) => p === this.eleRef.nativeElement)) {
      this.closeAllDropDowns();
    } else if (this.eleRef.nativeElement.contains(mouseEvent.target)) {
      //console.log("Show bic", mouseEvent.target.innerHTML);
      if (mouseEvent.target.innerHTML === 'My BIC') {
        this.showCountryCounterPartyDropDown = false;
        this.showIncomingTrafficDropDown = false;
        this.showOutgoingTrafficDropDown = false;
      } else if (mouseEvent.target.innerHTML === 'Country counterparty') {
        this.showBicDropDown = false;
        this.showIncomingTrafficDropDown = false;
        this.showOutgoingTrafficDropDown = false;
      } else if (mouseEvent.target.innerHTML === 'Incoming traffic') {
        this.showCountryCounterPartyDropDown = false;
        this.showBicDropDown = false;
        this.showOutgoingTrafficDropDown = false;
      } else if (mouseEvent.target.innerHTML === 'Outgoing traffic') {
        this.showCountryCounterPartyDropDown = false;
        this.showIncomingTrafficDropDown = false;
        this.showBicDropDown = false;
      }
    }
  }

  closeAllDropDowns() {
    this.showBicDropDown = false;
    this.showCountryCounterPartyDropDown = false;
    this.showIncomingTrafficDropDown = false;
    this.showOutgoingTrafficDropDown = false;
  }

  ngOnInit(): void {
    this.getAuthorisationList();
    const rawIssuerBicList = localStorage.getItem('issuerBicList');
    this.issuerBicList = rawIssuerBicList ? JSON.parse(rawIssuerBicList) : [];
    this.searchService.setMyBics(this.issuerBicList);
    console.log(this.searchService.counterPartyText);
    this.counterPartyText = this.searchService.counterPartyText;
    this.countriesListForDropdown = this.searchService.countriesList as CounterPartyCountryBICDropDownData[];
    this.filters = {...this.searchService.filters};
    this.filters.corrBICs = this.searchService.filters.corrBICs;
    this.getSearchResults();

    //this.searchedText = this.counterPartyText;
  }

  getAuthorisationList() {
    this.searchApiService.getAuthorisationList().subscribe(authorisations => {
      this.incomingAuthorisationList = JSON.parse(JSON.stringify(authorisations));
      this.outgoingAuthorisationList = JSON.parse(JSON.stringify(authorisations));
    });
  }

  toggleIssuerBic(issuerBic: IssuerBICDropDownData) {
    issuerBic.checked = !issuerBic.checked;
    if (issuerBic.checked) {
      this.filters.myBICs?.push(issuerBic.bicCode);
    } else {
      this.filters.myBICs = this.filters.myBICs?.filter(elem => elem !== issuerBic.bicCode);
    }
    // this.selectedFilters.emit(this.filters);
  }

  toggleCounterPartyCountryDropDown(counterPartyCountry: CounterPartyCountryBICDropDownData) {
    counterPartyCountry.checked = !counterPartyCountry.checked;
    if (counterPartyCountry.checked) {
      this.filters.countryCode?.push(counterPartyCountry.countryCode);
    } else {
      this.filters.countryCode = this.filters.countryCode?.filter(elem => elem !== counterPartyCountry.countryCode);
    }
    // this.selectedFilters.emit(this.filters);
  }

  toggleIncomingAuthDropDown(incomingAuth: any) {
    incomingAuth.checked = !incomingAuth.checked;
    if (incomingAuth.checked) {
      this.filters.inTraffic?.push(incomingAuth.code);
    } else {
      this.filters.inTraffic = this.filters.inTraffic?.filter(elem => elem !== incomingAuth.code);
    }
    // this.selectedFilters.emit(this.filters);
  }

  toggleOutgoingAuthDropDown(outgoingAuth: any) {
    outgoingAuth.checked = !outgoingAuth.checked;
    if (outgoingAuth.checked) {
      this.filters.outTraffic?.push(outgoingAuth.code);
    } else {
      this.filters.outTraffic = this.filters.outTraffic?.filter(elem => elem !== outgoingAuth.code);
    }
    // this.selectedFilters.emit(this.filters);
  }
  resetIssuerBicsFilter() {
    this.filters.myBICs = [];
    this.issuerBicList.map(issuerBic => issuerBic.checked = false);
  }
  resetCounterPartyCountriesFilter() {
    this.filters.countryCode = [];
    this.countriesListForDropdown.map(country => country.checked = false);
  }
  resetIncomingAuthsFilter() {
    this.filters.inTraffic = [];
    this.incomingAuthorisationList.map((incomingAuthorisation: any) => incomingAuthorisation.checked = false);
  }
  resetOutgoingAuthsFilter() {
    this.filters.outTraffic = [];
    this.outgoingAuthorisationList.map((outgoingAuthorisation: any) => outgoingAuthorisation.checked = false);
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

      this.counterPartyAutocompleteResults = this.searchService.filterCounterPartyListByName(counterPartyText);

    }
  }
  resetAllFilters() {
    this.resetIssuerBicsFilter();
    this.resetCounterPartyCountriesFilter();
    this.resetIncomingAuthsFilter();
    this.resetOutgoingAuthsFilter();
  }

  goToPageNumber(page: any) {
    // console.log(page);
    this.filters.pageNumber = page.pageNumber;
    if (page.clickedOn === 'pageNo') {
      this.pageNo = page.pageNumber;
    } else if (page.clickedOn === 'next') {
      if (page.pageNumber > this.paginationItems.length) {
        
        this.filters.pageCount = 1;
        this.filters.beginRecord = this.counterPartySearchResults[this.counterPartySearchResults.length - 1].endRecord + 1;
        this.getSearchResultsForPagination(page);
      } else {
        this.pageNo = page.pageNumber;
      }
    } else if (page.clickedOn === 'prev') {
      if (page.pageNumber < this.counterPartySearchResults[0].pageNumber) {
        this.filters.pageCount = 1;
        this.filters.beginRecord = page.paginationItems[page.pageNumber - 1].beginRecord;
        this.getSearchResultsForPagination(page);
      } else {
        this.pageNo = page.pageNumber;
      }
    }
  }

  onSortSelected(event: any) {
    const value = event.target.value;
    this.sortKey = value * 1;
    this.filters.sortKey = this.sortKey;
    this.filters.pageCount = 7;
    this.filters.beginRecord = 1;

    console.log(value);
    this.getSearchResults();
  }
  onChangePageSize(pageSize: number) {
    this.filters.pageSize = pageSize * 1;
    this.filters.pageCount = 7;
    this.filters.beginRecord = 1;
    this.getSearchResults();
  }

  getSearchResults(searchObj: any = null) {
    if (searchObj != null) {
      this.searchService.counterPartyText = searchObj.counterPartyText;
      if (searchObj.type === "code") {
        if(searchObj.counterPartyText != ""){
          this.searchService.filters.corrBICs = [searchObj.counterPartyText];
          this.filters.corrBICs= [searchObj.counterPartyText];
        }else {
          this.searchService.filters.corrBICs = [];
          this.filters.corrBICs= [];
        }
        
      } else {
        const counterPartyList = this.searchService.filterCounterPartyListByName(searchObj.counterPartyText);
        this.searchService.filters.corrBICs = counterPartyList.map((myBic: any) => myBic.bicCode);
        this.filters.corrBICs = counterPartyList.map((myBic: any) => myBic.bicCode);
      }
    }
    this.searchApiService.getRelations(this.filters).subscribe(data => {
      this.counterPartySearchResults = [...data];
      this.paginationItems = [...data];
    });
  }

  getSearchResultsForPagination(page: any) {
    console.log("Search clicked", this.sortKey, this.filters);
    this.searchApiService.getRelations(this.filters).subscribe(data => {
      if(data.length>0){
        if (page.clickedOn === 'next') {
          this.counterPartySearchResults.push(...data);
          this.counterPartySearchResults.shift();
          this.paginationItems.push(...data);
          
        } else if (page.clickedOn === 'prev') {
          this.counterPartySearchResults = [...data].concat(this.counterPartySearchResults);
          this.counterPartySearchResults.pop();
        } 
        this.pageNo = page.pageNumber;
      }else {
        if (page.clickedOn === 'next') {
          this.pageNo = page.pageNumber-1
        }
      }
      
      //console.log(this.counterPartySearchResults.length, this.counterPartySearchResults)
    });

  }

  showResetAllButton() {
    if (this.filters.myBICs!.length > 0 || this.filters.countryCode!.length > 0 || this.filters.inTraffic!.length > 0 || this.filters.outTraffic!.length > 0) {
      return true;
    }
    return false;
  }

}

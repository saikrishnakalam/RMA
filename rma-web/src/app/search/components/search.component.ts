import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RmaBIC } from 'src/app/core';
import { SearchService } from '../services/search.service';
import { SearchApiService } from '../services/search-api.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() clickedAdvancedSearch = new EventEmitter();
  @Output() clickedSearch = new EventEmitter();
  @Output() searchCounterPartyForText = new EventEmitter();
  counterPartyAutocompleteResults: RmaBIC[] = [];
  searchClicked: boolean = false;

  constructor(private searchService: SearchService, private searchApiService: SearchApiService) { }

  ngOnInit(): void {
  }

  showAdvancedSearch() {
    this.clickedAdvancedSearch.emit();
  }

  getSearchResults(counterPartyText: string) {
    console.log(counterPartyText);
    this.searchService.counterPartyText = counterPartyText;
    this.searchClicked = true;
    this.clickedSearch.emit(counterPartyText);
  }

  searchCounterParty(counterPartyText: string) {
    console.log(counterPartyText);
    this.searchService.counterPartyText = counterPartyText;
    this.counterPartyAutocompleteResults = this.searchService.filterCounterPartyList(counterPartyText);
  }

}

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
  searchClicked: boolean = false;

  constructor(private searchService: SearchService, private searchApiService: SearchApiService) { }

  ngOnInit(): void {
  }

  showAdvancedSearch() {
    this.clickedAdvancedSearch.emit();
  }

  getSearchResults(searchObj: any) {

    if (searchObj.counterPartyText.length >= 3) {
      this.searchService.counterPartyText = searchObj.counterPartyText;
      if (searchObj.type === "code") {
        this.searchService.filters.corrBICs = [searchObj.counterPartyText];
      } else {
        const counterPartyList = this.searchService.filterCounterPartyListByName(searchObj.counterPartyText);
        this.searchService.filters.corrBICs = counterPartyList.map((myBic: any) => myBic.bicCode);
      }
      console.log(this.searchService.filters);
      this.searchClicked = true;
      this.clickedSearch.emit(searchObj.counterPartyText);
    }

  }

}

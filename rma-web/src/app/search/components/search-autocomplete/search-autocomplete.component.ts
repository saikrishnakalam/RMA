import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RmaBIC } from 'src/app/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-autocomplete-component',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss']
})
export class SearchAutocompleteComponent implements OnInit {

  @Output() searchClicked = new EventEmitter();
  counterPartyAutocompleteResults: RmaBIC[] = [];
  counterPartyText: string | undefined;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void { }

  //passing the keyup event
  onSearchCounterparty(e: any) {
    if(e.target.value.length >= 3){
      this.counterPartyAutocompleteResults = this.searchService.filterCounterPartyList(e.target.value);
    }
    
  }

  getCounterPartyResults(counterPartyText: string) {
    this.counterPartyText = counterPartyText;
    this.counterPartyAutocompleteResults = [];
  }

}

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
  @Input() fromPage: string = "search";
  counterPartyAutocompleteResultsByCode: RmaBIC[] = [];
  counterPartyAutocompleteResultsByName: RmaBIC[] = [];
  counterPartyText: string | undefined;
  searchType: "code" | "name" = "code";

  constructor(private searchService: SearchService) { }

  ngOnInit(): void { 
    console.log(this.searchService.counterPartyText);
    this.counterPartyText = this.searchService.counterPartyText;
  }

  //passing the keyup event
  onSearchCounterparty(e: any) {
    if(e.target.value.length >= 3){
      console.time("By Code");
      this.counterPartyAutocompleteResultsByCode = this.searchService.filterCounterPartyListByCode(e.target.value);
      console.timeEnd("By Code");
      console.time("By Name");
      this.counterPartyAutocompleteResultsByName = this.searchService.filterCounterPartyListByName(e.target.value);
      console.timeEnd("By Name");
    }else {
      this.counterPartyAutocompleteResultsByCode = [];
    this.counterPartyAutocompleteResultsByName = [];
    }
    
  }

  getCounterPartyResults(counterPartyText: string, searchType: "code" | "name") {
    this.counterPartyText = counterPartyText;
    this.searchType = searchType;
    this.counterPartyAutocompleteResultsByCode = [];
    this.counterPartyAutocompleteResultsByName = [];
  }

  clickedOnSearch(){
    this.searchClicked.emit({counterPartyText:this.counterPartyText, type: this.searchType});
  }

  clearCounterPartyText(){
    this.counterPartyText = '';
    this.searchService.counterPartyText = '';
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchContainer } from './containers/search.container';
import { SearchComponent } from './components/search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { CounterpartyDetailsComponent } from './components/details/counterparty-details.component';
import { CounterpartyListComponent } from './components/counterparty-list/counterparty-list.component';
import { SearchAutocompleteComponent } from './components/search-autocomplete/search-autocomplete.component';
import { NoResultsComponent } from './components/no-results/no-results.component';
import { SharedModule } from '../shared';
import { SearchApiService } from './services/search-api.service';
import { SearchService } from './services/search.service';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [SearchContainer, 
    SearchComponent, SearchResultsComponent, 
    AdvancedSearchComponent, CounterpartyDetailsComponent,
    CounterpartyListComponent, SearchAutocompleteComponent,
    NoResultsComponent, PaginationComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule
  ],
  providers: [SearchApiService, SearchService]
})
export class SearchModule { }

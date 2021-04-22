import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';
import { RmaBIC, RmaAuthorisation, RmaFilter , ApiService, Country } from 'src/app/core';

@Injectable()
export class SearchApiService {
  counterPartyBicsCache = new Map();
  constructor (private apiService: ApiService) {}

  getCounterPartyBics(): Observable<RmaBIC[]> {
    return this.apiService.get('getCounterPartyBics').pipe(map((data: RmaBIC[]) => data));
  }
  getCountries(): Observable<Country[]> {
    return this.apiService.get('getCountries').pipe(map((data: Country[]) => data));
  }

  getRelations(selectedFilters: RmaFilter): Observable<RmaAuthorisation[]> {
    let params = new HttpParams();
    if(selectedFilters.selectedIssuerBic && selectedFilters.selectedIssuerBic.length > 0){
      params = params.append('myBics', selectedFilters.selectedIssuerBic.toString())
    }
    if(selectedFilters.counterPartyText && selectedFilters.counterPartyText != ''){
      params = params.append('counterPartyText', selectedFilters.counterPartyText)
    }
    if(selectedFilters.selectedCounterPartyCountry && selectedFilters.selectedCounterPartyCountry.length > 0){
      params = params.append('counterPartyCountries', selectedFilters.selectedCounterPartyCountry.toString())
    }

    if(selectedFilters.selectedIncomingAuths && selectedFilters.selectedIncomingAuths.length > 0){
      params = params.append('incomingAuthDirection', selectedFilters.selectedIncomingAuths.toString())
    }

    if(selectedFilters.selectedOutgoingAuths && selectedFilters.selectedOutgoingAuths.length > 0){
      params = params.append('outgoingAuthDirection', selectedFilters.selectedOutgoingAuths.toString())
    }

    console.log(params);
    return this.apiService.get('getRelations', params)
      .pipe(map((data: RmaAuthorisation[]) => data));
  }

}

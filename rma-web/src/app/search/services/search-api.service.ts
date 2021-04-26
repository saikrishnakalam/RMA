import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';
import { RmaBIC, RmaAuthorisation, RmaFilter, ApiService, Country } from 'src/app/core';

@Injectable()
export class SearchApiService {
  counterPartyBicsCache = new Map();
  constructor(private apiService: ApiService) { }

  getCounterPartyBics(): Observable<RmaBIC[]> {
    return this.apiService.get('getCounterPartyBics').pipe(map((data: RmaBIC[]) => data));
  }
  getCountries(): Observable<Country[]> {
    return this.apiService.get('getCountries').pipe(map((data: Country[]) => data));
  }

  getRelations(selectedFilters: RmaFilter): Observable<RmaAuthorisation[]> {
    let params = new HttpParams();

    if (selectedFilters.selectedIssuerBic && selectedFilters.selectedIssuerBic.length > 0) {
      params = params.append('myBics', selectedFilters.selectedIssuerBic.toString())
    } else {
      const rawIssuerBicList = localStorage.getItem('issuerBicList');
      const issuerBicList = rawIssuerBicList ? JSON.parse(rawIssuerBicList) : [];
      params = params.append('myBics', issuerBicList.toString())
    }

    if (selectedFilters.counterPartyText && selectedFilters.counterPartyText != '') {
      params = params.append('counterPartyText', selectedFilters.counterPartyText)
    }
    if (selectedFilters.selectedCounterPartyCountry && selectedFilters.selectedCounterPartyCountry.length > 0) {
      params = params.append('counterPartyCountryCodes', selectedFilters.selectedCounterPartyCountry.toString())
    }

    if (selectedFilters.selectedIncomingAuths && selectedFilters.selectedIncomingAuths.length > 0) {
      params = params.append('incomingTrafficOptions', selectedFilters.selectedIncomingAuths.toString())
    }

    if (selectedFilters.selectedOutgoingAuths && selectedFilters.selectedOutgoingAuths.length > 0) {
      params = params.append('outgoingTrafficOptions', selectedFilters.selectedOutgoingAuths.toString())
    }

    params = params.append('startRecordNumber', '1');
    params = params.append('pageSize', '50');
    params = params.append('numberOfPages', '7');

    console.log(params);
    return this.apiService.get('getAuthInfo', params)
      .pipe(map((data: RmaAuthorisation[]) => data));
  }

}

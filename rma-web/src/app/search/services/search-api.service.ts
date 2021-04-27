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
    return this.apiService.get('getBics').pipe(map((data: RmaBIC[]) => data));
  }
  getCountries(): Observable<Country[]> {
    return this.apiService.get('getCountries').pipe(map((data: Country[]) => data));
  }

  getRelations(selectedFilters: RmaFilter): Observable<RmaAuthorisation[]> {
    let params = new HttpParams();
    let body: any = {
      beginRecord: 1,
      pageSize: 50,
      pageCount: 7,
      sortKey: 1
    };
    if (selectedFilters.selectedIssuerBic && selectedFilters.selectedIssuerBic.length > 0) {
      params = params.append('myBics', selectedFilters.selectedIssuerBic.toString());
      body = { ...body, myBics: selectedFilters.selectedIssuerBic.toString() };
    } else {
      const rawIssuerBicList = localStorage.getItem('issuerBicList');
      const issuerBicList = rawIssuerBicList ? JSON.parse(rawIssuerBicList) : [];
      let result = issuerBicList.map((myBic: any) => myBic.bicCode);
      params = params.append('myBics', result.toString());
      body = { ...body, myBics: result.toString() };
    }

    if (selectedFilters.counterPartyBics && selectedFilters?.counterPartyBics.length != null) {
      params = params.append('counterPartyText', selectedFilters?.counterPartyBics.toString());
      body = { ...body, corrBICs: selectedFilters.counterPartyBics };
    }
    if (selectedFilters.selectedCounterPartyCountry && selectedFilters.selectedCounterPartyCountry.length > 0) {
      params = params.append('counterPartyCountryCodes', selectedFilters.selectedCounterPartyCountry.toString())
      body = { ...body, countryCode: selectedFilters.selectedCounterPartyCountry.toString() };
    }

    if (selectedFilters.selectedIncomingAuths && selectedFilters.selectedIncomingAuths.length > 0) {
      params = params.append('incomingTrafficOptions', selectedFilters.selectedIncomingAuths.toString());
      body = { ...body, inTraffic: selectedFilters.selectedIncomingAuths.toString() };
    }

    if (selectedFilters.selectedOutgoingAuths && selectedFilters.selectedOutgoingAuths.length > 0) {
      params = params.append('outgoingTrafficOptions', selectedFilters.selectedOutgoingAuths.toString());
      body = { ...body, outTraffic: selectedFilters.selectedOutgoingAuths.toString() };
    }

    params = params.append('startRecordNumber', '1');
    params = params.append('pageSize', '50');
    params = params.append('numberOfPages', '7');
    params = params.append('sortKey', 'BESTMATCH');

    console.log(body);
    return this.apiService.post('getAuthInfo', body)
      .pipe(map((data: RmaAuthorisation[]) => data));
  }

}

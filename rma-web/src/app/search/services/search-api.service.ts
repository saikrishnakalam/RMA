import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';
import { RmaBIC, RmaAuthorisationWithPagination, RmaFilter, ApiService, Country } from 'src/app/core';

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
  getAuthorisationList(){
    return this.apiService.get('assets/data/authorisation.json')
      .pipe(map((data: any) => data));
  }
  getRelations(selectedFilters: RmaFilter): Observable<RmaAuthorisationWithPagination[]> {
    let body: any = {
      beginRecord: selectedFilters.beginRecord,
      pageSize: selectedFilters.pageSize,
      pageCount: selectedFilters.pageCount,
      sortKey: selectedFilters.sortKey,
      pageNumber: selectedFilters.pageNumber
    };
    if (selectedFilters.myBICs && selectedFilters.myBICs.length > 0) {
      body = { ...body, myBics: selectedFilters.myBICs };
    } else {
      const rawIssuerBicList = localStorage.getItem('issuerBicList');
      const issuerBicList = rawIssuerBicList ? JSON.parse(rawIssuerBicList) : [];
      let result = issuerBicList.map((myBic: any) => myBic.bicCode);
      body = { ...body, myBics: result };
    }

    if (selectedFilters.corrBICs && selectedFilters?.corrBICs.length != null) {
      //params = params.append('counterPartyText', selectedFilters?.corrBICs.toString());
      body = { ...body, corrBICs: selectedFilters.corrBICs };
    }
    if (selectedFilters.countryCode && selectedFilters.countryCode.length > 0) {
      //params = params.append('counterPartyCountryCodes', selectedFilters.countryCode.toString())
      body = { ...body, countryCode: selectedFilters.countryCode.toString() };
    }

    if (selectedFilters.inTraffic && selectedFilters.inTraffic.length > 0) {
      body = { ...body, inTraffic: selectedFilters.inTraffic.toString() };
    }

    if (selectedFilters.outTraffic && selectedFilters.outTraffic.length > 0) {
      body = { ...body, outTraffic: selectedFilters.outTraffic.toString() };
    }

    console.log(body);
    return this.apiService.post('getAuthInfo', body)
      .pipe(map((data: RmaAuthorisationWithPagination[]) => data));
  }

}

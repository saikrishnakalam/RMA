import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { RmaBIC, Country , ApiService } from 'src/app/core';

@Injectable()
export class AppService {
  constructor (private apiService: ApiService) {}

  getIssuerBic(): Observable<RmaBIC[]> {
    return this.apiService.getFromJSON('assets/data/mybic-list.json')
      .pipe(map((data: RmaBIC[]) => data));
  }

  getCountries(): Observable<Country[]> {
    return this.apiService.get('getCountries')
      .pipe(map((data: Country[]) => data));
  }

}

import { RmaBIC } from './rma-bic.model';

interface ExpiryDate {
  year: string;
  month: string;
  day: string;
}
export interface RmaAuthorisation {
  counterPartyBIC: string,
  myBIC: string,
  inTraffic: string,
  outTraffic: string,
  inExpiry: ExpiryDate,
  outExpiry: ExpiryDate
}

export interface RmaAuthorisationWithPagination {
  pageNumber: number;
  beginRecord: number;
  endRecord: number;
  recordCountInPage: number;
  recordList: RmaAuthorisation[]
}

export interface Authorisation {
  authStatus: string;
  service: string;
  permissions: string;
  validityStart: string;
  validityEnd: string;
}

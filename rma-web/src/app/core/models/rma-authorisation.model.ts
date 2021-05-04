import { RmaBIC } from './rma-bic.model';

interface ExpiryDate {
  year: string;
  month: string;
  day: string;
}
export interface RmaAuthorisation {
  correspondentBic: string,
  issuerBic: string,
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
  moreData: boolean;
  recordList: RmaAuthorisation[]
}

export interface Authorisation {
  authStatus: string;
  service: string;
  permissions: string;
  validityStart: string;
  validityEnd: string;
}

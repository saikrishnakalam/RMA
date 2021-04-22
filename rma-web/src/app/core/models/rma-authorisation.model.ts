import { RmaBIC } from './rma-bic.model';

export interface RmaAuthorisation {
  id: number,
  myBic: string,
  myBicName: string,
  myBicCity: string,
  myBicCountry: string,
  counterPartyBic: string,
  counterPartyBicName: string,
  counterPartyBicCity: string,
  counterPartyBicCountry: string,
  incomingAuths: Authorisation[];
  outgoingAuths: Authorisation[];
}

export interface Authorisation {
  authStatus: string;
  service: string;
  permissions: string;
  validityStart: string;
  validityEnd: string;
}
import { RmaBIC } from './rma-bic.model';

export interface RmaAuthorisation {
  id: number,
  issuerBic: string,
  myBicName: string,
  myBicCity: string,
  myBicCountry: string,
  correspondentBic: string,
  counterPartyBicName: string,
  counterPartyBicCity: string,
  counterPartyBicCountry: string,
  incomingStatus: string,
  outgoingStatus: string,
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

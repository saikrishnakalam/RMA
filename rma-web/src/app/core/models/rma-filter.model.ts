export interface RmaFilter {
    counterPartyText?: string;
    selectedIssuerBic?: string[];
    selectedIssuerBicCountry?: string[];
    selectedCounterParty?: string[];
    selectedCounterPartyCountry?: string[];
    selectedIncomingAuths?: string[];
    selectedOutgoingAuths?: string[];
    authService?: string;
    authType?: string;
    authStatus?: string;
    messageTypes?: string[];
    validStartDate?: string;
    validEndDate?: string;
}
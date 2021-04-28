export interface RmaFilter {
    myBICs?: string[];
    corrBICs?: string[];
    countryCode?: string[];
    inTraffic?: string[];
    outTraffic?: string[];
    beginRecord?: number;
    pageSize?: number;
    PageCount?: number;
    sortKey?: number;
}
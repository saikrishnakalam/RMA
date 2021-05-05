export interface RmaFilter {
    myBICs?: string[];
    corrBICs?: string[];
    countryCode?: string[];
    inTraffic?: string[];
    outTraffic?: string[];
    beginRecord?: number;
    pageSize?: number;
    pageCount?: number;
    sortKey?: number;
    pageNumber?: number;
}
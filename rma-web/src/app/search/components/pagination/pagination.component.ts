import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RmaAuthorisationWithPagination } from "src/app/core";

@Component({
    selector: 'app-search-pagination-component',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit{
    @Input() counterPartySearchResults: RmaAuthorisationWithPagination[] = [];
    paginationItems: RmaAuthorisationWithPagination[] = [];
    @Output() goToPageNumber = new EventEmitter();
    currentPage: number = 1;
    totalPages: number = 7;

    constructor() { }

    ngOnInit(){
        this.paginationItems = this.counterPartySearchResults;
    }

    clickedOnPageNumber(pageNumber: number){
        this.currentPage = pageNumber;
        this.goToPageNumber.emit(pageNumber);
    }

    goToNextPage(){
        //if(this.currentPage < this.counterPartySearchResults.length){
            this.currentPage = this.currentPage+1;
            this.goToPageNumber.emit(this.currentPage);
        //}
        console.log(this.currentPage);
        
    }
    goToPreviousPage(){
        if(this.currentPage > 0){
            this.currentPage = this.currentPage-1;
            this.goToPageNumber.emit(this.currentPage);
        }
    }
}

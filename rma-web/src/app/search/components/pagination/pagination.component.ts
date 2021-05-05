import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RmaAuthorisationWithPagination } from "src/app/core";

@Component({
    selector: 'app-search-pagination-component',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges{
    @Input() counterPartySearchResults: RmaAuthorisationWithPagination[] = [];
    paginationItems: any = [];
    @Output() goToPageNumber = new EventEmitter();
    currentPage: number = 1;
    totalPages: number = 2;
    @Input() pageSize:number = 50;
    @Output() changePageSize = new EventEmitter();
    constructor() { }

    ngOnInit(){
        let self=this;
        this.paginationItems = this.counterPartySearchResults.map(obj => ({
            beginRecord: obj.beginRecord,
            endRecord: obj.endRecord,
            pageNumber: obj.pageNumber,
            recordCountInPage: obj.recordCountInPage,
            moreData: obj.moreData
        }));
        console.log(this.paginationItems);
    }
    ngOnChanges(changes: SimpleChanges){

    }

    clickedOnPageNumber(pageNumber: number){
        this.currentPage = pageNumber;
        this.goToPageNumber.emit({clickedOn: 'pageNo',pageNumber:this.currentPage, paginationItems: this.paginationItems});
    }

    goToNextPage(){
        //if(this.currentPage < this.counterPartySearchResults.length){
            this.currentPage = this.currentPage+1;
            this.goToPageNumber.emit({clickedOn: 'next',pageNumber:this.currentPage, paginationItems: this.paginationItems});
            console.log(this.paginationItems.length);
            console.log(this.currentPage);
        //}
        //console.log(this.paginationItems);
        
    }
    goToPreviousPage(){
        if(this.currentPage > 0){
            this.currentPage = this.currentPage-1;
            //console.log(this.paginationItems);
            this.goToPageNumber.emit({clickedOn: 'prev',pageNumber: this.currentPage, paginationItems: this.paginationItems});
        }
    }
    onPageSizeChange(event: any){
        this.changePageSize.emit(event.target.value);
    }
}

import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RmaAuthorisationWithPagination } from "src/app/core";

@Component({
    selector: 'app-search-pagination-component',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges{
    @Input() counterPartySearchResults: RmaAuthorisationWithPagination[] = [];
    @Input() paginationItems: any = [];
    @Output() goToPageNumber = new EventEmitter();
    @Input() currentPage: number = 1;
    totalPages: number = 2;
    @Input() pageSize:number = 50;
    @Output() changePageSize = new EventEmitter();
    constructor() { }

    ngOnInit(){
        let self=this;
        this.getPaginationItems(this.counterPartySearchResults);
        console.log(this.counterPartySearchResults);
        console.log(this.paginationItems);
    }
    ngOnChanges(changes: SimpleChanges){
        if(changes.paginationItems && changes.paginationItems.currentValue){

        console.log(changes.paginationItems);
        console.log(changes.paginationItems!.currentValue);
        console.log(changes.paginationItems!.previousValue);
            this.getPaginationItems(changes.paginationItems.currentValue);
        }
        if(changes.counterPartySearchResults && changes.counterPartySearchResults.currentValue){
           // this.counterPartySearchResults = changes.counterPartySearchResults.currentValue;
        }
       
    }
    getPaginationItems(counterPartySearchResults: any){
        // this.paginationItems = counterPartySearchResults.map((obj: any) => ({
        //     beginRecord: obj.beginRecord,
        //     endRecord: obj.endRecord,
        //     pageNumber: obj.pageNumber,
        //     recordCountInPage: obj.recordCountInPage,
        //     moreRecords: obj.moreRecords
        // }));
        console.log(this.paginationItems);
    }

    clickedOnPageNumber(pageNumber: number){
        this.currentPage = pageNumber;
        this.goToPageNumber.emit({clickedOn: 'pageNo',pageNumber:this.currentPage, paginationItems: this.paginationItems});
    }

    goToNextPage(){
        //if(this.currentPage < this.counterPartySearchResults.length){
            this.currentPage = this.currentPage+1;
            this.goToPageNumber.emit({clickedOn: 'next',pageNumber:this.currentPage, paginationItems: this.paginationItems});
            console.log(this.paginationItems);
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

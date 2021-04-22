import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { RmaAuthorisation, Authorisation } from 'src/app/core';

@Component({
	selector: 'app-counterparty-details-component',
	templateUrl: './counterparty-details.component.html',
	styleUrls: ['./counterparty-details.component.scss']
})
export class CounterpartyDetailsComponent implements OnInit {
	@Input() counterparty: RmaAuthorisation | undefined;
	@Output() backToList = new EventEmitter();
	@Input() counterPartySearchResults: RmaAuthorisation[] = [];
	curPosition = -1;

	ngOnInit() {
		console.log(this.counterparty)
		this.curPosition = this.findCurrentLocationInList();
	}

	// Sends an event back to the search container telling it to hide the details page
	hideDetails() {
		this.backToList.emit();
	}

	// Finds the position of the current counterparty in the search results array
	findCurrentLocationInList() {
		if (this.counterparty !== undefined) {
			for (let i=0; i<this.counterPartySearchResults.length; i++) {
				if (this.counterPartySearchResults[i].id == this.counterparty.id) {
					return i;
				}
			}
		}
		return -1;
	}

	// Moves to the previous or next counterparty in the list
	iterateThroughList(forward: boolean) {
		if (this.curPosition != -1) {
			if (forward && this.curPosition < this.counterPartySearchResults.length - 1) {
				this.curPosition++;
				this.counterparty = this.counterPartySearchResults[this.curPosition];
			}
			else if (!forward && this.curPosition > 0) {
				this.curPosition--;
				this.counterparty = this.counterPartySearchResults[this.curPosition];
			}
		}
	}

	// Checks if the previous button should be hidden
	previousButtonHidden() {
		if (this.curPosition == 0) {
			return true;
		}
		else {
			return false;
		}
	}

	// Checks if the next button should be hidden
	nextButtonHidden() {
		if (this.curPosition == this.counterPartySearchResults.length - 1) {
			return true;
		}
		else {
			return false;
		}
	}

	// Determines the incoming authorisation status
	getOverallIncomingAuthStatus() {
		let numAuthorised = 0;
		if (this.counterparty !== undefined) {
			for (let i=0; i<this.counterparty.incomingAuths.length; i++) {
				if (this.getAuthStatusDetails(this.counterparty.incomingAuths[i]) == "Authorised") {
					numAuthorised++;
				}
			}
			if (numAuthorised == this.counterparty.incomingAuths.length) {
				return "Authorised";
			}
			else if (numAuthorised == 0) {
				return "Not authorised";
			}
			else {
				return "Partly authorised";
			}
		}
		else {
			return "Not authorised";
		}
	}

	// Determines the outgoing authorisation status
	getOverallOutgoingAuthStatus() {
		let numAuthorised = 0;
		if (this.counterparty !== undefined) {
			for (let i=0; i<this.counterparty.outgoingAuths.length; i++) {
				if (this.getAuthStatusDetails(this.counterparty.outgoingAuths[i]) == "Authorised") {
					numAuthorised++;
				}
			}
			if (numAuthorised == this.counterparty.outgoingAuths.length) {
				return "Authorised";
			}
			else if (numAuthorised == 0) {
				return "Not authorised";
			}
			else {
				return "Partly authorised";
			}
		}
		else {
			return "Not authorised";
		}
	}

	// Determines the correct image to display next to the overall incoming status
	getOverallIncomingImageSrc() {
		let status = this.getOverallIncomingAuthStatus();
		if (status == "Authorised") {
			return "assets/images/details/authorised.png";
		}
		else if (status == "Partly authorised") {
			return "assets/images/details/partly_authorised.png";
		}
		else {
			return "assets/images/details/not_authorised.png";
		}
	}

	// Determines the correct image to display next to the overall outgoing status
	getOverallOutgoingImageSrc() {
		let status = this.getOverallOutgoingAuthStatus();
		if (status == "Authorised") {
			return "assets/images/details/authorised.png";
		}
		else if (status == "Partly authorised") {
			return "assets/images/details/partly_authorised.png";
		}
		else {
			return "assets/images/details/not_authorised.png";
		}
	}

	// Determines the authorisation status, taking expiration into account
	getAuthStatusDetails(auth: Authorisation) {
		if (auth.authStatus != "Authorised" || !this.authIsExpired(auth)) {
			return auth.authStatus;
		}
		else {
			return "Expired";
		}
	}

	// Determines if an authorisation is expired
	authIsExpired(auth: Authorisation) {
		let dateNow = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
		//dateNow = '2021-03-25';  // hardcoded for testing
		if (auth && auth.validityEnd != null && auth.validityEnd.length > 0 && auth.validityEnd < dateNow) {
			return true;
		}
		return false;
	}

	// Converts a date to the UI-displayed format
	convertDate(date: string) {
		return formatDate(date, 'dd MMM yyyy', 'en-US').toUpperCase();
	}

	// Returns the counterparty's BIC address
	getCounterpartyCode() {
		if (this.counterparty !== undefined) {
			return this.counterparty.counterPartyBic.toUpperCase();
		}
		else {
			return "";
		}
	}

	// Returns the counterparty's name
	getCounterpartyName() {
		if (this.counterparty !== undefined) {
			return this.counterparty.counterPartyBicName.toUpperCase();
		}
		else {
			return "";
		}
	}

	// Returns the counterparty's area
	getCounterpartyArea() {
		if (this.counterparty !== undefined) {
			return this.counterparty.counterPartyBicCity;
		}
		else {
			return "";
		}
	}

	// Returns the counterparty's country
	getCounterpartyCountry() {
		if (this.counterparty !== undefined) {
			return this.counterparty.counterPartyBicCountry;
		}
		else {
			return "";
		}
	}

	// Returns the user BIC's address
	getMyBic() {
		if (this.counterparty !== undefined) {
			return this.counterparty.myBic.toUpperCase();
		}
		else {
			return "";
		}
	}

	// Returns the user BIC's area
	getMyBicArea() {
		if (this.counterparty !== undefined) {
			return this.counterparty.myBicCity;
		}
		else {
			return "";
		}
	}

	// Returns the user BIC's country
	getMyBicCountry() {
		if (this.counterparty !== undefined) {
			return this.counterparty.myBicCountry;
		}
		else {
			return "";
		}
	}

	// Returns an array consisting of the counterparty's incoming authorisations
	getIncomingAuths() {
		if (this.counterparty !== undefined) {
			return this.counterparty.incomingAuths;
		}
		else {
			return [];
		}
	}

	// Returns an array consisting of the counterparty's outgoing authorisations
	getOutgoingAuths() {
		if (this.counterparty !== undefined) {
			return this.counterparty.outgoingAuths;
		}
		else {
			return [];
		}
	}

	// Changes the previous button image on hover
	hoverPreviousButton(element: any) {
		element.setAttribute('src', element.baseURI + 'assets/images/details/previous_hover.png');
	}

	// Resets the previous button image on unhover
	unhoverPreviousButton(element: any) {
		element.setAttribute('src', element.baseURI + 'assets/images/details/previous.png');
	}

	// Changes the next button image on hover
	hoverNextButton(element: any) {
		element.setAttribute('src', element.baseURI + 'assets/images/details/next_hover.png');
	}

	// Resets the next button image on unhover
	unhoverNextButton(element: any) {
		element.setAttribute('src', element.baseURI + 'assets/images/details/next.png');
	}
}

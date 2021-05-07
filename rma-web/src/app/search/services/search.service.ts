import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

import { RmaBIC, RmaAuthorisation, Authorisation, Country, RmaFilter } from 'src/app/core';

@Injectable()
export class SearchService {
	myBics: RmaBIC[] = [];
	counterPartyBics: RmaBIC[] = [];
	counterPartyText: string = '';
	selectedCounterPartyFromSearch: RmaBIC | undefined;
	countriesList: Country[] = [];
	filters: RmaFilter = {
		myBICs: [],
		corrBICs: [],
		countryCode: [],
		inTraffic: [],
		outTraffic: [],
		pageSize: 50,
		pageCount: 10,
		beginRecord: 1,
		sortKey: 1,
		pageNumber: 1
	  };
	constructor() { }

	getCounterPartyBics(): RmaBIC[] {
		return this.counterPartyBics;
	}

	setCounterPartyBics(counterPartyBics: RmaBIC[]): void {
		this.counterPartyBics = counterPartyBics;
	}

	getMyBics(): RmaBIC[] {
		return this.myBics;
	}

	setMyBics(myBics: RmaBIC[]): void {
		this.myBics = myBics;
	}

	getCountries(): Country[] {
		return this.countriesList;
	}

	setCountries(countriesList: Country[]): void {
		this.countriesList = countriesList;
	}

	compare1(a: RmaBIC, b: RmaBIC) {
		return a.bicCode.toLowerCase().localeCompare(b.bicCode.toLowerCase()) || a.institutionName.toLowerCase().localeCompare(b.institutionName.toLowerCase());
	}
	compare(counterParty: string, data: RmaBIC[]) {
		var first: RmaBIC[] = [];
		var others: RmaBIC[] = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i].bicCode.toLowerCase().indexOf(counterParty.toLowerCase()) == 0 || data[i].institutionName.toLowerCase().indexOf(counterParty.toLowerCase()) == 0) {
				first.push(data[i]);
			} else {
				if (data[i].bicCode.toLowerCase().indexOf(counterParty.toLowerCase()) != -1) {
					others = [data[i], ...others];
				} else {
					others.push(data[i]);
				}

			}
		}
		first.sort(this.compare1);
		others.sort();
		return (first.concat(others));
		//return a.bicCode.localeCompare(b.bicCode) || a.institutionName.localeCompare(b.institutionName);
	}
	//Filter the counter party bics with given institution name (counter party)
	filterCounterPartyListByCode(counterParty: string) {
		if (counterParty === '' || counterParty === null) {
			return [];
		}
		return counterParty ? this.counterPartyBics.filter(s => s.bicCode.toLowerCase().indexOf(counterParty.toLowerCase()) != -1)
			: [];
	}
	filterCounterPartyListByName(counterParty: string) {
		if (counterParty === '' || counterParty === null) {
			return [];
		}
		return counterParty ? this.counterPartyBics.filter(s => s.institutionName.toLowerCase().indexOf(counterParty.toLowerCase()) != -1)
			: [];
	}
	getStatusByCode(status: string) {
		console.log(status);
		switch (status) {
			case 'A': return "Authorised";
			case 'J': return "Partly Authorised";
			case 'N': return "Not Authorised";
			default: return;//throw new Error("Status Not Found");
		}
	}

	getBicByCode(code: string) {
		return this.counterPartyBics.find(bic => bic.bicCode == code);
	}

	getMyBicByCode(code: string) {
		return this.myBics.find(bic => bic.bicCode == code);
	}

	// Determines the incoming authorisation status
	getOverallIncomingAuthStatus(counterparty: RmaAuthorisation) {
		let numAuthorised = 0;
		if (counterparty !== undefined) {
			for (let i = 0; i < counterparty.inTraffic?.length; i++) {
				if (counterparty.inTraffic[i] == "A") {
					numAuthorised++;
				}
			}
			if (numAuthorised == counterparty.inTraffic?.length) {
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
	getOverallOutgoingAuthStatus(counterparty: RmaAuthorisation) {
		let numAuthorised = 0;
		if (counterparty !== undefined) {
			for (let i = 0; i < counterparty.outTraffic?.length; i++) {
				if (counterparty.outTraffic[i] == "A") {
					numAuthorised++;
				}
			}
			if (numAuthorised == counterparty.outTraffic?.length) {
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
	getOverallIncomingImageSrc(status: string) {
		if (status == "Authorized") {
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
	getOverallOutgoingImageSrc(status: string) {

		if (status == "Authorized") {
			return "assets/images/details/authorised.png";
		}
		else if (status == "Partly authorized") {
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

}

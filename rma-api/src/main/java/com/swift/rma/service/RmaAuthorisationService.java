package com.swift.rma.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.swift.rma.entity.RmaAuthorisation;
import com.swift.rma.entity.RmaBic;
import com.swift.rma.entity.RmaCountry;
import com.swift.rma.model.RmaSearchResult;

public interface RmaAuthorisationService {
	
	List<RmaAuthorisation> getRelationsByFilter(String counterPartyText, List<String> issuerBics, List<String> correspondentBics, List<String> incomingAuthDirection, List<String> outgoingAuthDirection);
	
	List<RmaBic> getCounterPartyBics();
	
	List<RmaBic> getCounterPartyBicsByName(String counterPartyText);
	
	List<RmaCountry> getCountries();

}

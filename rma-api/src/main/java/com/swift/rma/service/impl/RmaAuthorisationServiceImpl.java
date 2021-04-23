package com.swift.rma.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swift.rma.entity.RmaAuthorisation;
import com.swift.rma.entity.RmaBic;
import com.swift.rma.entity.RmaCountry;
import com.swift.rma.model.AuthService;
import com.swift.rma.model.RmaSearchResult;
import com.swift.rma.repository.RmaBicRepository;
import com.swift.rma.repository.RmaCountryRepository;
import com.swift.rma.repository.RmaAuthorisationRepository;
import com.swift.rma.service.RmaAuthorisationService;

@Service
public class RmaAuthorisationServiceImpl implements RmaAuthorisationService {

	@Autowired
	private RmaAuthorisationRepository rmaAuthorisationRepository;

	@Autowired
	private RmaBicRepository rmaBicRepository;

	@Autowired
	private RmaCountryRepository rmaCountryRepository;

	public List<RmaAuthorisation> getRelationsByFilter(String counterPartyText, List<String> issuerBics,
			List<String> correspondentBics, List<String> incomingAuthDirection, List<String> outgoingAuthDirection) {
		
		
		List<RmaAuthorisation> searchAuthorisations = rmaAuthorisationRepository.getRelationsByFilter(counterPartyText, issuerBics,
				correspondentBics, incomingAuthDirection, outgoingAuthDirection);

		return searchAuthorisations;
	}

	public List<RmaBic> getCounterPartyBics() {
		return rmaBicRepository.getHeadBranchCounterPartyBics();
	}

	public List<RmaBic> getCounterPartyBicsByName(String counterPartyText) {
		return rmaBicRepository.getCounterPartyBicsByName(counterPartyText);
	}

	public List<RmaCountry> getCountries() {
		return rmaCountryRepository.findAll();
	}
}

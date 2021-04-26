package com.swift.rma.service.impl;

import java.util.Date;
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

import util.SortKey;

@Service
public class RmaAuthorisationServiceImpl implements RmaAuthorisationService {

	@Autowired
	private RmaAuthorisationRepository rmaAuthorisationRepository;

	@Autowired
	private RmaBicRepository rmaBicRepository;

	@Autowired
	private RmaCountryRepository rmaCountryRepository;

	@Override
	public List<RmaAuthorisation> getAuthInfo(String counterPartyText, List<String> myBics,
			List<String> counterPartyCountryCodes, List<String> incomingTrafficOptions,
			List<String> outgoingTrafficOptions, Integer startRecordNumber, Integer pageSize, Integer numberOfPages, SortKey sortKey) {

		List<RmaAuthorisation> authInfo = rmaAuthorisationRepository.getAuthInfo(counterPartyText, myBics,
				counterPartyCountryCodes, incomingTrafficOptions, outgoingTrafficOptions, startRecordNumber, pageSize,
				numberOfPages, sortKey);

		return authInfo;
	}

	@Override
	public List<RmaAuthorisation> getAuthInfoAdvanced(List<String> myBics, List<String> myBicCountryCodes,
			List<String> counterPartyBics, List<String> counterPartyBicCountryCodes, List<String> service,
			List<String> type, List<String> status, List<String> messageTypes, List<Date> startDate, List<Date> endDate,
			Integer startRecordNumber, Integer pageSize, Integer numberOfPages, SortKey sortKey) {

		List<RmaAuthorisation> authInfo =  rmaAuthorisationRepository.getAuthInfoAdvanced(myBics, myBicCountryCodes, counterPartyBics,
				counterPartyBicCountryCodes, service, type, status, messageTypes, startDate, endDate, startRecordNumber,
				pageSize, numberOfPages, sortKey);
		
		return authInfo;
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

package com.swift.rma.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.swift.rma.entity.RmaAuthorisation;
import com.swift.rma.entity.RmaBic;
import com.swift.rma.entity.RmaCountry;
import com.swift.rma.model.RmaSearchResult;

public interface RmaAuthorisationService {

	List<RmaAuthorisation> getAuthInfo(String counterPartyText, List<String> myBics,
			List<String> counterPartyCountryCodes, List<String> incomingTrafficOptions,
			List<String> outgoingTrafficOptions, Integer startPageNumber, Integer pageSize, Integer numberOfPages);

	List<RmaAuthorisation> getAuthInfoAdvanced(List<String> myBics, List<String> myBicCountryCodes,
			List<String> counterPartyBics, List<String> counterPartyBicCountryCodes, List<String> service,
			List<String> type, List<String> status, List<String> messageTypes, List<Date> startDate, List<Date> endDate,
			Integer startPageNumber, Integer pageSize, Integer numberOfPages);

	List<RmaBic> getCounterPartyBics();

	List<RmaBic> getCounterPartyBicsByName(String counterPartyText);

	List<RmaCountry> getCountries();

}

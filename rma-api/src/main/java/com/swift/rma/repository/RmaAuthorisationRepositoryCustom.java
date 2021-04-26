package com.swift.rma.repository;

import java.util.Date;
import java.util.List;

import javax.persistence.Tuple;

import com.swift.rma.entity.RmaAuthorisation;
import com.swift.rma.entity.RmaBic;

public interface RmaAuthorisationRepositoryCustom {
	List<RmaAuthorisation> getAuthInfo(String counterPartyText, List<String> myBics,
			List<String> counterPartyCountryCodes, List<String> incomingTrafficOptions,
			List<String> outgoingTrafficOptions, Integer startPageNumber, Integer pageSize, Integer numberOfPages);

	List<RmaAuthorisation> getAuthInfoAdvanced(List<String> myBics, List<String> myBicCountryCodes,
			List<String> counterPartyBics, List<String> counterPartyBicCountryCodes, List<String> service,
			List<String> type, List<String> status, List<String> messageTypes, List<Date> startDate, List<Date> endDate,
			Integer startPageNumber, Integer pageSize, Integer numberOfPages);
}

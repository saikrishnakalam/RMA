package com.swift.rma.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.swift.rma.entity.RmaCountry;
import com.swift.rma.entity.RmaBic;
import com.swift.rma.model.RmaSearchResult;
import com.swift.rma.entity.RmaAuthorisation;
import com.swift.rma.service.RmaAuthorisationService;

import util.SortKey;

@RestController
@RequestMapping("/api")
public class RmaAuthorisationController {

	@Autowired
	private RmaAuthorisationService rmaAuthorisationService;

	@GetMapping("/getBics")
	public List<RmaBic> getCounterPartyBics() {
		return rmaAuthorisationService.getCounterPartyBics();
	}

	@GetMapping("/getBicsByName")
	public List<RmaBic> getCounterPartyBicsByName(
			@RequestParam(name = "counterPartyName", required = true) String counterPartyText) {
		return rmaAuthorisationService.getCounterPartyBicsByName(counterPartyText);
	}

	@GetMapping("/getAuthInfo")
	public ResponseEntity<List<RmaAuthorisation>> getAuthInfo(
			@RequestParam(name = "counterPartyText", required = false) String counterPartyText,
			@RequestParam(name = "myBics", required = true) List<String> myBics,
			@RequestParam(name = "counterPartyCountryCodes", required = false) List<String> counterPartyCountryCodes,
			@RequestParam(name = "incomingTrafficOptions", required = false) List<String> incomingTrafficOptions,
			@RequestParam(name = "outgoingTrafficOptions", required = false) List<String> outgoingTrafficOptions,
			@RequestParam(name = "startRecordNumber", required = true) Integer startRecordNumber,
			@RequestParam(name = "pageSize", required = true) Integer pageSize,
			@RequestParam(name = "numberOfPages", required = true) Integer numberOfPages,
			@RequestParam(name = "sortKey", required = true) SortKey sortKey) {
		List<RmaAuthorisation> results = rmaAuthorisationService.getAuthInfo(counterPartyText, myBics,
				counterPartyCountryCodes, incomingTrafficOptions, outgoingTrafficOptions, startRecordNumber, pageSize,
				numberOfPages, sortKey);

		if (results == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(results);
	}

	@GetMapping("/getAuthInfoAdvanced")
	public ResponseEntity<List<RmaAuthorisation>> getAuthInfoAdvanced(
			@RequestParam(name = "myBics", required = true) List<String> myBics,
			@RequestParam(name = "myBicCountryCodes", required = false) List<String> myBicCountryCodes,
			@RequestParam(name = "counterPartyBics", required = false) List<String> counterPartyBics,
			@RequestParam(name = "counterPartyBicCountryCodes", required = false) List<String> counterPartyBicCountryCodes,
			@RequestParam(name = "service", required = false) List<String> service,
			@RequestParam(name = "type", required = false) List<String> type,
			@RequestParam(name = "status", required = false) List<String> status,
			@RequestParam(name = "messageTypes", required = false) List<String> messageTypes,
			@RequestParam(name = "startDate", required = false) List<Date> startDate,
			@RequestParam(name = "endDate", required = false) List<Date> endDate,
			@RequestParam(name = "startRecordNumber", required = true) Integer startRecordNumber,
			@RequestParam(name = "pageSize", required = true) Integer pageSize,
			@RequestParam(name = "numberOfPages", required = true) Integer numberOfPages,
			@RequestParam(name = "sortKey", required = true) SortKey sortKey) {
		List<RmaAuthorisation> results = rmaAuthorisationService.getAuthInfoAdvanced(myBics, myBicCountryCodes,
				counterPartyBics, counterPartyBicCountryCodes, service, type, status, messageTypes, startDate, endDate,
				startRecordNumber, pageSize, numberOfPages, sortKey);

		if (results == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(results);
	}

	@GetMapping("/getCountries")
	public List<RmaCountry> getCountries() {
		return rmaAuthorisationService.getCountries();
	}

}

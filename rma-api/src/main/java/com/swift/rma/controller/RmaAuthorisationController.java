package com.swift.rma.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@RequestMapping("/api")
public class RmaAuthorisationController {
	
    @Autowired
    private RmaAuthorisationService rmaAuthorisationService;
    
    @GetMapping("/getCounterPartyBics")
    public List <RmaBic> getCounterPartyBics() {
        return rmaAuthorisationService.getCounterPartyBics();
    }
    
    @GetMapping("/getCounterPartyBicsByName")
    public List <RmaBic> getCounterPartyBicsByName(
    		@RequestParam(name="counterPartyText", required = true) String counterPartyText
    		) {
        return rmaAuthorisationService.getCounterPartyBicsByName(counterPartyText);
    }
    
    @GetMapping("/getRelations")
    public List<RmaSearchResult> getAllRelations(
    		@RequestParam(name="counterPartyText", required = false) String counterPartyText,
    		@RequestParam(name="myBics", required = false) List<String> myBics,
    		@RequestParam(name="counterPartyBics", required = false) List<String> counterPartyBics,
    		@RequestParam(name="counterPartyCountries", required = false) List<String> counterPartyCountries,
    		@RequestParam(name="incomingAuthDirection", required = false) List<String> incomingAuthDirection,
    		@RequestParam(name="outgoingAuthDirection", required = false) List<String> outgoingAuthDirection
    		
    		) {
    	return rmaAuthorisationService.getRelationsByFilter(counterPartyText, myBics, counterPartyBics, incomingAuthDirection, outgoingAuthDirection);
    }
    
    @GetMapping("/getCountries")
    public List<RmaCountry> getCountries() {
    	return rmaAuthorisationService.getCountries();
    }

}

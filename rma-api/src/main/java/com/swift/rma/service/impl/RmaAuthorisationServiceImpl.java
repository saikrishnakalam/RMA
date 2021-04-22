package com.swift.rma.service.impl;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Tuple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swift.rma.entity.RmaAuthorisation;
import com.swift.rma.entity.RmaBic;
import com.swift.rma.entity.RmaBicTemp;
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

	public List<RmaSearchResult> getRelationsByFilter(String counterPartyText, List<String> issuerBics,
			List<String> correspondentBics, List<String> incomingAuthDirection, List<String> outgoingAuthDirection) {
		List<Tuple> searchAuthorisations = rmaAuthorisationRepository.getRelationsByFilter(counterPartyText, issuerBics,
				correspondentBics, incomingAuthDirection, outgoingAuthDirection);

		List<RmaSearchResult> searchResults = new ArrayList<RmaSearchResult>();
		for (Tuple eachRelation : searchAuthorisations) {
			RmaBicTemp eachBic = (RmaBicTemp) eachRelation.get(0);
			RmaAuthorisation eachIncomingAuthorisation = (RmaAuthorisation) eachRelation.get(1);
			RmaAuthorisation eachOutgoingAuthorisation = (RmaAuthorisation) eachRelation.get(2);
			
			AuthService incomingAuthService = new AuthService();
			if(eachIncomingAuthorisation.getAuthStatus() != null) {
				incomingAuthService.setAuthStatus(eachIncomingAuthorisation.getAuthStatus());	
			}
			
			if(eachIncomingAuthorisation.getPermissions() != null) {
				incomingAuthService.setPermissions(eachIncomingAuthorisation.getPermissions());	
			}
			if(eachIncomingAuthorisation.getService() != null) {
				incomingAuthService.setService(eachIncomingAuthorisation.getService());	
			}
			
			if(eachIncomingAuthorisation.getValidityFromDate() != null) {
				incomingAuthService.setValidityStart(eachIncomingAuthorisation.getValidityFromDate());
			}
			
			if(eachIncomingAuthorisation.getValidityEndDate() != null) {
				incomingAuthService.setValidityEnd(eachIncomingAuthorisation.getValidityEndDate());	
			}
			
			
			AuthService outgoingAuthService = new AuthService();
			if(eachOutgoingAuthorisation.getAuthStatus() != null) {
				outgoingAuthService.setAuthStatus(eachOutgoingAuthorisation.getAuthStatus());	
			}
			
			if(eachOutgoingAuthorisation.getPermissions() != null) {
				outgoingAuthService.setPermissions(eachOutgoingAuthorisation.getPermissions());	
			}
			if(eachOutgoingAuthorisation.getService() != null) {
				outgoingAuthService.setService(eachOutgoingAuthorisation.getService());	
			}
			
			if(eachOutgoingAuthorisation.getValidityFromDate() != null) {
				outgoingAuthService.setValidityStart(eachOutgoingAuthorisation.getValidityFromDate());
			}
			
			if(eachOutgoingAuthorisation.getValidityEndDate() != null) {
				outgoingAuthService.setValidityEnd(eachOutgoingAuthorisation.getValidityEndDate());	
			}

			if (!checkIfExists(eachIncomingAuthorisation, eachOutgoingAuthorisation, searchResults)) {
				RmaSearchResult eachSearchResult = new RmaSearchResult();
				eachSearchResult.setMyBic(eachIncomingAuthorisation.getIssuerBic());
				eachSearchResult.setMyBicName(eachBic.getInstitutionName());
				eachSearchResult.setCounterPartyBic(eachIncomingAuthorisation.getCorrespondentBic());
				if (eachIncomingAuthorisation.getAuthDirection() != null && eachIncomingAuthorisation.getAuthDirection().equals("incoming")) {
					List<AuthService> incomingAuths = new ArrayList<AuthService>();
					incomingAuths.add(incomingAuthService);
					eachSearchResult.setIncomingAuths(incomingAuths);
					//eachSearchResult.setCounterPartyBicName(eachIncomingAuthorisation.get());
					
				}  
				if (eachOutgoingAuthorisation.getAuthDirection() != null && eachOutgoingAuthorisation.getAuthDirection().equals("outgoing")) {
					List<AuthService> outgoingAuths = new ArrayList<AuthService>();
					outgoingAuths.add(outgoingAuthService);
				}
				searchResults.add(eachSearchResult);

			} else {
				if (eachIncomingAuthorisation.getAuthDirection() != null && eachIncomingAuthorisation.getAuthDirection().equals("incoming")) {
					List<AuthService> incomingAuths = searchResults.get(searchResults.size() - 1).getIncomingAuths();

					if (incomingAuths != null) {
						if(!checkIfAuthExists(incomingAuthService, incomingAuths)) {
							incomingAuths.add(incomingAuthService);
							searchResults.get(searchResults.size() - 1).setIncomingAuths(incomingAuths);
						}
						
					} else {
						List<AuthService> incomingAuthsNew = new ArrayList<AuthService>();
						incomingAuthsNew.add(incomingAuthService);
						searchResults.get(searchResults.size() - 1).setIncomingAuths(incomingAuthsNew);
					}
				} 
				if (eachOutgoingAuthorisation.getAuthDirection() != null && eachOutgoingAuthorisation.getAuthDirection().equals("outgoing")) {
					List<AuthService> outgoingAuths = searchResults.get(searchResults.size() - 1).getOutgoingAuths();
					if (outgoingAuths != null) {
						if(!checkIfAuthExists(outgoingAuthService, outgoingAuths)) {
						outgoingAuths.add(outgoingAuthService);
						searchResults.get(searchResults.size() - 1).setOutgoingAuths(outgoingAuths);
						}
					} else {
						List<AuthService> outgoingAuthsNew = new ArrayList<AuthService>();
						outgoingAuthsNew.add(outgoingAuthService);
						searchResults.get(searchResults.size() - 1).setOutgoingAuths(outgoingAuthsNew);
					}

				}

			}

		}

		return searchResults;
	}

	private boolean checkIfExists(RmaAuthorisation eachIncomingAuthorisation, RmaAuthorisation eachOutgoingAuthorisation, List<RmaSearchResult> searchResults) {

		for (RmaSearchResult eachSearchResult : searchResults) {
			if ((eachIncomingAuthorisation.getCorrespondentBic().equals(eachSearchResult.getCounterPartyBic())
					&& eachIncomingAuthorisation.getIssuerBic().equals(eachSearchResult.getMyBic())) || 
					(eachOutgoingAuthorisation.getIssuerBic().equals(eachSearchResult.getCounterPartyBic())
							&& eachOutgoingAuthorisation.getCorrespondentBic().equals(eachSearchResult.getMyBic()))) {

				return true;
			}
		}
		return false;

	}
	
	private boolean checkIfAuthExists(AuthService authService, List<AuthService> authServiceList) {
		for(AuthService eachService: authServiceList) {
			if(eachService.getPermissions().equals(authService.getPermissions()) && 
					eachService.getService().equals(authService.getService()) && 
					eachService.getAuthStatus().equals(authService.getAuthStatus())) {
				return true;
			}
		}
		return false;
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

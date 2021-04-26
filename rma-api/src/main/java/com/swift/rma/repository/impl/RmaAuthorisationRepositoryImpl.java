package com.swift.rma.repository.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.Tuple;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaBuilder.In;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.ListJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import com.swift.rma.entity.RmaAuthorisation;
import com.swift.rma.entity.RmaBic;
import com.swift.rma.repository.RmaAuthorisationRepositoryCustom;

@Repository
public class RmaAuthorisationRepositoryImpl implements RmaAuthorisationRepositoryCustom {

	@PersistenceContext
	EntityManager em;

	public List<RmaAuthorisation> getAuthInfo(String counterPartyText, List<String> myBics,
			List<String> counterPartyCountryCodes, List<String> incomingTrafficOptions,
			List<String> outgoingTrafficOptions, Integer startPageNumber, Integer pageSize, Integer numberOfPages) {
		
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<RmaAuthorisation> cq = cb.createQuery(RmaAuthorisation.class);

		Root<RmaAuthorisation> rmaAuth = cq.from(RmaAuthorisation.class);
		Join<RmaAuthorisation, RmaBic> leftJoin = rmaAuth.join("rmaCorrespondentBics", JoinType.LEFT);
		List<Predicate> predList = new LinkedList<Predicate>();

		predList.add(cb.equal(leftJoin.get("branchCode"), "XXX"));
		if (counterPartyText != null) {
			predList.add(cb.equal(leftJoin.get("institutionName"), counterPartyText));
		}

		if (counterPartyCountryCodes != null) {
			predList.add(rmaAuth.get("correspondentCC").in(counterPartyCountryCodes));
		}

		if (incomingTrafficOptions != null) {
			predList.add(rmaAuth.get("incomingStatus").in(incomingTrafficOptions));

		}
		if (outgoingTrafficOptions != null) {
			predList.add(rmaAuth.get("outgoingStatus").in(outgoingTrafficOptions));
		}

		predList.add(rmaAuth.get("issuerBic").in(myBics));
		// predList.add(cb.equal(rmaAuth.get("authDirection"), "incoming"));

		Predicate[] predArray = new Predicate[predList.size()];
		predList.toArray(predArray);

		cq.select(rmaAuth).where(predArray);
		TypedQuery<RmaAuthorisation> typedQuery = em.createQuery(cq);
		typedQuery.setFirstResult(startPageNumber);
		typedQuery.setMaxResults(pageSize * numberOfPages);
		return typedQuery.getResultList();
	}

	@Override
	public List<RmaAuthorisation> getAuthInfoAdvanced(List<String> myBics, List<String> myBicCountryCodes,
			List<String> counterPartyBics, List<String> counterPartyBicCountryCodes, List<String> service,
			List<String> type, List<String> status, List<String> messageTypes, List<Date> startDate, List<Date> endDate,
			Integer startPageNumber, Integer pageSize, Integer numberOfPages) {

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<RmaAuthorisation> cq = cb.createQuery(RmaAuthorisation.class);

		Root<RmaAuthorisation> rmaAuth = cq.from(RmaAuthorisation.class);
		Join<RmaAuthorisation, RmaBic> leftJoin = rmaAuth.join("rmaCorrespondentBics", JoinType.LEFT);
		List<Predicate> predList = new LinkedList<Predicate>();

		predList.add(rmaAuth.get("issuerBic").in(myBics));
		predList.add(cb.equal(leftJoin.get("branchCode"), "XXX"));
		
		if (myBicCountryCodes != null) {
			//predList.add(cb.equal(leftJoin.get("myBicCountryCodes"), myBicCountryCodes));
		}
		
		if (counterPartyBics != null) {
			predList.add(cb.equal(rmaAuth.get("correspondentBic"), counterPartyBics));
		}

		if (counterPartyBicCountryCodes != null) {
			predList.add(rmaAuth.get("correspondentCC").in(counterPartyBicCountryCodes));
		}

		if (service != null) {
			predList.add(rmaAuth.get("service").in(service));

		}
		if (type != null) {
			predList.add(cb.equal(rmaAuth.get("authDirection"), type));
		}
		
		if (status != null) {
			predList.add(cb.equal(rmaAuth.get("authStatus"), status));
		}
		
		if (messageTypes != null) {
			predList.add(cb.equal(rmaAuth.get("permissions"), messageTypes));
		}
		
		if (startDate != null) {
			if(startDate.size() > 1) {
				predList.add(cb.between(rmaAuth.get("validityFromDate"), startDate.get(0), startDate.get(1)));
			}else {
				predList.add(cb.equal(rmaAuth.get("validityFromDate"), startDate.get(0)));
			}
		}
		
		if (endDate != null) {
			if(endDate.size() > 1) {
				predList.add(cb.between(rmaAuth.get("validityEndDate"), endDate.get(0), endDate.get(1)));
			}else {
				predList.add(cb.equal(rmaAuth.get("validityEndDate"), endDate.get(0)));
			}
		}

		Predicate[] predArray = new Predicate[predList.size()];
		predList.toArray(predArray);

		cq.select(rmaAuth).where(predArray);
		TypedQuery<RmaAuthorisation> typedQuery = em.createQuery(cq);
		typedQuery.setFirstResult(startPageNumber);
		typedQuery.setMaxResults(pageSize * numberOfPages);
		return typedQuery.getResultList();
	}

}

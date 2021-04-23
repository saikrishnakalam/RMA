package com.swift.rma.repository.impl;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.Tuple;
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
public class RmaAuthorisationRepositoryImpl implements RmaAuthorisationRepositoryCustom{
	
	@PersistenceContext
	EntityManager em;
	
	public List<RmaAuthorisation> getRelationsByFilter(String counterPartyText, List<String> issuerBics, List<String> correspondingBics, List<String> incomingAuthDirection, List<String> outgoingAuthDirection){
		CriteriaBuilder cb = em.getCriteriaBuilder();
	    CriteriaQuery<RmaAuthorisation> cq = cb.createQuery(RmaAuthorisation.class);

	    Root<RmaAuthorisation> rmaAuth = cq.from(RmaAuthorisation.class);
	    Join<RmaAuthorisation, RmaBic> leftJoin = rmaAuth.join("rmaCorrespondentBics", JoinType.LEFT);
	    List<Predicate> predList = new LinkedList<Predicate>();

	    predList.add(cb.equal(leftJoin.get("branchCode"), "XXX"));
	    if (counterPartyText != null) {
	    	predList.add(cb.equal(leftJoin.get("institutionName"), counterPartyText));
	    }

	    if (correspondingBics != null) {
	    	predList.add(rmaAuth.get("correspondentBic").in(correspondingBics));
	    }
	    
	    if (incomingAuthDirection != null) {
	    	predList.add(rmaAuth.get("incomingStatus").in(incomingAuthDirection));
	    	
	    }
	    if (outgoingAuthDirection != null) {
	    	predList.add(rmaAuth.get("outgoingStatus").in(outgoingAuthDirection));
	    }
	    
	    predList.add(rmaAuth.get("issuerBic").in(issuerBics));
	    predList.add(cb.equal(rmaAuth.get("authDirection"), "incoming"));
	    
	    Predicate[] predArray = new Predicate[predList.size()];
	    predList.toArray(predArray);
	    
	    cq.select(rmaAuth).where(predArray);
	    return em.createQuery(cq).getResultList();
		
	}

}

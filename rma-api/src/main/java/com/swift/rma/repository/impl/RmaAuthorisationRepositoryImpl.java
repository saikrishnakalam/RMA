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
import com.swift.rma.entity.RmaBicTemp;
import com.swift.rma.repository.RmaAuthorisationRepositoryCustom;

@Repository
public class RmaAuthorisationRepositoryImpl implements RmaAuthorisationRepositoryCustom{
	
	@PersistenceContext
	EntityManager em;
	
	public List<Tuple> getRelationsByFilter(String counterPartyText, List<String> issuerBics, List<String> correspondingBics, List<String> incomingAuthDirection, List<String> outgoingAuthDirection){
		CriteriaBuilder cb = em.getCriteriaBuilder();
	    CriteriaQuery<Tuple> cq = cb.createTupleQuery();

	    Root<RmaBicTemp> rma = cq.from(RmaBicTemp.class);
	    Join<RmaBicTemp, RmaAuthorisation> rmaResult = rma.join("rmaIncomingAuthorisation", JoinType.INNER);
	    Join<RmaBicTemp, RmaAuthorisation> rmaResult1 = rma.join("rmaOutgoingAuthorisation", JoinType.INNER);
	    List<Predicate> predList = new LinkedList<Predicate>();
	    List<Predicate> predList1 = new LinkedList<Predicate>();
	    
	    if (counterPartyText != null) {
	    	//predList.add(cb.equal(rmaResult.get("correspondentBic"), counterPartyText));
	    	predList.add(cb.equal(rma.get("institutionName"), counterPartyText));
	    }
	    
	    if (issuerBics != null) {
	    	predList.add(rmaResult.get("issuerBic").in(issuerBics));
	    	//predList.add(rmaResult1.get("correspondentBic").in(issuerBics));
	    }
	    
	    if (correspondingBics != null) {
	    	predList.add(rmaResult.get("correspondentBic").in(correspondingBics));
	    	//predList.add(rmaResult1.get("issuerBic").in(correspondingBics));
	    }
	    
	    
	    if (incomingAuthDirection != null) {
	    	predList.add(rmaResult.get("authStatus").in(incomingAuthDirection));
	    	predList.add(cb.equal(rmaResult.get("authDirection"), "incoming"));
	    	
	    }
	    if (outgoingAuthDirection != null) {
	    	predList.add(rmaResult.get("authStatus").in(outgoingAuthDirection));
	    	predList.add(cb.equal(rmaResult.get("authDirection"), "outgoing"));
	    }
	    
	    Predicate[] predArray = new Predicate[predList.size()];
	    predList.toArray(predArray);
	    
	    cq.multiselect(rma, rmaResult, rmaResult1).where(predArray);
	    return em.createQuery(cq).getResultList();
		
	}

}

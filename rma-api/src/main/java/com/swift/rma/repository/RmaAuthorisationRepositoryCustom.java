package com.swift.rma.repository;

import java.util.List;

import javax.persistence.Tuple;

import com.swift.rma.entity.RmaAuthorisation;
import com.swift.rma.entity.RmaBic;

public interface RmaAuthorisationRepositoryCustom {
	public List<RmaAuthorisation> getRelationsByFilter(String counterPartyText, List<String> issuerBics, List<String> correspondingBics, List<String> incomingAuthDirection, List<String> outgoingAuthDirection);
}

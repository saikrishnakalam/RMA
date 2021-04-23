package com.swift.rma.model;

import java.util.List;

import com.swift.rma.entity.RmaBic;

public class RmaSearchResult {
	
	
    private String issuerBic;
    private String correspondentBic;
    private String incomingStatus;
    private String outgoingStatus;
    
	public RmaSearchResult() {
		super();
	}

	public RmaSearchResult(String issuerBic, String correspondentBic, String incomingStatus, String outgoingStatus) {
		super();
		this.issuerBic = issuerBic;
		this.correspondentBic = correspondentBic;
		this.incomingStatus = incomingStatus;
		this.outgoingStatus = outgoingStatus;
	}


	public String getIssuerBic() {
		return issuerBic;
	}


	public void setIssuerBic(String issuerBic) {
		this.issuerBic = issuerBic;
	}


	public String getCorrespondentBic() {
		return correspondentBic;
	}


	public void setCorrespondentBic(String correspondentBic) {
		this.correspondentBic = correspondentBic;
	}


	public String getIncomingStatus() {
		return incomingStatus;
	}


	public void setIncomingStatus(String incomingStatus) {
		this.incomingStatus = incomingStatus;
	}


	public String getOutgoingStatus() {
		return outgoingStatus;
	}


	public void setOutgoingStatus(String outgoingStatus) {
		this.outgoingStatus = outgoingStatus;
	}

}

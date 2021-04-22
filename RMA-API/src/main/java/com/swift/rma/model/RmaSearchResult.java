package com.swift.rma.model;

import java.util.List;

import com.swift.rma.entity.RmaBic;

public class RmaSearchResult {
	
	
    private String myBic;
    private String myBicName;
    private String myBicCity;
    private String myBicCountry;
    private String counterPartyBic;
    private String counterPartyBicName;
    private String counterPartyBicCity;
    private String counterPartyBicCountry;
    private List<AuthService> incomingAuths;
    private List<AuthService> outgoingAuths;
    
    public RmaSearchResult() {
		// TODO Auto-generated constructor stub
	}

	public RmaSearchResult(String myBic, String myBicName, String myBicCity, String myBicCountry,
			String counterPartyBic, String counterPartyBicName, String counterPartyBicCity,
			String counterPartyBicCountry, List<AuthService> incomingAuths, List<AuthService> outgoingAuths) {
		super();
		this.myBic = myBic;
		this.myBicName = myBicName;
		this.myBicCity = myBicCity;
		this.myBicCountry = myBicCountry;
		this.counterPartyBic = counterPartyBic;
		this.counterPartyBicName = counterPartyBicName;
		this.counterPartyBicCity = counterPartyBicCity;
		this.counterPartyBicCountry = counterPartyBicCountry;
		this.incomingAuths = incomingAuths;
		this.outgoingAuths = outgoingAuths;
	}

	public String getMyBic() {
		return myBic;
	}

	public void setMyBic(String myBic) {
		this.myBic = myBic;
	}

	public String getMyBicName() {
		return myBicName;
	}

	public void setMyBicName(String myBicName) {
		this.myBicName = myBicName;
	}

	public String getMyBicCity() {
		return myBicCity;
	}

	public void setMyBicCity(String myBicCity) {
		this.myBicCity = myBicCity;
	}

	public String getMyBicCountry() {
		return myBicCountry;
	}

	public void setMyBicCountry(String myBicCountry) {
		this.myBicCountry = myBicCountry;
	}

	public String getCounterPartyBic() {
		return counterPartyBic;
	}

	public void setCounterPartyBic(String counterPartyBic) {
		this.counterPartyBic = counterPartyBic;
	}

	public String getCounterPartyBicName() {
		return counterPartyBicName;
	}

	public void setCounterPartyBicName(String counterPartyBicName) {
		this.counterPartyBicName = counterPartyBicName;
	}

	public String getCounterPartyBicCity() {
		return counterPartyBicCity;
	}

	public void setCounterPartyBicCity(String counterPartyBicCity) {
		this.counterPartyBicCity = counterPartyBicCity;
	}

	public String getCounterPartyBicCountry() {
		return counterPartyBicCountry;
	}

	public void setCounterPartyBicCountry(String counterPartyBicCountry) {
		this.counterPartyBicCountry = counterPartyBicCountry;
	}

	public List<AuthService> getIncomingAuths() {
		return incomingAuths;
	}

	public void setIncomingAuths(List<AuthService> incomingAuths) {
		this.incomingAuths = incomingAuths;
	}

	public List<AuthService> getOutgoingAuths() {
		return outgoingAuths;
	}

	public void setOutgoingAuths(List<AuthService> outgoingAuths) {
		this.outgoingAuths = outgoingAuths;
	}
	

}

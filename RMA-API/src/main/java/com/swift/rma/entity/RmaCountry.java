package com.swift.rma.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RMA_COUNTRY_TEMP")
public class RmaCountry {

	private String countryName;
    private String countryCode;
    
    @Id
	@Column(name = "COUNTRY_CODE", unique = true,  nullable = false)
	public String getCountryCode() {
		return countryCode;
	}
	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}
	
	@Column(name = "COUNTRY_NAME",  nullable = false)
	public String getCountryName() {
		return countryName;
	}
	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}
	
	
    
    
}

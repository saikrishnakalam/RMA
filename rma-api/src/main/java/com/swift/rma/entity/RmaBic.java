package com.swift.rma.entity;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "RMA_BIC_TEMP")
public class RmaBic implements java.io.Serializable{
	
    private String bicCode;
    private String branchAddress;
    private String branchCode;
    private String branchCity;
    private String branchCountry;
    private String branchInfo;
    private String branchLocation;
    private String institutionName;
    
    public RmaBic() {

    }
	
	public RmaBic(String bicCode, String branchAddress, String branchCode, String branchCity,
			String branchCountry, String branchInfo, String branchLocation, String institutionName) {
		super();
		this.bicCode = bicCode;
		this.branchAddress = branchAddress;
		this.branchCode = branchCode;
		this.branchCity = branchCity;
		this.branchCountry = branchCountry;
		this.branchInfo = branchInfo;
		this.branchLocation = branchLocation;
		this.institutionName = institutionName;
	}

	@Id
	@Column(name = "BIC_CODE", nullable = false)
	public String getBicCode() {
		return bicCode;
	}
	public void setBicCode(String bicCode) {
		this.bicCode = bicCode;
	}
	
	@Column(name = "BRANCH_ADDRESS", nullable = true)
	public String getBranchAddress() {
		return branchAddress;
	}
	public void setBranchAddress(String branchAddress) {
		this.branchAddress = branchAddress;
	}

	@Column(name = "BRANCH_CODE")
	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}

	@Column(name = "BRANCH_CITY", nullable = true)
	public String getBranchCity() {
		return branchCity;
	}

	public void setBranchCity(String branchCity) {
		this.branchCity = branchCity;
	}

	@Column(name = "BRANCH_COUNTRY", nullable = true)
	public String getBranchCountry() {
		return branchCountry;
	}

	public void setBranchCountry(String branchCountry) {
		this.branchCountry = branchCountry;
	}

	@Column(name = "BRANCH_INFO", nullable = true)
	public String getBranchInfo() {
		return branchInfo;
	}

	public void setBranchInfo(String branchInfo) {
		this.branchInfo = branchInfo;
	}

	@Column(name = "BRANCH_LOCATION", nullable = true)
	public String getBranchLocation() {
		return branchLocation;
	}

	public void setBranchLocation(String branchLocation) {
		this.branchLocation = branchLocation;
	}

	@Column(name = "INSTITUTION_NAME", nullable = true)
	public String getInstitutionName() {
		return institutionName;
	}

	public void setInstitutionName(String institutionName) {
		this.institutionName = institutionName;
	}
	
}

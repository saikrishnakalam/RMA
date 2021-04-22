package com.swift.rma.model;

import java.util.Date;

public class AuthService {
	
	private String authStatus;
	private String service;
	private String permissions;
	private Date validityStart;
	private Date validityEnd;

	public String getAuthStatus() {
		return authStatus;
	}
	public void setAuthStatus(String authStatus) {
		this.authStatus = authStatus;
	}
	public String getService() {
		return service;
	}
	public void setService(String service) {
		this.service = service;
	}
	public String getPermissions() {
		return permissions;
	}
	public void setPermissions(String permissions) {
		this.permissions = permissions;
	}
	public Date getValidityStart() {
		return validityStart;
	}
	public void setValidityStart(Date validityStart) {
		this.validityStart = validityStart;
	}
	public Date getValidityEnd() {
		return validityEnd;
	}
	public void setValidityEnd(Date validityEnd) {
		this.validityEnd = validityEnd;
	}

}

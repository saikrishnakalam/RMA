package com.swift.rma.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "RMA_AUTHORISATIONS_TEMP")
public class RmaAuthorisation implements Serializable{

	private Integer authSeqId;
	private Integer revision;
	private Integer linkedAuthorisationId;
	private Integer jpaVersion;
	private Integer businessEntityId;
	private String issuerBic;
	private String correspondentBic;
	private String service;
	private String authStatus;

	private Date storedDate;
	private Date issuedDate;
	private String authDirection;
	private String permissions;
	private String signerBic;
	private String signature;
	private Integer approvedById;
	private Integer createdById;
	private Integer proposalId;
	private Integer fourEyeRequestId;
	private Integer recordId;
	private Integer portalActivated;

	private Date validityFromDate;
	private Date validityEndDate;
	private String incomingStatus;
	private String outgoingStatus;
	
	private Set<RmaBic> rmaCorrespondentBics;

	public RmaAuthorisation() {
		super();
	}


	public RmaAuthorisation(Integer authSeqId, Integer revision, Integer linkedAuthorisationId, Integer jpaVersion,
			Integer businessEntityId, String issuerBic, String correspondentBic, String service, String authStatus,
			Date storedDate, Date issuedDate, String authDirection, String permissions, String signerBic,
			String signature, Integer approvedById, Integer createdById, Integer proposalId, Integer fourEyeRequestId,
			Integer recordId, Integer portalActivated, Date validityFromDate, Date validityEndDate,
			String incomingStatus, String outgoingStatus,
			Set<RmaBic> rmaCorrespondentBics) {
		super();
		this.authSeqId = authSeqId;
		this.revision = revision;
		this.linkedAuthorisationId = linkedAuthorisationId;
		this.jpaVersion = jpaVersion;
		this.businessEntityId = businessEntityId;
		this.issuerBic = issuerBic;
		this.correspondentBic = correspondentBic;
		this.service = service;
		this.authStatus = authStatus;
		this.storedDate = storedDate;
		this.issuedDate = issuedDate;
		this.authDirection = authDirection;
		this.permissions = permissions;
		this.signerBic = signerBic;
		this.signature = signature;
		this.approvedById = approvedById;
		this.createdById = createdById;
		this.proposalId = proposalId;
		this.fourEyeRequestId = fourEyeRequestId;
		this.recordId = recordId;
		this.portalActivated = portalActivated;
		this.validityFromDate = validityFromDate;
		this.validityEndDate = validityEndDate;
		this.incomingStatus = incomingStatus;
		this.outgoingStatus = outgoingStatus;
		this.rmaCorrespondentBics = rmaCorrespondentBics;
	}

	@Column(name = "ISSUER_BIC", nullable = false)
	public String getIssuerBic() {
		return issuerBic;
	}

	public void setIssuerBic(String issuerBic) {
		this.issuerBic = issuerBic;
	}

	@Column(name = "CORRESPONDENT_BIC", nullable = false)
	public String getCorrespondentBic() {
		return correspondentBic;
	}

	public void setCorrespondentBic(String correspondentBic) {
		this.correspondentBic = correspondentBic;
	}

	@Column(name = "SERVICE", nullable = false)
	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	@Column(name = "AUTH_STATUS", nullable = false)
	public String getAuthStatus() {
		return authStatus;
	}

	public void setAuthStatus(String authStatus) {
		this.authStatus = authStatus;
	}

	@Column(name = "AUTH_DIRECTION", nullable = false)
	public String getAuthDirection() {
		return authDirection;
	}

	public void setAuthDirection(String authDirection) {
		this.authDirection = authDirection;
	}

	@Column(name = "PERMISSIONS", nullable = false)
	public String getPermissions() {
		return permissions;
	}

	public void setPermissions(String permissions) {
		this.permissions = permissions;
	}

	@Column(name = "VALID_FROM_DATE", nullable = false)
	public Date getValidityFromDate() {
		return validityFromDate;
	}

	public void setValidityFromDate(Date validityFromDate) {
		this.validityFromDate = validityFromDate;
	}

	@Column(name = "VALID_TO_DATE", nullable = false)
	public Date getValidityEndDate() {
		return validityEndDate;
	}

	public void setValidityEndDate(Date validityEndDate) {
		this.validityEndDate = validityEndDate;
	}

	@Id
	@Column(name = "AUTH_SEQ_ID", nullable = false)
	public Integer getAuthSeqId() {
		return authSeqId;
	}

	public void setAuthSeqId(Integer authSeqId) {
		this.authSeqId = authSeqId;
	}

	@Column(name = "REVISION", nullable = false)
	public Integer getRevision() {
		return revision;
	}

	public void setRevision(Integer revision) {
		this.revision = revision;
	}

	@Column(name = "LINKED_AUTHORISATION_ID", nullable = false)
	public Integer getLinkedAuthorisationId() {
		return linkedAuthorisationId;
	}

	public void setLinkedAuthorisationId(Integer linkedAuthorisationId) {
		this.linkedAuthorisationId = linkedAuthorisationId;
	}

	@Column(name = "JPA_VERSION", nullable = false)
	public Integer getJpaVersion() {
		return jpaVersion;
	}

	public void setJpaVersion(Integer jpaVersion) {
		this.jpaVersion = jpaVersion;
	}

	@Column(name = "BUSINESS_ENTITY_ID", nullable = false)
	public Integer getBusinessEntityId() {
		return businessEntityId;
	}

	public void setBusinessEntityId(Integer businessEntityId) {
		this.businessEntityId = businessEntityId;
	}

	@Column(name = "STORED_DATE", nullable = false)
	public Date getStoredDate() {
		return storedDate;
	}

	public void setStoredDate(Date storedDate) {
		this.storedDate = storedDate;
	}

	@Column(name = "ISSUED_DATE", nullable = false)
	public Date getIssuedDate() {
		return issuedDate;
	}

	public void setIssuedDate(Date issuedDate) {
		this.issuedDate = issuedDate;
	}

	@Column(name = "SIGNER_BIC", nullable = false)
	public String getSignerBic() {
		return signerBic;
	}

	public void setSignerBic(String signerBic) {
		this.signerBic = signerBic;
	}

	@Column(name = "SIGNATURE", nullable = false)
	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	@Column(name = "APPROVED_BY_ID", nullable = false)
	public Integer getApprovedById() {
		return approvedById;
	}

	public void setApprovedById(Integer approvedById) {
		this.approvedById = approvedById;
	}

	@Column(name = "CREATED_BY_ID", nullable = false)
	public Integer getCreatedById() {
		return createdById;
	}

	public void setCreatedById(Integer createdById) {
		this.createdById = createdById;
	}

	@Column(name = "PROPOSAL_ID", nullable = false)
	public Integer getProposalId() {
		return proposalId;
	}

	public void setProposalId(Integer proposalId) {
		this.proposalId = proposalId;
	}

	@Column(name = "FOUR_EYE_REQUEST_ID", nullable = false)
	public Integer getFourEyeRequestId() {
		return fourEyeRequestId;
	}

	public void setFourEyeRequestId(Integer fourEyeRequestId) {
		this.fourEyeRequestId = fourEyeRequestId;
	}

	@Column(name = "RECORD_ID", nullable = false)
	public Integer getRecordId() {
		return recordId;
	}

	public void setRecordId(Integer recordId) {
		this.recordId = recordId;
	}

	@Column(name = "PORTAL_ACTIVATED", nullable = false)
	public Integer getPortalActivated() {
		return portalActivated;
	}

	public void setPortalActivated(Integer portalActivated) {
		this.portalActivated = portalActivated;
	}
	
	@Column(name = "INCOMING_STATUS")
	public String getIncomingStatus() {
		return incomingStatus;
	}

	public void setIncomingStatus(String incomingStatus) {
		this.incomingStatus = incomingStatus;
	}

	@Column(name = "OUTGOING_STATUS")
	public String getOutgoingStatus() {
		return outgoingStatus;
	}

	public void setOutgoingStatus(String outgoingStatus) {
		this.outgoingStatus = outgoingStatus;
	}
	@JsonManagedReference
	@OneToMany
	@JoinColumn(name = "BIC_CODE", referencedColumnName = "CORRESPONDENT_BIC",
    insertable = false, updatable  = false)
	public Set<RmaBic> getRmaCorrespondentBics() {
		return rmaCorrespondentBics;
	}


	public void setRmaCorrespondentBics(Set<RmaBic> rmaCorrespondentBics) {
		this.rmaCorrespondentBics = rmaCorrespondentBics;
	}
}

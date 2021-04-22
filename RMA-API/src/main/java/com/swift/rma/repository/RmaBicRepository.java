package com.swift.rma.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.swift.rma.entity.RmaBic;

@Repository
public interface RmaBicRepository extends JpaRepository<RmaBic, Long>{
	
	@Query("Select rmaBic from RmaBic rmaBic where LOWER(rmaBic.institutionName) like LOWER(concat(:counterPartyText, '%')) and rmaBic.branchCode='XXX' order by rmaBic.bicCode, rmaBic.institutionName")
	public List<RmaBic> getCounterPartyBicsByName(String counterPartyText);
	
	@Query("Select rmaBic from RmaBic rmaBic where rmaBic.branchCode='XXX' order by rmaBic.bicCode, rmaBic.institutionName")
	public List<RmaBic> getHeadBranchCounterPartyBics();

}

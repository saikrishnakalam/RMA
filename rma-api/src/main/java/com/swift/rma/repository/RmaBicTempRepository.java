package com.swift.rma.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.swift.rma.entity.RmaBicTemp;

@Repository
public interface RmaBicTempRepository extends JpaRepository<RmaBicTemp, Long>{
}

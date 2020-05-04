package com.example.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.entities.Consultation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ConsultationRepository extends PagingAndSortingRepository<Consultation, Long> {

    @Query("From Consultation b WHERE b.nom=:searchText OR b.prenom=:searchText OR b.groupe=:searchText OR b.sex=:searchText ORDER BY b.nom DESC")
    Page<Consultation> findAllBooks(Pageable pageable, @Param("searchText") String searchText);
    
}

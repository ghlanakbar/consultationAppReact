package com.example.resource.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Consultation;
import com.example.resource.Resource;
import com.example.service.IService;

import org.springframework.web.bind.annotation.GetMapping;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

@RestController
@RequestMapping("/consultations")
@CrossOrigin(origins="http://localhost:3000")
public class ConsultationResourceImpl implements Resource<Consultation> {
	
	@Autowired
	private IService<Consultation> bookService;

	@Override
	public ResponseEntity<Page<Consultation>> findAll(Pageable pageable, String searchText) {
		return new ResponseEntity<>(bookService.findAll(pageable, searchText), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Page<Consultation>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
		return new ResponseEntity<>(bookService.findAll(
				PageRequest.of(
						pageNumber, pageSize,
						sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
				)
		), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Consultation> findById(Long id) {
		return new ResponseEntity<>(bookService.findById(id), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Consultation> save(Consultation consultation) {
		return new ResponseEntity<>(bookService.saveOrUpdate(consultation), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Consultation> update(Consultation consultation) {
		return new ResponseEntity<>(bookService.saveOrUpdate(consultation), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Long id) {
		return new ResponseEntity<>(bookService.deleteById(id), HttpStatus.OK);
	}

	@GetMapping("/groupes")
	public  ResponseEntity<Set<String>> findAllLanguages() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("0+", "O-", "B+", "B-", "A+", "A-", "AB+", "AB-")), HttpStatus.OK);
    }

    @GetMapping("/sexs")
    public  ResponseEntity<Set<String>> findAllGenres() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Femme", "Homme")), HttpStatus.OK);
    }
}

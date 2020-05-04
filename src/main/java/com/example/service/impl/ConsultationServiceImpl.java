package com.example.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.Consultation;
import com.example.repository.ConsultationRepository;
import com.example.service.IService;

@Service
public class ConsultationServiceImpl implements IService<Consultation> {
	
	@Autowired
	private ConsultationRepository consultationRepository;

	@Override
	public Page<Consultation> findAll(Pageable pageable, String searchText) {
		return consultationRepository.findAllBooks(pageable, searchText);
	}

	@Override
	public Page<Consultation> findAll(Pageable pageable) {
		return consultationRepository.findAll(pageable);
	}

	@Override
	public Consultation findById(Long id) {
		return consultationRepository.findById(id).get();
	}

	@Override
	public Consultation saveOrUpdate(Consultation consultation) {
		return consultationRepository.save(consultation);
	}

	@Override
	public String deleteById(Long id) {
		JSONObject jsonObject = new JSONObject();
		try {
			consultationRepository.deleteById(id);
			jsonObject.put("message", "Consultation deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}
	
	

}

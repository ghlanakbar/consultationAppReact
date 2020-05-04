package com.example;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.entities.Consultation;
import com.example.service.IService;

@SpringBootApplication
public class Application implements CommandLineRunner {
	
	@Autowired
	private IService<Consultation> service;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

    @Override
	public void run(String... args) throws Exception {
		
			Consultation consultation = new Consultation();
			consultation.setNom("SpongeBob ");
			consultation.setPrenom("SquarePants");
			consultation.setPhotoURL("https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png");
			consultation.setPoids(50L);
			consultation.setTaille(2776.00 );
			consultation.setGroupe("O+");
			consultation.setSex("Homme");
			consultation.setDate(new Date());
			consultation.setObservation("sein");
			service.saveOrUpdate(consultation);
		
	}

}

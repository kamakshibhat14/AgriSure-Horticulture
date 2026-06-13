package com.horticulture.controller;

import com.horticulture.entity.Officer;
import com.horticulture.repository.OfficerRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/officer")
@CrossOrigin(origins = "http://localhost:3000")
public class OfficerController {

private final OfficerRepository repo;

public OfficerController(OfficerRepository repo){
this.repo = repo;
}

@PostMapping("/login")
public Officer login(@RequestBody Officer officer){

Officer dbOfficer = repo.findByEmail(officer.getEmail());

if(dbOfficer != null && dbOfficer.getPassword().equals(officer.getPassword())){
return dbOfficer;
}

return null;

}
}
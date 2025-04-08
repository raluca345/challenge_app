package org.challenge.challengeapp.controller;

import lombok.RequiredArgsConstructor;
import org.challenge.challengeapp.model.Challenge;
import org.challenge.challengeapp.model.MonthlyChallenges;
import org.challenge.challengeapp.service.ChallengeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173/**")
public class ChallengeController {

    private final ChallengeService challengeService;

    @GetMapping("/challenges/all")
    public ResponseEntity<List<MonthlyChallenges>> getAllChallenges() {
        return new ResponseEntity<>(challengeService.getAllChallenges(), HttpStatus.OK);
    }

    @GetMapping("/challenges")
    public ResponseEntity<MonthlyChallenges> getChallengesByMonth(@RequestParam String month) {
        MonthlyChallenges monthlyChallenges = challengeService.getChallengesByMonth(month);
        if (monthlyChallenges != null)
            return new ResponseEntity<>(monthlyChallenges, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/challenges/{id}")
    public ResponseEntity<Challenge> getChallengeById(@PathVariable Long id) {
        Challenge challenge = challengeService.getChallengeById(id);
        if (challenge != null) {
            return new ResponseEntity<>(challenge, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/challenges/{month}")
    public ResponseEntity<String> addChallenge(@RequestBody Challenge challenge, @PathVariable String month) {
        if (challengeService.addChallenge(challenge, month)) {
            return new ResponseEntity<>("Challenge added successfully", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to add challenge", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/challenges/{id}")
    public ResponseEntity<String> updateChallenge(@PathVariable Long id, @RequestBody Challenge challenge) {
        if (challengeService.updateChallenge(id, challenge)) {
            return new ResponseEntity<>("Challenge updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to update challenge", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/challenges/{id}")
    public ResponseEntity<String> deleteChallenge(@PathVariable Long id) {
        if (challengeService.deleteChallenge(id)) {
            return new ResponseEntity<>("Challenge deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to delete challenge", HttpStatus.NOT_FOUND);
        }
    }
}
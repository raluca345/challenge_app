package org.challenge.challengeapp.service;

import org.challenge.challengeapp.model.Challenge;
import org.challenge.challengeapp.model.MonthlyChallenges;

import java.util.List;

public interface ChallengeService {
    List<MonthlyChallenges> getAllChallenges();
    boolean addChallenge(Challenge challenge, String month);
    boolean updateChallenge(Long id, Challenge challenge);
    boolean deleteChallenge(Long id);
    MonthlyChallenges getChallengesByMonth(String month);
    Challenge getChallengeById(Long id);
}
package org.challenge.challengeapp.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.challenge.challengeapp.model.Challenge;
import org.challenge.challengeapp.model.MonthlyChallenges;
import org.challenge.challengeapp.repository.MonthlyChallengesRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ChallengeServiceImpl implements ChallengeService {
    private final MonthlyChallengesRepository monthlyChallengesRepository;

    @Override
    public List<MonthlyChallenges> getAllChallenges() {
        return monthlyChallengesRepository.findAll();
    }

    @Override
    public boolean addChallenge(Challenge challenge, String month) {
        Optional<MonthlyChallenges> monthlyChallengesOpt = monthlyChallengesRepository.findByMonthIgnoreCase(month);
        MonthlyChallenges monthlyChallenges;
        if (monthlyChallengesOpt.isPresent()) {
            monthlyChallenges = monthlyChallengesOpt.get();
        } else {
            monthlyChallenges = new MonthlyChallenges();
            monthlyChallenges.setMonth(StringUtils.capitalize(month));
            monthlyChallenges.setChallenges(new ArrayList<>());
        }
        monthlyChallenges.getChallenges().add(challenge);
        monthlyChallengesRepository.save(monthlyChallenges);
        return true;
    }

    @Override
    public MonthlyChallenges getChallengesByMonth(String month) {
        return monthlyChallengesRepository.findByMonthIgnoreCase(month).orElse(null);
    }

    @Override
    public boolean updateChallenge(Long id, Challenge newChallenge) {
        for (MonthlyChallenges monthlyChallenges : monthlyChallengesRepository.findAll()) {
            for (Challenge challenge : monthlyChallenges.getChallenges()) {
                if (challenge.getId().equals(id)) {
                    challenge.setDescription(newChallenge.getDescription());
                    challenge.setCompleted(newChallenge.isCompleted());
                    monthlyChallengesRepository.save(monthlyChallenges);
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public boolean deleteChallenge(Long id) {
        for (MonthlyChallenges monthlyChallenges : monthlyChallengesRepository.findAll()) {
            for (Challenge challenge : monthlyChallenges.getChallenges()) {
                if (challenge.getId().equals(id)) {
                    monthlyChallenges.getChallenges().remove(challenge);
                    if (monthlyChallenges.getChallenges().isEmpty()) {
                        monthlyChallengesRepository.delete(monthlyChallenges);
                    } else {
                        monthlyChallengesRepository.save(monthlyChallenges);
                    }
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public Challenge getChallengeById(Long id) { // New method implementation
        for (MonthlyChallenges monthlyChallenges : monthlyChallengesRepository.findAll()) {
            for (Challenge challenge : monthlyChallenges.getChallenges()) {
                if (challenge.getId().equals(id)) {
                    return challenge;
                }
            }
        }
        return null;
    }
}
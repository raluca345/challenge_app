package org.challenge.challengeapp.repository;

import org.challenge.challengeapp.model.MonthlyChallenges;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MonthlyChallengesRepository extends JpaRepository<MonthlyChallenges, Long> {
    Optional<MonthlyChallenges> findByMonthIgnoreCase(String month);
}
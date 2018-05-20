package com.onboarder.web.repository;

import com.onboarder.web.model.Onboarding;
import com.onboarder.web.model.SequenceOnboarding;
import org.springframework.data.repository.CrudRepository;

public interface OnboardingRepository extends CrudRepository<Onboarding, Integer> {
    Onboarding findById(int id);
}

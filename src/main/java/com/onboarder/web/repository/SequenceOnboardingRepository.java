package com.onboarder.web.repository;

import com.onboarder.web.model.SequenceOnboarding;
import org.springframework.data.repository.CrudRepository;

public interface SequenceOnboardingRepository  extends CrudRepository<SequenceOnboarding, Integer> {
    SequenceOnboarding findById(int id);

}

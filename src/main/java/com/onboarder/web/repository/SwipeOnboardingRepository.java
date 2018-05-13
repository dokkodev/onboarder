package com.onboarder.web.repository;

import com.onboarder.web.model.SwipeOnboarding;
import org.springframework.data.repository.CrudRepository;

public interface SwipeOnboardingRepository extends CrudRepository<SwipeOnboarding, Integer> {
    SwipeOnboarding findById(int id);

}

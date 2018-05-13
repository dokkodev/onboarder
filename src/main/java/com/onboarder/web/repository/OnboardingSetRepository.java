package com.onboarder.web.repository;

import com.onboarder.web.model.OnboardingSet;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OnboardingSetRepository extends CrudRepository {
    OnboardingSet findById(int id);
}

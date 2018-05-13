package com.onboarder.web.repository;

import com.onboarder.web.model.BoxProperty;
import com.onboarder.web.model.OnboardingSet;
import org.springframework.data.repository.CrudRepository;

public interface BoxPropertyRepository extends CrudRepository<BoxProperty, Integer> {
    BoxProperty findById(int id);

}

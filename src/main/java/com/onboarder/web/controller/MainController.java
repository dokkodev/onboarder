package com.onboarder.web.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import com.onboarder.web.model.*;
import com.onboarder.web.repository.BoxPropertyRepository;
import com.onboarder.web.repository.OnboardingSetRepository;
import com.onboarder.web.repository.SequenceOnboardingRepository;
import com.onboarder.web.repository.SwipeOnboardingRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.jws.soap.SOAPBinding;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/onboarder")
public class MainController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MainController.class);

    @Autowired
    private OnboardingSetRepository onboardingSetRepository;

    @Autowired
    private SequenceOnboardingRepository sequenceOnboardingRepository;

    @Autowired
    private SwipeOnboardingRepository swipeOnboardingRepository;

    @Autowired
    private BoxPropertyRepository boxPropertyRepository;

    @GetMapping("/OnboardingSet/")
    @ResponseBody
    public String show(@RequestParam String url){
        OnboardingSet onboardingSet = onboardingSetRepository.findByUrl(url);
        Gson gson = new Gson();
        String onboardingset_json = gson.toJson(onboardingSet);
        return onboardingset_json;
    }

    @PutMapping("/OnboardingSet/")
    @ResponseBody
    public String update(@RequestBody OnboardingSet updatingOnboardingSet){

        String onboardingSetUrl = updatingOnboardingSet.getUrl();

        OnboardingSet existingOnboardingSet = onboardingSetRepository.findByUrl(onboardingSetUrl);

        List<SequenceOnboarding> sequenceOnboardings = existingOnboardingSet.getSequenceOnboardings();
        List<SwipeOnboarding> swipeOnboardings = existingOnboardingSet.getSwipeOnboardings();


        for(SequenceOnboarding SO1 : sequenceOnboardings){
            SequenceOnboarding se = sequenceOnboardingRepository.findById(SO1.getId());
            sequenceOnboardingRepository.delete(se);
        }

        for(SwipeOnboarding SO2 : swipeOnboardings){
            SwipeOnboarding sw = swipeOnboardingRepository.findById(SO2.getId());
            swipeOnboardingRepository.delete(sw);
        }


        List<SequenceOnboarding> updatingSequenceOnboardings = updatingOnboardingSet.getSequenceOnboardings();
        List<SwipeOnboarding> updatingSwipeOnboardings = updatingOnboardingSet.getSwipeOnboardings();

        for(SequenceOnboarding SO : updatingSequenceOnboardings){
            sequenceOnboardingRepository.save(SO);
        }
        for(SwipeOnboarding SW : updatingSwipeOnboardings){
            swipeOnboardingRepository.save(SW);
        }

        existingOnboardingSet.setSequenceOnboardings(updatingSequenceOnboardings);
        existingOnboardingSet.setSwipeOnboardings(updatingSwipeOnboardings);
        onboardingSetRepository.save(existingOnboardingSet);
        return "update success";
    }

    @PostMapping("/OnboardingSet")
    @ResponseBody
    public String saveOnboardings(@RequestBody OnboardingSet onboardingSet){

        List<SequenceOnboarding> sequenceOnboardings = onboardingSet.getSequenceOnboardings();
        List<SwipeOnboarding> swipeOnboardings = onboardingSet.getSwipeOnboardings();

        for(SequenceOnboarding SO : sequenceOnboardings){
            sequenceOnboardingRepository.save(SO);
        }

        for(SwipeOnboarding SW : swipeOnboardings){
            swipeOnboardingRepository.save(SW);
        }

        onboardingSetRepository.save(onboardingSet);
        return "success";
    }
}

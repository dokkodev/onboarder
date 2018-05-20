package com.onboarder.web.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import com.onboarder.web.model.*;
import com.onboarder.web.repository.*;

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
    private OnboardingRepository onboardingRepository;


    @GetMapping("/OnboardingSet")
    @ResponseBody
    public String show(@RequestParam String url){
        OnboardingSet onboardingSet = onboardingSetRepository.findByUrl(url);
        Gson gson = new Gson();
        String onboardingset_json = gson.toJson(onboardingSet);
        return onboardingset_json;
    }

    @PostMapping("/OnboardingSet")
    @ResponseBody
    public String saveOnboardings(@RequestBody OnboardingSet onboardingSet){


        String onboardingSetUrl = onboardingSet.getUrl();

        OnboardingSet existingOnboardingSet  = onboardingSetRepository.findByUrl(onboardingSetUrl);

        if(existingOnboardingSet != null){
            onboardingSetRepository.delete(existingOnboardingSet);
        }

        List<Onboarding> Onboardings = onboardingSet.getOnboardings();

        for(Onboarding Ob : Onboardings){
            onboardingRepository.save(Ob);
        }

        onboardingSetRepository.save(onboardingSet);
        return "success";
    }
}

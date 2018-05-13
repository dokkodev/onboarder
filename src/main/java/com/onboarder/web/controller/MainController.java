package com.onboarder.web.controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.onboarder.web.model.*;
import com.onboarder.web.repository.BoxPropertyRepository;
import com.onboarder.web.repository.OnboardingSetRepository;
import com.onboarder.web.repository.SequenceOnboardingRepository;
import com.onboarder.web.repository.SwipeOnboardingRepository;
import org.onboarder.Onboarding;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;

import javax.jws.soap.SOAPBinding;
import java.util.ArrayList;
import java.util.List;


@Controller
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

    @RequestMapping("/")
    public String test(Model model) {

        LOGGER.debug("User View");
        model.addAttribute("name", "user");
        return "index";
    }

    @RequestMapping("/admin")
    @PutMapping
    public String testAdmin(Model model) {

        LOGGER.debug("Admin View");
        model.addAttribute("name", "admin");

        return "index";
    }

    @GetMapping("/OnboardingSet/")
    @ResponseBody
    public String show(@RequestParam String url){
        OnboardingSet onboardingSet = onboardingSetRepository.findByUrl(url);
        Gson gson = new Gson();
        String onboardingset_json = gson.toJson(onboardingSet);
        return onboardingset_json;
    }

    @PutMapping("/OnboardingSet/{onboardingSetId}/")
    @ResponseBody
    public String update(@RequestBody OnboardingSet updatingOnboardingSet, @PathVariable int onboardingSetId){

        OnboardingSet existingOnboardingSet = onboardingSetRepository.findById(onboardingSetId);

        List<SequenceOnboarding> sequenceOnboardings = existingOnboardingSet.getSequenceOnboardings();

//        SequenceOnboarding se = sequenceOnboardingRepository.findById(84);

        for(SequenceOnboarding SO1 : sequenceOnboardings){
            boxPropertyRepository.delete(SO1.getBoxProperty());
            SequenceOnboarding se = sequenceOnboardingRepository.findById(SO1.getId());
            sequenceOnboardingRepository.delete(se);
        }

//        sequenceOnboardingRepository.delete(se);


        List<SequenceOnboarding> updatingSequenceOnboardings = updatingOnboardingSet.getSequenceOnboardings();
        for(SequenceOnboarding SO : updatingSequenceOnboardings){
            boxPropertyRepository.save(SO.getBoxProperty());
            sequenceOnboardingRepository.save(SO);
        }
        existingOnboardingSet.setType(updatingOnboardingSet.getType());
        existingOnboardingSet.setSequenceOnboardings(updatingSequenceOnboardings);
        onboardingSetRepository.save(existingOnboardingSet);
        return "update success";
    }

    @DeleteMapping("/OnboardingSet/{onboardingSetId}/")
    @ResponseBody
    public String update(@PathVariable int onboardingSetId){

        onboardingSetRepository.deleteById(onboardingSetId);
        return "success";


    }

    @PostMapping("/OnboardingSet")
    @ResponseBody
    public String saveOnboardings(@RequestBody OnboardingSet onboardingSet){

        List<SequenceOnboarding> sequenceOnboardings = onboardingSet.getSequenceOnboardings();
        for(SequenceOnboarding SO : sequenceOnboardings){
            boxPropertyRepository.save(SO.getBoxProperty());
            sequenceOnboardingRepository.save(SO);
        }

        onboardingSetRepository.save(onboardingSet);
        return "success";
    }


}

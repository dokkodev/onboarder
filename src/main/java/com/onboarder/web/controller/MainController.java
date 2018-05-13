package com.onboarder.web.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.onboarder.web.model.OnboardingSet;
import com.onboarder.web.repository.OnboardingSetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/asdf")
public class MainController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MainController.class);

    @Autowired
    private OnboardingSetRepository onboardingSetRepository;


    @RequestMapping("/")
    public String test(Model model) {

        LOGGER.debug("User View");
        model.addAttribute("name", "user");
        return "index";
    }

    @RequestMapping("/admin")
    public String testAdmin(Model model) {

        LOGGER.debug("Admin View");
        model.addAttribute("name", "admin");

        return "index";
    }

    @GetMapping("/OnboardingSet")
    @ResponseBody
    public String show(@RequestParam int id){
        OnboardingSet onboardingSet = onboardingSetRepository.findById(id);
        Gson gson = new Gson();
        String onboardingset_json = gson.toJson(onboardingSet);
        return onboardingset_json;
    }

    @PostMapping("/OnboardingSet")
    @ResponseBody
    public String saveOnboardings(@RequestBody JsonObject onboardingSet_json){

//        String url = onboardingSet_json.getAsJsonObject("url").getAsString();
//        OnboardingType onboardingType = OnboardingType.valueOf(onboardingSet_json.getAsJsonObject("type").getAsString());
//
//        JsonArray onboardings_json = onboardingSet_json.getAsJsonArray("sequenceOnboardings");
//
//        List<Onboarding> onboardings = new ArrayList<>();
//
//        for (JsonElement onbaording_json: onboardings_json){
//
//        }


        OnboardingSet onboardingSet = new OnboardingSet();

        onboardingSetRepository.save(onboardingSet);
        return "success";
    }





}

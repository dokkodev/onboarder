package com.onboarder.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MainController.class);

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
}

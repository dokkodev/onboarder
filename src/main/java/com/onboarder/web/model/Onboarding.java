package com.onboarder.web.model;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Onboarding {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "onboarding_type")
    private OnboardingType type;

    @Column(name = "sequence_order")
    private int order;

    @Column(name = "onboarding_name")
    @ColumnDefault(value = "\"no_name\"")
    private String name;

    @Column(name = "content")
    private String content;

    @Column(name = "selector")
    private String selector ;

    @Column(name = "selector_index")
    private int index ;

    @Column(name = "image_url")
    private String image_url;


}

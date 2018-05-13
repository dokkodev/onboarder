package com.onboarder.web.model;
import javax.persistence.*;
import java.util.Collection;

@Entity
public class OnboardingSet {

    @Id
    @GeneratedValue
    private int id;

    @Column(name= "url")
    private String url;

    @OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="onboardingset_id")
    private Collection<Onboarding> sequence_onboardings;


    @OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="onboardingset_id")
    private Collection<Onboarding> swipe_onboardings;



    @Enumerated(EnumType.STRING)
    @Column(name= "onboarding_type")
    private OnboardingType type;

}



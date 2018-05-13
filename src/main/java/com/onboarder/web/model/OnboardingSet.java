package com.onboarder.web.model;
import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@Entity
public class OnboardingSet {

    @Id
    @GeneratedValue
    private int id;

    @Column(name= "url")
    private String url;

    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="onboardingset_id")
    private List<SequenceOnboarding> sequenceOnboardings;


    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="onboardingset_id")
    private List<SwipeOnboarding> swipeOnboardings;


    @Enumerated(EnumType.STRING)
    @Column(name= "onboarding_type")
    private OnboardingType type;

}



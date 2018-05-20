package com.onboarder.web.model;
import lombok.Data;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@Entity
@Data
public class OnboardingSet {

    @Id
    @GeneratedValue
    private int id;

    @Column(name= "url")
    private String url;

    @OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JoinColumn(name="onboardingset_id")
    private List<Onboarding> Onboardings;


    @Enumerated(EnumType.STRING)
    @Column(name= "onboarding_type")
    private OnboardingType type;

}



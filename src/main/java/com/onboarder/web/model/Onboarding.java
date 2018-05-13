package com.onboarder.web.model;
import javax.persistence.*;

@Entity
public class Onboarding {


    @Id
    @GeneratedValue
    private int id;

    @Column(name= "order")
    private int order;

    @Column(name="content")
    private String content;

    @Column(name="selector")
    private String selector;

    @OneToOne
    @JoinColumn(name="property_no")
    private BoxProperty boxProperty;

}

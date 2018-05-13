package com.onboarder.web.model;

import javax.persistence.*;

@Entity
public class SwipeOnboarding {

    @Id
    @GeneratedValue()
    private int id;

    @Column(name= "sequence_order")
    private int order;

    @Column(name="content")
    private String content;


}

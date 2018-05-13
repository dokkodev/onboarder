package com.onboarder.web.model;
import javax.persistence.*;

@Entity
public class SequenceOnboarding {

    @Id
    private int id;

    @Column(name= "sequence_order")
    private int order;

    @Column(name="content")
    private String content;

    @Column(name="selector")
    private String selector;

    @OneToOne
    @JoinColumn(name="property_no")
    private BoxProperty boxProperty;

}

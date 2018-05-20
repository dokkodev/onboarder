package com.onboarder.web.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class SwipeOnboarding {

    @Id
    @GeneratedValue()
    private int id;

    @Column(name= "sequence_order")
    private int order;

    @Column(name="content")
    private String content;

    @Column(name="image_url")
    private String image_url;


}

package com.onboarder.web.model;
import javax.persistence.*;

@Entity
public class BoxProperty {

    @Id
    @GeneratedValue
    private int id;

//    @Column(name="font")
//    private String font;

    @Column(name="font_size")
    private int font_size;

//    @Column(name="shape")
//    private String shape;

//    @Column(name="degree")
//    private int degree;

//    @Column(name="LinkName")
//    private String link_name;

    @Column(name="direction")
    private BoxDirection boxDirection;

}

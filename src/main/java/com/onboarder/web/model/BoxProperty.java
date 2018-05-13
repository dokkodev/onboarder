package com.onboarder.web.model;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class BoxProperty {

    @Id
    @GeneratedValue
    private int id;

    @Column(name="font_size")
    private int fontSize;

    @Column(name="direction")
    private BoxDirection boxDirection;

    //    @Column(name="font")
//    private String font;

//    @Column(name="shape")
//    private String shape;

//    @Column(name="degree")
//    private int degree;

//    @Column(name="LinkName")
//    private String link_name;


}

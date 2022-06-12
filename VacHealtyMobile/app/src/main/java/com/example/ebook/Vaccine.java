package com.example.ebook;

import java.io.Serializable;
import java.util.Objects;

public class Vaccine implements Serializable {
    private String vaccineName;
    private int vaccineRating;
    private int vaccineImage;
    private String producer;
    static final String SINOVAC = "Sinovac";
    static final String BIONTECH = "BioNTech";
    static final String SPUTNIKV = "SputnikV";
    static final String TURKOVAC = "TurcoVac";
    static final String SINOVACPRODUCER = "CoronaVac";
    static final String BIONTECHPRODUCER = "Pfizer";
    static final String SPUTNIKVPRODUCER = "Gamaleya Research Institute of Epidemiology and Microbiology";
    static final String TURKOVACPRODUCER = "ERÜ";

    public Vaccine () {
    }

    public Vaccine(String vaccineName,int i){
        this.vaccineName = vaccineName;
        if( Objects.equals(vaccineName, SINOVAC) ) {
            vaccineImage=R.drawable.sinovac;
            producer=SINOVACPRODUCER;
            vaccineRating=i;
        }
        if(Objects.equals(vaccineName, BIONTECH) ) {
            vaccineImage=R.drawable.pfizer;
            producer=BIONTECHPRODUCER;
            vaccineRating=i;
        }
        if(Objects.equals(vaccineName, SPUTNIKV) ) {
            vaccineImage=R.drawable.sputnikv;
            producer=SPUTNIKVPRODUCER;
            vaccineRating=i;
        }
        if(Objects.equals(vaccineName, TURKOVAC) ) {
            vaccineImage=R.drawable.turkovac;
            producer=TURKOVACPRODUCER;
            vaccineRating=i;
        }

    }

    // Constructor
    public Vaccine(String vaccineName, int vaccineRating, int vaccineImage) {
        this.vaccineName = vaccineName;
        this.vaccineRating = vaccineRating;
        this.vaccineImage = vaccineImage;
    }

    public Vaccine(String vaccineName, int vaccineRating, int vaccineImage,String producer) {
        this.vaccineName = vaccineName;
        this.vaccineRating = vaccineRating;
        this.vaccineImage = vaccineImage;
        this.producer = producer;
    }

    // Getter and Setter
    public String getVaccineName() {
        return vaccineName;
    }

    public void setVaccineName(String vaccineName) {
        this.vaccineName = vaccineName;
    }

    public int getVaccineRating() {
        return vaccineRating;
    }

    public void setVaccineRating(int vaccineRating) {
        this.vaccineRating = vaccineRating;
    }

    public int getVaccineImage() {
        return vaccineImage;
    }

    public void setVaccineImage(int vaccineImage) {this.vaccineImage = vaccineImage;}

    public String getProducer () {return producer;}

    public void setProducer (String p) {this.producer=p;}

    public String toString(){
        return "user object is: "+
                vaccineName+" "+
                vaccineRating+" "+
                vaccineImage+ " " +
                producer;
    }

}

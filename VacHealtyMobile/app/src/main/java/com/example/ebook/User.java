package com.example.ebook;

import java.io.Serializable;
import java.util.Arrays;

public class User implements Serializable {
    private String firstName,lastName,email,contactNo;
    private Vaccine[] vaccineDoses = new Vaccine[5];
    private String id;

    public User() {
    }

    public User(String fname, String lname, String email, String contactno) {
        this.firstName = fname;
        this.lastName = lname;
        this.email = email;
        this.contactNo = contactno;
    }

    public User(String fname, String lname, String email, String contactno, String id) {
        this.firstName = fname;
        this.lastName = lname;
        this.email = email;
        this.contactNo = contactno;
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String fname) {
        this.firstName = fname;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lname) {
        this.lastName = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactno) {
        this.contactNo = contactno;
    }

    public Vaccine[] getVaccineDoses () {return vaccineDoses;}

    public void setVaccineDoses (Vaccine[] vaccineDoses) {this.vaccineDoses = vaccineDoses;}

    public String getId () {return id;}

    public void setId (String id) {this.id=id;}

    public void addVaccineDoses (Vaccine v) {addVaccineDoses(v);}

    public void deleteVaccineDoses () {vaccineDoses = new Vaccine[5];}

    public String toString(){
        return "user object is: "+
                firstName+" "+
                lastName+" "+
                email+ " " +
                contactNo+ " "+
                Arrays.toString(vaccineDoses)+ " "+
                id;

    }

}

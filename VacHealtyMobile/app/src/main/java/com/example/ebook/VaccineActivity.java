package com.example.ebook;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class VaccineActivity extends AppCompatActivity implements AdapterView.OnItemSelectedListener{
    FirebaseFirestore db = FirebaseFirestore.getInstance();
    private RecyclerView courseRV;
    // Arraylist for storing data
    private ArrayList<Vaccine> vaccinesArrayList;
    static final String NEW = "Select new vaccine";
    static final String SINOVAC = "Sinovac";
    static final String BIONTECH = "BioNTech";
    static final String SPUTNIKV = "SputnikV";
    static final String TURKOVAC = "TurkoVac";
    private static final String[] paths = {NEW, SINOVAC, BIONTECH,SPUTNIKV,TURKOVAC};
    private Spinner spinner;



    Button sender;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_vaccine);
        courseRV = findViewById(R.id.idVaccineRV);

        Intent i = getIntent();
        User user = (User)i.getSerializableExtra("user");
        System.out.println("Vaccine Activity Page " +user.toString());
        String userId = user.getId();
        //TextView welcomeUser=findViewById(R.id.txt);
        //welcomeUser.setText( userId  );

        courseRV = findViewById(R.id.idVaccineRV);

        // here we have created new array list and added data to it.
        vaccinesArrayList = new ArrayList<Vaccine>();

        for(Vaccine j : user.getVaccineDoses() ) if (j!=null) vaccinesArrayList.add(j);
        //vaccinesArrayList.add( new Vaccine("SputnikV",4) );


        // we are initializing our adapter class and passing our arraylist to it.
        VaccineAdapter vaccineAdapter = new VaccineAdapter(this, vaccinesArrayList);

        // below line is for setting a layout manager for our recycler view.
        // here we are creating vertical list so we will provide orientation as vertical
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false);

        // in below two lines we are setting layoutmanager and adapter to our recycler view.
        courseRV.setLayoutManager(linearLayoutManager);
        courseRV.setAdapter(vaccineAdapter);



        spinner = (Spinner)findViewById(R.id.vaccines_spinner);
        ArrayAdapter<String>adapter = new ArrayAdapter<String>(VaccineActivity.this,
                android.R.layout.simple_spinner_item,paths);

        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
        spinner.setOnItemSelectedListener(this);


        sender=findViewById(R.id.btn_send);
        sender.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String text = spinner.getSelectedItem().toString();
                //Log.d("TAGGGGGGGGGGGGGGG", text );
                int userVaccineDosesLenght = 0;
                for(Vaccine j : user.getVaccineDoses() ) if (j!=null) userVaccineDosesLenght+=1;
                Vaccine newVaccine = new Vaccine(spinner.getSelectedItem().toString(),userVaccineDosesLenght+1);
                Log.d("TAGGGGGGGGGGGGGGG", newVaccine.toString() );
                String stDoseOfVaccine = "stDoseOfVaccine"+(userVaccineDosesLenght+1);
                // {c:spinner.getSelectedItem().toString()}
                Map<String, String> data = new HashMap<>();
                data.put(stDoseOfVaccine, spinner.getSelectedItem().toString() );


                DocumentReference userRef = db.collection("users").document(user.getId());
                if(userVaccineDosesLenght < 5) {

                    userRef
                            .update(stDoseOfVaccine, spinner.getSelectedItem().toString() )
                            .addOnSuccessListener(new OnSuccessListener<Void>() {
                                @Override
                                public void onSuccess(Void aVoid) {
                                    Log.d("TAG", "DocumentSnapshot successfully updated!");

                                }
                            })
                            .addOnFailureListener(new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    Log.w("TAG", "Error updating document", e);
                                }
                            });
                }
                else{
                    System.out.println("Up to 5 vaccines can be added.");
                }


                Intent go=new Intent(VaccineActivity.this, MainPageActivity.class);
                go.putExtra("key",user.getEmail());
                startActivity(go);
            }
        });
    }


    @Override
    public void onItemSelected(AdapterView<?> parent, View v, int position, long id) {

        switch (position) {
            case 0:
                // Whatever you want to happen when the first item gets selected
                String text = spinner.getSelectedItem().toString();


                break;
            case 1:
                // Whatever you want to happen when the second item gets selected
                break;
            case 2:
                // Whatever you want to happen when the thrid item gets selected
                break;

        }
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {
        // TODO Auto-generated method stub
    }

}

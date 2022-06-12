package com.example.ebook;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


public class MainPageActivity extends AppCompatActivity {
    Button sender,senderCovidProcess,senderStatistics,senderSetting,senderLogOut;


    private FirebaseAuth mAuth;
    private FirebaseUser firebaseUser;
    private FirebaseFirestore db = FirebaseFirestore.getInstance();
    public FirebaseFirestore getDb() {
        return db;
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_page);
        Animation animation = AnimationUtils.loadAnimation(this, R.anim.anim_about_card_show);
        LinearLayout Layout = findViewById(R.id.rl2);
        Layout.startAnimation(animation);
        //getting the recyclerview from xml


        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            String value = extras.getString("key");

        //String value="bfatih38@gmail.com";
        final List<Object> list = new ArrayList<>();
        String TAG="NABER2";
        HashMap<String, String> x = new HashMap<String, String>();


        db.collection("users")
                .whereEqualTo("email", value)
                .get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if (task.isSuccessful()) {
                            for (QueryDocumentSnapshot document : task.getResult()) {
                                //Log.d("ASDASDASDASDASDASDASD", document.getId() + " => " + document.getData());

                                //Log.d(TAG, document.getId() + " => " + document.getData());
                                HashMap x = (HashMap) document.getData();
                                x.put("id",document.getId());
                                TextView welcomeUser=findViewById(R.id.welcomeUser);
                                welcomeUser.setText( "Welcome " + String.valueOf(x.get("firstName")) + " " + String.valueOf(x.get("lastName"))  );

                                User user  = new User( x.get("firstName").toString(),x.get("lastName").toString()
                                        ,x.get("email").toString(),x.get("contactNo").toString(), x.get("id").toString() );

                                if( x.containsKey("stDoseOfVaccine1") ){
                                    user.deleteVaccineDoses();
                                    Vaccine[] v = user.getVaccineDoses();
                                    for(int i=1;i<6;i++){
                                        String q = "stDoseOfVaccine"+i;
                                        if(x.containsKey(q)) v[i-1] = new Vaccine( x.get(q).toString() , i ) ;
                                    }
                                    user.setVaccineDoses(v);
                                }
                                System.out.println("MAIN PAGE ACTİVİTY "+String.valueOf(user));

                                sender=findViewById(R.id.btn_send_vac);
                                sender.setOnClickListener(new View.OnClickListener() {
                                    @Override
                                    public void onClick(View view) {
                                        Intent go=new Intent(MainPageActivity.this, VaccineActivity.class);
                                        go.putExtra("id",String.valueOf(x.get("id")) );
                                        go.putExtra("user",  user );
                                        // String.valueOf(user)
                                        startActivity(go);
                                    }
                                });


                                senderCovidProcess = findViewById(R.id.btn_send_covid_process);
                                senderCovidProcess.setOnClickListener(new View.OnClickListener() {
                                    @Override
                                    public void onClick(View view) {
                                        Intent go=new Intent(MainPageActivity.this, CovidProcessActivity.class);
                                        //go.putExtra("id",String.valueOf(x.get("id")) );
                                        go.putExtra("id",user );
                                        go.putExtra("email",user.getEmail() );
                                        startActivity(go);
                                    }
                                });

                                senderStatistics=findViewById(R.id.btn_send_statistics);
                                senderStatistics.setOnClickListener(new View.OnClickListener() {
                                    @Override
                                    public void onClick(View view) {
                                        Intent go=new Intent(MainPageActivity.this, StatisticsActivity.class);
                                        startActivity(go);
                                    }
                                });
                                senderSetting=findViewById(R.id.btn_send_setting);
                                senderSetting.setOnClickListener(new View.OnClickListener() {
                                    @Override
                                    public void onClick(View view) {
                                        Intent go=new Intent(MainPageActivity.this, SettingActivity.class);
                                        go.putExtra("user",  user );
                                        startActivity(go);
                                    }
                                });
                                senderLogOut=findViewById(R.id.btn_send_log_out);
                                senderLogOut.setOnClickListener(new View.OnClickListener() {
                                    @Override
                                    public void onClick(View view) {
                                        Intent go=new Intent(MainPageActivity.this,MainActivity.class);
                                        startActivity(go);
                                    }
                                });

                            }
                        } else {
                            Log.d(TAG, "Error getting documents: ", task.getException());
                        }
                    }
                });



        }


    }

}

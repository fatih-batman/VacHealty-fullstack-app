package com.example.ebook;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;


public class LogoutActivity extends AppCompatActivity {

    Button sender;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_vaccine);

        sender=findViewById(R.id.btn_send_vac);
        sender.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent go=new Intent(LogoutActivity.this, MainPageActivity.class);
                startActivity(go);
            }
        });
    }


}

package com.example.ebook;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    Button appLogin,appRegister;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        appLogin=(Button)findViewById(R.id.ButtonUserLogin);
        appLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(MainActivity.this, LoginActivity.class);
                // geçici olarak yapıldı ileride yeniden düzelt!! //TODO
                //Intent intent=new Intent(MainActivity.this, MainPageActivity.class);
                //intent.putExtra("key","bfatih38@gmail.com");
                startActivity(intent);
            }
        });
        appRegister=(Button) findViewById(R.id.ButtonRegister);
        appRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(MainActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        });


    }
}
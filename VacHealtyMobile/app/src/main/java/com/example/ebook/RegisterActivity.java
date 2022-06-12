package com.example.ebook;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.textfield.TextInputLayout;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.HashMap;
import java.util.Map;

public class RegisterActivity extends AppCompatActivity {
    FirebaseAuth mAuth;
    FirebaseUser firebaseUser;
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        final TextInputLayout uFirstNameWrapper=(TextInputLayout) findViewById(R.id.UserFirstNameWrapper);
        final TextInputLayout uLastNameWrapper=(TextInputLayout)findViewById(R.id.user_lastNameWrapper);
        final TextInputLayout uEmailWrapper=(TextInputLayout)findViewById(R.id.userEmailAddressWrapper);
        final TextInputLayout uPasswordWrapper=(TextInputLayout)findViewById(R.id.passwordWrapper);
        final TextInputLayout uConPasswordWrapper=(TextInputLayout)findViewById(R.id.confirm_PasswordWrapper);
        final TextInputLayout uContactNoWrapper=(TextInputLayout)findViewById(R.id.contactWrapper);

        final EditText uFirstName=(EditText) findViewById(R.id.user_First_Name);
        final EditText uLastName=(EditText)findViewById(R.id.user_LastName);
        final EditText uEmail=(EditText)findViewById(R.id.userEmailAddress);
        final EditText uPassword=(EditText)findViewById(R.id.userPassword);
        final EditText uConPassword=(EditText)findViewById(R.id.userConfirmPassword);
        final EditText uContactNo=(EditText)findViewById(R.id.contactNumber);

        final Button btnRegister=(Button) findViewById(R.id.Register_Button);

        mAuth= FirebaseAuth.getInstance();



        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String fname = uFirstName.getText().toString().trim();
                String lname = uLastName.getText().toString().trim();
                String email = uEmail.getText().toString().trim();
                String password = uPassword.getText().toString().trim();
                String conPassword = uConPassword.getText().toString().trim();
                String contactNo = uContactNo.getText().toString().trim();

                if (fname.isEmpty()) {
                    uFirstNameWrapper.setError("Enter First Name");
                    uFirstNameWrapper.requestFocus();
                    return;
                }
                if (lname.isEmpty()) {
                    uLastNameWrapper.setError("Enter Last Name");
                    uLastNameWrapper.requestFocus();
                    return;
                }
                if (email.isEmpty()) {
                    uEmailWrapper.setError("Enter E-mail");
                    uEmailWrapper.requestFocus();
                    return;
                }
                if (password.isEmpty()) {
                    uPasswordWrapper.setError("Enter Password");
                    uPasswordWrapper.requestFocus();
                    return;
                }
                if (conPassword.isEmpty()) {
                    uConPasswordWrapper.setError("Enter Confirmation Password");
                    uConPasswordWrapper.requestFocus();
                    return;
                }
                if (!password.equals(conPassword)) {
                    uConPasswordWrapper.setError("Confirmation Password didnt match!");
                    uConPasswordWrapper.requestFocus();
                    return;
                }
                if (contactNo.isEmpty()) {
                    uContactNoWrapper.setError("Enter Contact No");
                    uContactNoWrapper.requestFocus();
                    return;
                }
                mAuth.createUserWithEmailAndPassword(email,password).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if(task.isSuccessful()){


                            firebaseUser=mAuth.getCurrentUser();
                            User user=new User(fname,lname,email,contactNo);
                            /*DatabaseReference mReference= FirebaseDatabase.getInstance("https://ebookprototype-default-rtdb.firebaseio.com/").getReference("Users");
*/



                            // Create a new user with a first and last name
                            Map<String, Object> userData = new HashMap<>();
                            userData.put("firstName", user.getFirstName() );
                            userData.put("lastName", user.getLastName() );
                            userData.put("email", user.getEmail() );
                            userData.put("contactNo", user.getContactNo() );
// Add a new document with a generated ID
                            final String TAG = "YOUR-TAG-NAME FAİTH";



                            db.collection("users")
                                    .add(userData)
                                    .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                                        @Override
                                        public void onSuccess(DocumentReference documentReference) {
                                            Log.d(TAG, "DocumentSnapshot added with ID: " + documentReference.getId());
                                        }
                                    })
                                    .addOnFailureListener(new OnFailureListener() {
                                        @Override
                                        public void onFailure(@NonNull Exception e) {
                                            Log.w(TAG, "Error adding document", e);
                                        }
                                    });



                            Intent intent=new Intent(RegisterActivity.this,MainActivity.class);
                            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK| Intent.FLAG_ACTIVITY_NEW_TASK);
                            startActivity(intent);
                            finish();

                            /*mReference.child(firebaseUser.getUid()).setValue(user).addOnCompleteListener(new OnCompleteListener<Void>() {
                                @Override
                                public void onComplete(@NonNull Task<Void> task) {
                                    if(task.isSuccessful()){
                                        Toast.makeText(RegisterActivity.this,"User Registered Successfull",Toast.LENGTH_LONG).show();






                                    }
                                    else{
                                        Toast.makeText(RegisterActivity.this,task.getException().getMessage(),Toast.LENGTH_LONG).show();
                                    }
                                }
                            });*/

                        }
                        else{
                            Toast.makeText(RegisterActivity.this,task.getException().getMessage(),Toast.LENGTH_LONG).show();
                        }
                    }
                });
            }
        });
    }
}
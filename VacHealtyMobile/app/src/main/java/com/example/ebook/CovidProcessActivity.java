package com.example.ebook;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.HashMap;
import java.util.Map;

public class CovidProcessActivity extends AppCompatActivity
        implements View.OnClickListener {
    // setting up things
    private Button falseButton;
    private Button trueButton;
    private ImageButton nextButton;
    private ImageButton prevButton;
    private ImageView Image;
    private TextView questionTextView;
    private int correct = 0;
    // to keep current question track
    private int currentQuestionIndex = 0;
    FirebaseFirestore db = FirebaseFirestore.getInstance();

    private Question[] questionBank = new Question[] {
            // array of objects of class Question
            // providing questions from string
            // resource and the correct ans
            new Question(R.string.a, true, "Do you have chest pain ?" , "chestPain"),
            new Question(R.string.b, false, "Do you have cough ?" ,"cough"),
            new Question(R.string.c, true, "Do you have difficulty breathing ?" ,"difficultyBreathing"),
            new Question(R.string.d, true, "Do you have headache ?" ,"headache"),
            new Question(R.string.e, true, "Do you have loss of speech or movement ?" ,"lossOfSpeechOrMovement"),
            new Question(R.string.f, false, "Do you have loss sense of taste or smell ?" ,"lossSenseOfTasteOrSmell"),
            new Question(R.string.g, false, "Do you have exhaustion ?" ,"exhaustion"),
    };

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_main);




        setContentView(R.layout.activity_covid_process);
        // setting up the buttons
        // associated with id
        falseButton = findViewById(R.id.false_button);
        trueButton = findViewById(R.id.true_button);
        nextButton = findViewById(R.id.next_button);
        prevButton = findViewById(R.id.prev_button);
        // register our buttons to listen to
        // click events
        questionTextView
                = findViewById(R.id.answer_text_view);
        Image = findViewById(R.id.myimage);
        falseButton.setOnClickListener(this);
        trueButton.setOnClickListener(this);
        nextButton.setOnClickListener(this);
        prevButton.setOnClickListener(this);
    }

    @SuppressLint("SetTextI18n")
    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    public void onClick(View v)
    {
        // checking which button is
        // clicked by user
        // in this case user choose false
        switch (v.getId()) {
            case R.id.false_button:
                checkAnswer(false);
                break;

            case R.id.true_button:
                checkAnswer(true);

                break;

            case R.id.next_button:
                // go to next question
                // limiting question bank range
                if (currentQuestionIndex < questionBank.length+1) {


                    currentQuestionIndex
                            = currentQuestionIndex + 1;
                    // we are safe now!
                    // last question reached
                    // making buttons
                    // invisible
                    if (currentQuestionIndex == questionBank.length) {
                        /*Intent i = getIntent();
                        User user = (User)i.getSerializableExtra("user");*/
                        Intent ii = getIntent();
                        String userEmail = (String) ii.getSerializableExtra("email");
                        questionTextView.setText(getString(
                                R.string.correct, correct));
                        //nextButton.setVisibility(View.INVISIBLE);
                        nextButton.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {

                                Intent go=new Intent(CovidProcessActivity.this, MainPageActivity.class);
                                go.putExtra("key",userEmail);
                                startActivity(go);
                            }
                        });
                        prevButton.setVisibility(
                                View.INVISIBLE);
                        trueButton.setVisibility(
                                View.INVISIBLE);
                        falseButton.setVisibility(
                                View.INVISIBLE);
                        if (correct > 3) {
                            questionTextView.setText(
                                    "CORRECTNESS IS " + correct
                                            + " "
                                            + "OUT OF 6");
                            // showing correctness
                            Image.setImageResource(R.drawable.ok_sign);
                        }
                        else{
                            Image.setImageResource(
                                    //R.drawable.resu);
                                    R.drawable.ok_sign);
                            // if correctness<3 showing sad emoji
                        }



                        // Burada en son Sorundan next'e tıklanınca gelen yerde işlerimizi yapacuk
                        Map<String, Object> questionDataToDatabase = new HashMap<>();
                        for(Question q : questionBank ) if (q.getAnswer() !=null ){
                            //questionDataToDatabase.put(q.getQuestion(),q.getAnswerBool());
                            questionDataToDatabase.put(q.getAttributeName(), q.getAnswerBool() );
                        }
                        Log.e("11111", userEmail);
                        db.collection("users")
                                .whereEqualTo("email", userEmail)
                                .limit(1)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        if (task.isSuccessful()) {
                                            for (QueryDocumentSnapshot document : task.getResult() ){
                                                questionDataToDatabase.put("userId",document.getId());
                                                db.collection("userCovidProcess").add(questionDataToDatabase);
                                                //db.collection("userCovidProcess").document(document.getId()).set(questionDataToDatabase);
                                            }
                                            if(task.getResult().isEmpty()) db.collection("userCovidProcess").add(questionDataToDatabase);
                                        } else System.out.println("userCovidProcess"+ "Error getting documents: "+ task.getException());

                                    }
                                });
                    }
                    else updateQuestion();

                }

                break;
            case R.id.prev_button:
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex
                            = (currentQuestionIndex - 1)
                            % questionBank.length;
                    updateQuestion();
                }
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    private void updateQuestion()
    {
        Log.d("Current",
                "onClick: " + currentQuestionIndex);

        questionTextView.setText(
                questionBank[currentQuestionIndex]
                        .getAnswerResId());
        // setting the textview with new question
        switch (currentQuestionIndex) {
            case 1:
                // setting up image for each
                // question
                Image.setImageResource(R.drawable.cough);
                break;
            case 2:
                Image.setImageResource(R.drawable.breathing);
                break;
            case 3:
                Image.setImageResource(R.drawable.headache);
                break;
            case 4:
                Image.setImageResource(R.drawable.lossspeech);
                break;
            case 5:
                Image.setImageResource(R.drawable.lossoftaste);
                break;
            case 6:
                Image.setImageResource(R.drawable.exhaustion);
                break;
            case 7:
                Image.setImageResource(R.drawable.ok_sign);
                break;
        }
    }
    private void checkAnswer(boolean userChooseCorrect)
    {
        boolean answerIsTrue
                = questionBank[currentQuestionIndex]
                .isAnswerTrue();
        // getting correct ans of current question
        int toastMessageId;
        // if ans matches with the
        // button clicked

        //if (userChooseCorrect == answerIsTrue) {
        if (userChooseCorrect == true) {
            toastMessageId = R.string.correct_answer;
            correct++;
            questionBank[currentQuestionIndex].setAnswer(userChooseCorrect);
        }
        else {
            // showing toast
            // message correct
            toastMessageId = R.string.wrong_answer;
            questionBank[currentQuestionIndex].setAnswer(userChooseCorrect);
        }

        Toast
                .makeText(CovidProcessActivity.this, toastMessageId,
                        Toast.LENGTH_SHORT)
                .show();
    }
}
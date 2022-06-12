package com.example.ebook;

public class Question
{
    private int answerResId;
    private boolean answerTrue;
    private Boolean answer;
    private String question;
    private String attributeName;

    public Question(int answerResId, boolean answerTrue, String question, String attributeName)
    {
        // setting the values through
        // arguments passed in constructor
        this.answerResId = answerResId;
        this.answerTrue = answerTrue;
        this.question = question;
        this.attributeName = attributeName;
        answer=null;
    }

    public Question(int answerResId)
    {
        this.answerResId = answerResId;
    }

    public int getAnswerResId()
    {
        return answerResId;
    }

    public void setAnswerResId(int answerResId)
    {
        this.answerResId = answerResId;
    }

    public boolean isAnswerTrue()
    {
        return answerTrue;
    }

    public void setAnswerTrue(boolean answerTrue)
    {
        this.answerTrue = answerTrue;
    }

    public Boolean getAnswer () {return answer;}

    public Boolean getAnswerBool () {
        if( answer==true) return true;
        else return false;
    }

    public void setAnswer(Boolean answer)
    {
        this.answer = answer;
    }

    public String getQuestion () {return question;}

    public void setQuestion(String question)
    {
        this.question = question;
    }

    public String getAttributeName () {return attributeName;}

    public void setAttributeName (String attributeName) { this.attributeName = attributeName;}
}

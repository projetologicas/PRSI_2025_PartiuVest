package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.AttemptQuestion;
import br.edu.ifsp.partiu_vest.model.User;

public class AttemptQuestionResponse {
    private AttemptQuestion question;
    private Attempt attempt;
    private User user;
    private String user_answer;
    private String right_answer;

    public AttemptQuestionResponse(AttemptQuestion question, Attempt attempt, User user, String user_answer, String right_answer) {
        this.question = question;
        this.attempt = attempt;
        this.user = user;
        this.user_answer = user_answer;
        this.right_answer = right_answer;
    }

    public AttemptQuestionResponse() {
    }

    public AttemptQuestion getQuestion() {
        return question;
    }

    public void setQuestion(AttemptQuestion question) {
        this.question = question;
    }

    public Attempt getAttempt() {
        return attempt;
    }

    public void setAttempt(Attempt attempt) {
        this.attempt = attempt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUser_answer() {
        return user_answer;
    }

    public void setUser_answer(String user_answer) {
        this.user_answer = user_answer;
    }

    public String getRight_answer() {
        return right_answer;
    }

    public void setRight_answer(String right_answer) {
        this.right_answer = right_answer;
    }
}

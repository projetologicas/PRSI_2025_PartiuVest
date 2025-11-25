package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.User;

public class AttemptQuestionResponse {
    private Long id;
    private Attempt attempt;
    private User user;
    private String user_answer;
    private String right_answer;

    public AttemptQuestionResponse(Long id, Attempt attempt, User user, String user_answer, String right_answer) {
        this.id = id;
        this.attempt = attempt;
        this.user = user;
        this.user_answer = user_answer;
        this.right_answer = right_answer;
    }

    public AttemptQuestionResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

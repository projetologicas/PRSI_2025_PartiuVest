package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.QuestionBook;
import br.edu.ifsp.partiu_vest.model.User;

public class AttemptQuestionRequest {
    private Long id;
    private Long question_id;
    private Long attempt_id;
    private User user;
    private String user_answer;

    public AttemptQuestionRequest(Long id, Long question_id, Long attempt_id, User user, String user_answer) {
        this.id = id;
        this.question_id = question_id;
        this.attempt_id = attempt_id;
        this.user = user;
        this.user_answer = user_answer;
    }

    public AttemptQuestionRequest() {
    }

    public Long getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Long question_id) {
        this.question_id = question_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAttempt_id() {
        return attempt_id;
    }

    public void setAttempt_id(Long attempt_id) {
        this.attempt_id = attempt_id;
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
}

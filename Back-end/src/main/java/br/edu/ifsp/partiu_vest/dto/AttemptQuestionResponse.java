package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.AttemptQuestion;
import br.edu.ifsp.partiu_vest.model.User;

public class AttemptQuestionResponse {
    private Long question_id;
    private Long attempt_id;
    private Long user_id;
    private String user_answer;
    private String right_answer;

    public AttemptQuestionResponse(Long question, Long attempt, Long user, String user_answer, String right_answer) {
        this.question_id = question;
        this.attempt_id = attempt;
        this.user_id = user;
        this.user_answer = user_answer;
        this.right_answer = right_answer;
    }

    public AttemptQuestionResponse() {
    }

    public Long getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Long question_id) {
        this.question_id = question_id;
    }

    public Long getAttempt_id() {
        return attempt_id;
    }

    public void setAttempt_id(Long attempt_id) {
        this.attempt_id = attempt_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser(Long user_id) {
        this.user_id = user_id;
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
